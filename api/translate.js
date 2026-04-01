import { Pool } from 'pg';
import crypto from 'crypto';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    console.log("--- TRANSLATE API START ---");
    console.log("DB_URL EXISTS:", !!process.env.DATABASE_URL);
    console.log("GEMINI_KEY EXISTS:", !!process.env.GEMINI_API_KEY);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { text, type } = req.body;
        if (!text) return res.status(400).json({ error: 'Missing text parameter' });

        const hash = crypto.createHash('sha256').update(text).digest('hex');

        // 1. Probar DB
        let cacheResult;
        try {
            cacheResult = await pool.query('SELECT translated_text FROM translations WHERE original_hash = $1', [hash]);
        } catch (dbError) {
            console.error("DATABASE ERROR:", dbError.message);
            // Si la tabla no existe, intentamos crearla
            await pool.query(`CREATE TABLE IF NOT EXISTS translations (id SERIAL PRIMARY KEY, original_hash TEXT UNIQUE NOT NULL, translated_text TEXT NOT NULL);`);
            cacheResult = { rows: [] };
        }
        
        if (cacheResult.rows.length > 0) {
            return res.status(200).json({ translation: cacheResult.rows[0].translated_text });
        }

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
                if (aiResponse.ok && aiData.candidates) break;
                
                lastAiError = aiData;
                console.warn(`Model ${model} failed:`, JSON.stringify(aiData));
            } catch (e) {
                console.error(`Fetch error model ${model}:`, e.message);
            }
        }

        if (!aiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.error("ALL MODELS FAILED. Last error:", JSON.stringify(lastAiError));
            throw new Error('AI_FAILURE');
        }

        const translated = aiData.candidates[0].content.parts[0].text.trim();

        try {
            await pool.query('INSERT INTO translations (original_hash, translated_text) VALUES ($1, $2) ON CONFLICT (original_hash) DO NOTHING', [hash, translated]);
        } catch (e) {
            console.error("SAVE CACHE ERROR:", e.message);
        }

        return res.status(200).json({ translation: translated });

    } catch (error) {
        console.error("CRITICAL API ERROR:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
