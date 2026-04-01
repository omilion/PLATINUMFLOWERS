import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#1A1A1A', color: 'white', padding: '100px 0 50px 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="footer-grid">
                    {/* Columna 1: 32% - Brand & Social */}
                    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <img 
                            src="/logo platinum flower full blanco hori.webp" 
                            alt="Platinium Flowers" 
                            style={{ height: '80px', marginBottom: '25px', width: 'auto' }} 
                        />
                        <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '30px', fontWeight: 300 }}>
                            Peonías de exportación cultivadas en el corazón de la Patagonia Chilena. Calidad, fragancia y elegancia para el mundo.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <motion.a whileHover={{ y: -5 }} href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.6 }}>
                                <i className="fa-brands fa-instagram"></i>
                            </motion.a>
                            <motion.a whileHover={{ y: -5 }} href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.6 }}>
                                <i className="fa-brands fa-facebook"></i>
                            </motion.a>
                            <motion.a whileHover={{ y: -5 }} href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.6 }}>
                                <i className="fa-brands fa-whatsapp"></i>
                            </motion.a>
                        </div>
                    </div>

                    {/* Columna 2: 18% - Navegación */}
                    <div className="footer-nav-col" style={{ padding: '0 20px', textAlign: 'left' }}>
                        <h4 className="footer-title">Navegación</h4>
                        <ul className="footer-nav-list">
                            {['Home', 'Catálogo', 'Blog', 'Contacto'].map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/ /g, '-')}`} 
                                        style={{ color: 'white', textDecoration: 'none', opacity: 0.6, fontSize: '0.9rem', fontWeight: 300, transition: '0.3s' }}
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: 25% - Contacto */}
                    <div style={{ padding: '0 20px', textAlign: 'left' }}>
                        <h4 className="footer-title">Contacto</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
                            <div className="contact-item">
                                <i className="fa-solid fa-location-dot"></i> Camino Villa Ortega s/n Coyhaique _ Región de Aysén. Chile.
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-location-dot"></i> Oficina, Comuna Las Condes / Santiago.
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-phone"></i> +569 9 2990735
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-house"></i> Código Postal: 7550307
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-envelope"></i> ventas@platiniumflowers.com
                            </div>
                        </div>
                    </div>

                    {/* Columna 4: 25% - ProChile */}
                    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                        <h4 className="footer-title">Respaldo</h4>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <img 
                                src="/prochile-logo.png" 
                                alt="ProChile Logo" 
                                style={{ height: '70px', width: 'auto', marginBottom: '15px', filter: 'brightness(10)' }} 
                            />
                        </motion.div>
                        <p style={{ opacity: 0.4, fontSize: '0.7rem', fontWeight: 300, letterSpacing: '1px' }}>
                            Sello de Exportación
                        </p>
                    </div>
                </div>

                {/* Copyright Area */}
                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ opacity: 0.3, fontSize: '0.75rem', fontWeight: 300 }}>
                        &copy; {new Date().getFullYear()} Platinium Flowers. Patagonia, Chile. Todos los derechos reservados.
                    </p>
                </div>
            </div>
            
            {/* Soft decorative background element */}
            <div style={{ 
                position: 'absolute', 
                bottom: '-10%', 
                right: '-5%', 
                width: '400px', 
                height: '400px', 
                background: 'var(--color-primary)', 
                filter: 'blur(150px)', 
                opacity: 0.05,
                borderRadius: '50%'
            }}></div>

            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: 32% 18% 25% 25%;
                    width: 100%;
                }
                .footer-title {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    margin-bottom: 35px;
                    color: var(--color-accent);
                }
                .footer-nav-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 0;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    opacity: 0.6;
                    font-size: 0.85rem;
                    justify-content: flex-start;
                    line-height: 1.4;
                }
                @media (max-width: 991px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 50px;
                    }
                }
                @media (max-width: 768px) {
                    .footer-nav-col {
                        display: none !important;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 60px;
                    }
                    .footer-grid > div {
                        text-align: center !important;
                        align-items: center !important;
                    }
                    .contact-item {
                        justify-content: center !important;
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
