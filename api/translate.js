import { Pool } from 'pg';
import crypto from 'crypto';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { text, type } = req.body;
        if (!text) return res.status(400).json({ error: 'Missing text parameter' });

        // Crear la tabla si no existe (automático para el primer despliegue)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS translations (
                id SERIAL PRIMARY KEY,
                original_hash TEXT UNIQUE NOT NULL,
                translated_text TEXT NOT NULL
            );
        `);

        // Hasheo muy simple usando buffer (Node nativo) para llave única
        const hash = crypto.createHash('sha256').update(text).digest('hex');

        // Buscar en Caché Neon Database
        const cacheResult = await pool.query('SELECT translated_text FROM translations WHERE original_hash = $1', [hash]);
        
        if (cacheResult.rows.length > 0) {
            console.log("CACHE HIT: " + type);
            return res.status(200).json({ translation: cacheResult.rows[0].translated_text });
        }

        // Si no está en Neon -> Llamar a Gemini Directamente a su API REST
        console.log("CACHE MISS, CALLING GEMINI: " + type);
        
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
        
        // Contextualizar el prompt en base a si es HTML (descripción de blog/producto) o solo Título.
        const prompt = type === 'html' 
            ? `Translate this HTML content to English exactly as is. Keep all tags, attributes, links, and structure perfectly intact. Only translate the human readable text inside the tags. Output ONLY the translated HTML: ${text}`
            : `Translate this title/short phrase to English for a luxury flowers exporter catalog. Keep it professional. Output ONLY the translation, no quotes, no markdown: ${text}`;

        const aiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const aiData = await aiResponse.json();
        
        if (!aiData.candidates || aiData.candidates.length === 0) {
            throw new Error('Gemini API returned empty response: ' + JSON.stringify(aiData));
        }

        let translated = aiData.candidates[0].content.parts[0].text.trim();

        // Almacenar permanentemente en Neon Db para que el próximo usuario no pague 
        await pool.query(
            'INSERT INTO translations (original_hash, translated_text) VALUES ($1, $2) ON CONFLICT (original_hash) DO NOTHING',
            [hash, translated]
        );

        return res.status(200).json({ translation: translated });

    } catch (error) {
        console.error("Translation ERROR:", error);
        return res.status(500).json({ error: error.message, stack: error.stack });
    }
}
