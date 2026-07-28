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
                            src="/Logo_AP_Blanco.webp" 
                            alt="AgroPeonías" 
                            style={{ height: '75px', marginBottom: '25px', width: 'auto' }} 
                        />
                        <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '30px', fontWeight: 300 }}>
                            Productores de peonías de la Zona Central de Chile (Romeral, Región del Maule). Identidad, sofisticación y elegancia para Chile y el mundo.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <motion.a whileHover={{ y: -5 }} href="https://wa.me/56942262053" target="_blank" rel="noreferrer" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.6 }}>
                                <i className="fa-brands fa-whatsapp"></i>
                            </motion.a>
                            <motion.a whileHover={{ y: -5 }} href="mailto:agropeonias@gmail.com" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.6 }}>
                                <i className="fa-solid fa-envelope"></i>
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
                                <i className="fa-solid fa-location-dot"></i> Camino a Romeral km 1, Romeral. Región del Maule, Chile.
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-phone"></i> +56 9 4226 2053
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-clock"></i> Lun - Sáb: 10:00 - 20:00 | Dom: 12:00 - 16:00
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-envelope"></i> agropeonias@gmail.com
                            </div>
                        </div>
                    </div>

                    {/* Columna 4: 25% - Exportación */}
                    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                        <h4 className="footer-title">Cobertura</h4>
                        <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '15px' }}>
                            Venta nacional directa en campo, despachos a todo Chile y exportaciones globales.
                        </p>
                        <p style={{ opacity: 0.4, fontSize: '0.75rem', fontWeight: 300, letterSpacing: '1px' }}>
                            Calidad de Exportación
                        </p>
                    </div>
                </div>

                {/* Copyright Area */}
                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ opacity: 0.3, fontSize: '0.75rem', fontWeight: 300 }}>
                        &copy; {new Date().getFullYear()} AgroPeonías Chile. Todos los derechos reservados.
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
