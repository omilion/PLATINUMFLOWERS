import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import ProductBanner from '../components/ProductBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Droplets, Thermometer, Truck, MapPin, Zap, Info, ArrowUpRight, X } from 'lucide-react';
import { Blog, Faq } from '../components/FaqBlog';

const homeAnimations = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const Home = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <div style={{ backgroundColor: 'var(--color-bg)' }}>
            <Hero />
            
            {/* Modal Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={40} />
                        </button>
                        <img src="/home%20parallax.webp" alt="Banner Institucional" style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain' }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Introducción de la Marca Animada Palabra-por-Palabra */}
            <section style={{ padding: '80px 20px 40px', textAlign: 'center' }}>
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                            opacity: 1, 
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                    style={{ maxWidth: '1000px', margin: '0 auto' }}
                >
                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: 'var(--color-primary)', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>
                        {"Cultivamos las más lindas peonías en el lugar más espectacular: La Patagonia. Bajo fuertes condiciones climáticas, prístinas aguas y frío intenso, cada temporada exportamos al mundo nuestras flores de gran calidad.".split(" ").map((word, index) => (
                            <motion.span 
                                key={index} 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                                }} 
                                style={{ display: 'inline-block', marginRight: '0.25em' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </motion.div>
            </section>

            {/* Carrusel Inmediatamente Bajo el Hero */}
            <div id="catalogo" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                <ProductCarousel subtitle="Showroom" title="Nuestras <span style='color: var(--color-secondary)'>Peonías</span>" />
            </div>

            {/* Banner Institucional Estático (Puramente Fotográfico) */}
            <section style={{ width: '100%', marginTop: '40px', marginBottom: '40px', background: 'var(--color-bg)', display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
                <div className="banner-institucional" onClick={() => setIsLightboxOpen(true)}>
                    <img 
                        src="/home%20parallax.webp" 
                        alt="Banner Institucional Petunias" 
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                    />
                </div>
            </section>

            {/* Experiencia de Compra (Formatos Rediseñados) */}
            <section id="formatos" className="section-full" style={{ backgroundColor: '#ffffff' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }} {...homeAnimations}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--color-primary)' }}>Nuestros Formatos</h2>
                    </motion.div>

                    <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }} {...homeAnimations}>
                        {/* Card: 100 Varas (Con Imagen) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', padding: '40px', background: '#F8F9FA', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                <img src="/CAJA%20PEONIAS.webp" alt="Caja Mayorista de Peonías" style={{ width: '90px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '10px', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.1 }}>Caja de <br/>100 Varas</h3>
                                    <span style={{ padding: '6px 14px', background: '#00f5d4', color: '#1a1a1a', fontWeight: 700, borderRadius: '30px', fontSize: '0.8rem' }}>Stock Mayorista</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid rgba(0,0,0,0.05)', paddingLeft: '25px' }}>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-primary)', opacity: 0.8, marginBottom: '15px' }}>Monocromática o Mix de la semana. Vienen cerradas directo desde nuestra cosecha.</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.5px' }}>→ Perfecto para decoración masiva.</p>
                            </div>
                        </div>

                        {/* Card: 5 Varas (Con Imagen) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', padding: '40px', background: '#F8F9FA', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                <img src="/RAMO%20PEONIAS.webp" alt="Ramo Boutique de Peonías" style={{ width: '90px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '10px', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.1 }}>Ramos de <br/>5 Varas</h3>
                                    <span style={{ padding: '6px 14px', background: 'rgba(0,0,0,0.05)', color: 'var(--color-primary)', fontWeight: 700, borderRadius: '30px', fontSize: '0.8rem' }}>Formato Boutique</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid rgba(0,0,0,0.05)', paddingLeft: '25px' }}>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-primary)', opacity: 0.8, marginBottom: '15px' }}>Meticulosa selección artesanal variable según la disponibilidad del huerto en el momento.</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.5px' }}>→ Perfecto para un detalle en tu hogar.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ textAlign: 'center', marginTop: '60px' }}
                        {...homeAnimations}
                    >
                        <a href="https://wa.me/56992990735" className="btn-pro">Consultar Disponibilidad</a>
                    </motion.div>
                </div>
            </section>

            {/* Opciones de Despacho (Rediseñado como 2 opciones paritarias) */}
            <section id="envios" className="section-full" style={{ background: '#ffffff', padding: '80px 20px', paddingBottom: '120px' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }} {...homeAnimations}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-primary)', marginBottom: '15px' }}>Logística y Entregas</h2>
                        <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', opacity: 0.8 }}>Elige la modalidad que mejor se adapte a tus necesidades para recibir tus peonías.</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        
                        {/* Opción 1: Retiro */}
                        <motion.div 
                            style={{ 
                                background: '#F8F9FA', 
                                border: '1px solid rgba(0,0,0,0.04)', 
                                borderRadius: '24px', 
                                padding: '40px 30px',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', textAlign: 'center',
                                position: 'relative', overflow: 'hidden'
                            }}
                            {...homeAnimations}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#00f5d4' }} />
                            <div style={{ backgroundColor: 'rgba(0, 245, 212, 0.15)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                                <MapPin size={35} color="var(--color-primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Retiro en Santiago</h3>
                            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,0.05)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, borderRadius: '20px', marginBottom: '25px' }}>Sin Costo Extra</span>
                            
                            <p style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.6, fontSize: '1.05rem', marginTop: 'auto' }}>
                                El valor del formato ya incluye el traslado nacional desde nuestro huerto en la Patagonia hasta nuestro punto de distribución oficial en <strong>Las Condes</strong>.
                            </p>
                        </motion.div>

                        {/* Opción 2: Privados */}
                        <motion.div 
                            style={{ 
                                background: '#F8F9FA', 
                                border: '1px solid rgba(0,0,0,0.04)', 
                                borderRadius: '24px', 
                                padding: '40px 30px',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', textAlign: 'center',
                                position: 'relative', overflow: 'hidden'
                            }}
                            {...homeAnimations}
                            transition={{ delay: 0.1 }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--color-secondary)' }} />
                            <div style={{ backgroundColor: 'rgba(0,0,0, 0.05)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                                <Truck size={35} color="var(--color-primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Entregas a Domicilio</h3>
                            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,0.05)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, borderRadius: '20px', marginBottom: '25px' }}>Logística Personalizada</span>
                            
                            <p style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '25px' }}>
                                Coordinamos con transportes privados en la ciudad (Ej: Uber o particular) con cargo directo extra en destino para su tranquilidad.
                            </p>
                            
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700, background: 'rgba(0, 245, 212, 0.2)', padding: '12px 15px', borderRadius: '12px', width: '100%', marginTop: 'auto' }}>
                                * Solo aplica para pedidos de sobre 100 varas.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Banner Dinámico de Productos Corporativo */}
            <ProductBanner />

            {/* Experiencia Patagónica (Cuidados + Jardín Unificados - Light Theme) */}
            <section id="experiencia" className="section-full" style={{ background: '#ffffff' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <motion.div className="section-title" style={{ textAlign: 'center', marginBottom: '80px' }} {...homeAnimations}>
                        <p style={{ color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1rem', marginBottom: '20px' }}>
                            CONSEJOS
                        </p>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-primary)', lineHeight: 1.2 }}>El Arte de las Peonías</h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                        
                        {/* Pilar 1: Cuidado de Flores de Corte */}
                        <motion.div 
                            style={{ 
                                background: '#F8F9FA', 
                                border: '1px solid rgba(0,0,0,0.04)', 
                                borderRadius: '30px', 
                                padding: 'clamp(25px, 5vw, 50px)',
                                display: 'flex', flexDirection: 'column'
                            }}
                            {...homeAnimations}
                        >
                            <Droplets size={45} color="var(--color-accent)" style={{ opacity: 0.9, marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>Guía Uso y Cuidados</h3>
                            <p style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.6, marginBottom: '40px', fontSize: '1.05rem', fontWeight: 400 }}>
                                Asegura que tus varas de corte alcancen su máximo esplendor al llegar a tu entorno.
                            </p>
                            
                            <ul style={{ listStyle: 'none', gap: '25px', display: 'flex', flexDirection: 'column', padding: 0, marginTop: 'auto' }}>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Control de Apertura</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Agua tibia + azúcar en entorno cálido para apurar floración. Guarda frío para retrasarla.</span>
                                </li>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Mantenimiento Frecuente</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Corta 2 cm del tallo cada dos días agregando hielos al agua (aman la temperatura de su origen).</span>
                                </li>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Ciclo de Vida Útil</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Disfruta su imponente punto máximo durante 5 a 6 maravillosos días.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Pilar 2: Compra de Bulbos/Rizomas */}
                        <motion.div 
                            style={{ 
                                background: '#F8F9FA', 
                                border: '1px solid rgba(0,0,0,0.04)', 
                                borderRadius: '30px', 
                                padding: 'clamp(25px, 5vw, 50px)',
                                display: 'flex', flexDirection: 'column'
                            }}
                            {...homeAnimations}
                            transition={{ delay: 0.1 }}
                        >
                            <Zap size={45} color="var(--color-secondary)" style={{ opacity: 0.9, marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>Jardín Patagónico</h3>
                            <p style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.6, marginBottom: '40px', fontSize: '1.05rem', fontWeight: 400 }}>
                                Planta nuestros <strong style={{color: 'var(--color-primary)', fontWeight: 700}}>rizomas</strong> y cultiva un pedazo de la Patagonia chilena directamente en tu hogar.
                            </p>
                            
                            <ul style={{ listStyle: 'none', gap: '25px', display: 'flex', flexDirection: 'column', padding: 0, marginTop: 'auto' }}>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Apertura de Stock</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Las reservas de rizomas limitados siempre comienzan masivamente desde el mes de mayo.</span>
                                </li>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Logística de Entregas</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Despachos coordinados para envío aéreo o terrestre a cualquier parte de Chile continental.</span>
                                </li>
                                <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Tip Primordial para Inicio</strong>
                                    <span style={{ color: 'var(--color-text)', opacity: 0.8, fontWeight: 300 }}>Ubícales inexcusablemente bajo Orientación Norte; su desarrollo requiere sol pleno.</span>
                                </li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Blog limit={4} variant="overlay" />

            <Faq />
        </div>
    );
};

export default Home;
