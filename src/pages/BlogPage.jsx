import React, { useEffect } from 'react';
import { Blog } from '../components/FaqBlog';
import { motion } from 'framer-motion';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Hero Section del Blog Editorial */}
            <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '450px', backgroundColor: 'var(--color-primary)', marginBottom: '80px' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                    <img src="/HERO%20BLOG.webp" alt="Blog Oficial Platinium Flowers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,23,32,0.9) 0%, rgba(16,23,32,0.2) 100%)' }} />
                </div>
                
                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '80px' }}>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1rem', marginBottom: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Inspiración Floral
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'white', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
                        Platinium <span style={{ color: 'var(--color-accent)' }}>Blog</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
                        Consejos expertos botánicos, guías de cuidados australes y las últimas historias que sembramos desde la Patagonia.
                    </motion.p>
                </div>
            </div>
            
            <Blog variant="grid" limit={null} hideTitle={true} />
        </div>
    );
};

export default BlogPage;
