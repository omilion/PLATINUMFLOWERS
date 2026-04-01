import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WordPressService from '../services/WordPressService';

const ProductCarousel = ({ 
    title = "Variedades Destacadas", 
    subtitle = "Showroom", 
    excludeId = null 
}) => {
    const [products, setProducts] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allP = await WordPressService.getProducts();
                let filtered = allP;
                if (excludeId) {
                    filtered = allP.filter(p => p.id !== parseInt(excludeId));
                }
                setProducts(filtered.slice(0, 8)); // Traemos hasta 8 para el carrusel
            } catch (error) {
                console.error("Error fetching products for carousel", error);
            }
        };
        fetchProducts();
    }, [excludeId]);

    const nextRelated = () => {
        const visibleCols = window.innerWidth < 768 ? 2 : 4;
        const maxIndex = Math.max(0, products.length - visibleCols);
        setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };
    const prevRelated = () => {
        const visibleCols = window.innerWidth < 768 ? 2 : 4;
        const maxIndex = Math.max(0, products.length - visibleCols);
        setCarouselIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    if (products.length === 0) return null;

    return (
        <section className="section-full" style={{ paddingBottom: '40px', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                    <div>
                        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-secondary)', fontWeight: 800 }}>{subtitle}</p>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }} dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }} className="hide-mobile">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={prevRelated} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(26,26,26,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', cursor: 'pointer', outline: 'none' }}>
                            <ChevronLeft size={20} strokeWidth={1.5} />
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={nextRelated} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(26,26,26,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', cursor: 'pointer', outline: 'none' }}>
                            <ChevronRight size={20} strokeWidth={1.5} />
                        </motion.button>
                    </div>
                </div>

                <div className="carousel-wrapper" style={{ position: 'relative', overflow: 'hidden', padding: '20px', margin: '-20px' }}>
                    <motion.div 
                        drag="x"
                        dragConstraints={{ right: 0, left: -((products.length - (window.innerWidth < 768 ? 2 : 4)) * 300) }} 
                        style={{ 
                            display: 'flex', 
                            gap: '20px',
                            cursor: 'grab'
                        }}
                        animate={{ x: `-${carouselIndex * (100 / (window.innerWidth < 768 ? 2 : 4))}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {products.map((p) => (
                            <motion.div 
                                key={p.id}
                                className="glass-card carousel-item"
                                style={{ 
                                    flex: '0 0 calc(25% - 15px)', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    padding: '15px',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <div style={{ height: '250px', borderRadius: '15px', overflow: 'hidden', marginBottom: '20px' }}>
                                    <img src={p.images[0]?.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', minHeight: '3em' }} dangerouslySetInnerHTML={{ __html: p.name }} />
                                <Link to={`/producto/${p.id}`} className="btn-pro" style={{ padding: '10px', fontSize: '0.75rem', width: '100%', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                                    Ver Detalles
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .carousel-item {
                        flex: 0 0 calc(50% - 10px) !important;
                    }
                    .carousel-item div {
                        height: auto !important;
                        aspect-ratio: 1/1 !important;
                    }
                    .hide-mobile {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProductCarousel;
