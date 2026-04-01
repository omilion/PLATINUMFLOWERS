import { Pool } from 'pg';
import crypto from 'crypto';

// Use a singleton for the pool to avoid too many connections in serverless environment
let pool;
const getPool = () => {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        
        pool.on('error', (err) => {
            console.error('Unexpected error on idle client:', err);
            pool = null; // Reset pool on critical error
        });
    }
    return pool;
};

export default async function handler(req, res) {
    console.log("--- TRANSLATE API START ---");
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { text, type } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing text parameter' });

    const hash = crypto.createHash('sha256').update(text).digest('hex');
    let translated = null;
    let usingCache = false;

    // 1. Try to read from Cache (Neon DB)
    try {
        const dbPool = getPool();
        const cacheResult = await dbPool.query('SELECT translated_text FROM translations WHERE original_hash = $1', [hash]);
        if (cacheResult.rows.length > 0) {
            translated = cacheResult.rows[0].translated_text;
            usingCache = true;
            console.log("CACHE HIT");
        }
    } catch (dbError) {
        console.warn("DATABASE CACHE READ FAILED:", dbError.message);
        // We proceed without cache instead of crashing
    }

    // 2. Transale via AI if not in cache
    if (!translated) {
        console.log("CACHE MISS, CALLING GEMINI");
        const apiKey = process.env.GEMINI_API_KEY;
        const prompt = type === 'html' 
            ? `Translate this HTML content to English exactly as is. Keep all tags. Output ONLY translated HTML: ${text}`
            : `Translate to English (luxury flower catalog style): ${text}`;

        const models = ['gemini-3-flash-preview', 'gemini-3.1-flash-lite-preview', 'gemini-2.5-flash'];
        let aiData = null;
        let lastAiError = null;

        for (const model of models) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                const aiResponse = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });
                
                aiData = await aiResponse.json();
                if (aiResponse.ok && aiData.candidates?.[0]?.content?.parts?.[0]?.text) {
                    translated = aiData.candidates[0].content.parts[0].text.trim();
                    break;
                }
                lastAiError = aiData;
                console.warn(`Model ${model} failed:`, JSON.stringify(aiData));
            } catch (e) {
                console.error(`Fetch error model ${model}:`, e.message);
            }
        }

        if (!translated) {
            console.error("ALL MODELS FAILED. Last error:", JSON.stringify(lastAiError));
            return res.status(502).json({ error: 'All Gemini models failed', details: lastAiError });
        }

        // 3. Try to save in Cache (Async - don't wait for response)
        try {
            const dbPool = getPool();
            // Ensure table exists on first run (wrapped in try/catch)
            dbPool.query('CREATE TABLE IF NOT EXISTS translations (id SERIAL PRIMARY KEY, original_hash TEXT UNIQUE NOT NULL, translated_text TEXT NOT NULL);')
                .then(() => {
                    return dbPool.query('INSERT INTO translations (original_hash, translated_text) VALUES ($1, $2) ON CONFLICT (original_hash) DO NOTHING', [hash, translated]);
                })
                .catch(e => console.warn("LATE CACHE SAVE ERROR:", e.message));
        } catch (e) {
            console.warn("CACHE SAVE INITIALIZATION ERROR:", e.message);
        }
    }

    return res.status(200).json({ translation: translated, cached: usingCache });
}
