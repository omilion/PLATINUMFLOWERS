import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import WordPressService from '../services/WordPressService';

const ProductBanner = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomProduct = async () => {
            try {
                const products = await WordPressService.getProducts();
                if (products.length > 0) {
                    // Seleccionar uno aleatorio o uno destacado si existiera
                    const random = products[Math.floor(Math.random() * products.length)];
                    setProduct(random);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchRandomProduct();
    }, []);

    if (loading || !product) return null;

    return (
        <section className="section-full" style={{ padding: '0 0 100px 0', overflow: 'hidden' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card"
                    style={{ 
                        padding: 0, 
                        overflow: 'hidden', 
                        minHeight: '450px', 
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center',
                        boxShadow: 'var(--shadow-xl)',
                        borderRadius: '35px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Background Product Image */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.5 }}
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            backgroundImage: `url("${product.images[0]?.src}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0
                        }}
                    />
                    
                    {/* Premium Dark Gradient Overlay */}
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(90deg, rgba(0, 92, 57, 0.45) 0%, rgba(0, 92, 57, 0.15) 60%, transparent 100%)',
                        zIndex: 1 
                    }}></div>

                    {/* Banner Content */}
                    <div style={{ 
                        position: 'relative', 
                        zIndex: 2, 
                        color: 'white', 
                        padding: '60px', 
                        maxWidth: '750px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: 'var(--color-accent)', padding: '8px 15px', borderRadius: '50px', color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sparkles size={14} /> Variedad Destacada
                            </div>
                        </div>

                        <h2 style={{ 
                            color: 'white', 
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                            lineHeight: 1, 
                            fontWeight: 800,
                            margin: 0,
                            textShadow: '0 4px 15px rgba(0,0,0,0.4)'
                        }} dangerouslySetInnerHTML={{ __html: product.name }} />

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
                            <Link to={`/producto/${product.id}`} className="btn-pro" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '15px', padding: '18px 40px' }}>
                                Ver Variedad <ArrowRight size={20} />
                            </Link>
                            <Link to="/catalogo" style={{ textDecoration: 'none', color: 'white', opacity: 0.7, fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseOver={(e) => e.target.style.opacity = '1'} onMouseOut={(e) => e.target.style.opacity = '0.7'}>
                                Ir al Catálogo Completo <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Subtle floating bag icon decoration */}
                    <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', opacity: 0.03, pointerEvents: 'none' }}>
                        <ShoppingBag size={400} color="white" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductBanner;
