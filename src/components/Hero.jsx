import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const images = [
  '/home%20hero.webp',
  '/home%20hero%202.webp'
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev === 0 ? 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Slideshow con Fade + Ken Burns Effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
           key={currentImage}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
           style={{
             position: 'absolute', inset: 0,
             backgroundImage: `url('${images[currentImage]}')`, 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             zIndex: 0
           }}
        />
      </AnimatePresence>

      {/* Overlay Gris Suave (10% de Opacidad) */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(80,80,80,0.1)', zIndex: 1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white' }}>
        
        {/* Logo centralizado con sombra difusa para resaltar contra fondos claros */}
        <motion.img 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src="/logo%20platinum%20flower%20full%20blanco.webp" 
            alt="Platinium Flowers" 
            style={{ 
                width: '370px', 
                maxWidth: '85%', 
                marginBottom: '50px',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.4))'
            }} 
        />

        {/* H1 sin pretítulo y con palabra destacada con sombra súper difusa para resaltar */}
        <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            style={{ 
                fontSize: 'clamp(1.6rem, 3vw, 2.7rem)', 
                color: 'white', 
                marginBottom: '20px', 
                fontWeight: 800, 
                textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)', 
                lineHeight: 1.1 
            }}
        >
            <span style={{ color: '#00f5d4' }}>Peonías</span> de Exportación
        </motion.h1>



        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <ChevronDown color="rgba(255,255,255,0.7)" size={50} strokeWidth={1.5} />
            </motion.div>
        </motion.div>

      </div>

      <style>{`
        .hero-btn {
            background: transparent;
            border: 2px solid #00f5d4;
            color: white;
            display: inline-flex;
            padding: 16px 45px;
            font-size: 1.1rem;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .hero-btn:hover {
            background: #00f5d4;
            color: white;
            box-shadow: 0 5px 20px rgba(0, 245, 212, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Hero;
