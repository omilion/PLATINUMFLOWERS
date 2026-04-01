import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WordPressService from '../services/WordPressService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const colorMap = {
    'Blanco': 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    'Rosa': 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
    'Rojo': 'linear-gradient(135deg, #8b0000 0%, #ff0000 100%)',
    'Coral': 'linear-gradient(135deg, #ff7f50 0%, #ff4500 100%)',
    'Crema': 'linear-gradient(135deg, #fffdd0 0%, #f5f5dc 100%)',
    'Bicolor': 'conic-gradient(from 0deg, #ffffff 0deg, #ffffff 180deg, #ff0000 180deg, #ff0000 360deg)',
    'Amarillo': 'linear-gradient(135deg, #ffffe0 0%, #ffd700 100%)'
};

const ProductCard = ({ product, index }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const images = product.images.length > 0 ? product.images : [{ src: 'https://via.placeholder.com/600x800' }];

    const nextImg = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setCurrentImg((prev) => (prev + 1) % images.length); 
    };

    const prevImg = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1)); 
    };

    return (
        <motion.div 
            layout 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
            <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-image-wrapper" style={{ background: '#f8f8f8', boxShadow: '0 8px 25px rgba(0,0,0,0.03)' }}>
                    <AnimatePresence mode="popLayout">
                        <motion.img 
                            key={currentImg}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            src={images[currentImg].src} 
                            alt={product.name} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                position: 'absolute', 
                                inset: 0 
                            }} 
                        />
                    </AnimatePresence>

                    {/* 🎯 NAVEGADORES VISIBLES */}
                    {images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImg} 
                                style={{ 
                                    position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', 
                                    width: '32px', height: '32px', background: 'transparent', border: 'none', 
                                    cursor: 'pointer', zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <ChevronLeft size={24} color="white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                            </button>
                            <button 
                                onClick={nextImg} 
                                style={{ 
                                    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
                                    width: '32px', height: '32px', background: 'transparent', border: 'none', 
                                    cursor: 'pointer', zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <ChevronRight size={24} color="white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                            </button>
                        </>
                    )}
                    
                    <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 5 }}>
                        {images.map((_, idx) => (
                            <div key={idx} style={{ 
                                width: '6px', height: '6px', borderRadius: '50%', 
                                background: currentImg === idx ? 'white' : 'rgba(255,255,255,0.4)',
                                transition: '0.3s'
                            }} />
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', padding: '15px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 600, color: 'var(--color-primary)' }} dangerouslySetInnerHTML={{ __html: product.name }} />
                    <span style={{ 
                        fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', 
                        fontWeight: 800, color: 'var(--color-accent)', 
                        borderBottom: '1.5px solid var(--color-accent)', paddingBottom: '2px' 
                    }}>Ver Variedad</span>
                </div>
            </Link>
        </motion.div>
    );
};

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('todas');
    const [activeColor, setActiveColor] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await WordPressService.getProducts();
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (activeCategory === 'flores') {
            result = result.filter(p => p.categories.some(c => 
                c.slug === 'flores-de-corte' || 
                c.name.toLowerCase().includes('flores') ||
                c.name.toLowerCase().includes('corte')
            ));
        } else if (activeCategory === 'rizomas') {
            result = result.filter(p => p.categories.some(c => 
                c.slug === 'rizomas' || 
                c.name.toLowerCase().includes('rizoma')
            ));
        }

        if (activeColor) {
            const color = activeColor.toLowerCase();
            result = result.filter(p => {
                const searchTxt = (p.name + ' ' + p.short_description).toLowerCase();
                
                if (color === 'bicolor') {
                    const colorsFound = ['blanco', 'rojo', 'rosa', 'amarillo', 'coral'].filter(c => searchTxt.includes(c));
                    return searchTxt.includes('bicolor') || colorsFound.length >= 2;
                }
                
                if (color === 'rosa') return searchTxt.includes('rosa') || searchTxt.includes('rosado') || searchTxt.includes('pink');
                if (color === 'púrpura') return searchTxt.includes('purpura') || searchTxt.includes('púrpura') || searchTxt.includes('violeta');
                if (color === 'blanco') return searchTxt.includes('blanco') || searchTxt.includes('white');
                if (color === 'rojo') return searchTxt.includes('rojo') || searchTxt.includes('red') || searchTxt.includes('carmesí');
                
                return searchTxt.includes(color);
            });
        }

        setFilteredProducts(result);
    }, [activeCategory, activeColor, products]);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ width: '40px', height: '40px', border: '3px solid var(--color-accent)', borderTopColor: 'transparent', borderRadius: '50%' }} />
        </div>
    );

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '120px' }}>
            
            {/* 🎯 HERO SECTION (Starts at top) */}
            <div style={{ 
                width: '100%',
                position: 'relative',
                background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/catalogo head.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '220px 0 100px 0',
                textAlign: 'center',
                color: 'white',
                marginTop: '0'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '25px', fontWeight: 800 }}>
                        Catálogo de Petunias
                    </h2>
                    <p style={{ 
                        maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', 
                        lineHeight: '1.8', opacity: 0.95, color: 'white', 
                        fontWeight: 400, textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        Nuestro catálogo de variedades de prueba se ha ido conformando en el tiempo. Por más de 10 años, hemos ido incorporando y probando nuevas variedades de manera de aumentar nuestra oferta a futuro.
                    </p>
                </div>
            </div>

            {/* 🧭 FILTER BAR (STICKY) */}
            <div style={{ 
                position: 'sticky', top: '75px', zIndex: 100, 
                background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', 
                borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', 
                marginBottom: '60px' 
            }}>
                <div className="container filter-scroll-container responsive-hide-scrollbar" style={{ 
                    display: 'flex', alignItems: 'center', 
                    padding: '12px 0', gap: '30px', overflowX: 'auto' 
                }}>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', minWidth: 'max-content' }}>
                        <span className="filter-label" style={{ fontWeight: 900, color: 'var(--color-primary)', marginRight: '8px', fontSize: '0.75rem' }}>CATEGORÍA:</span>
                        {[
                            { id: 'todas', label: 'Todas' },
                            { id: 'flores', label: 'Flores de Corte' },
                            { id: 'rizomas', label: 'Rizomas' }
                        ].map(cat => (
                            <button 
                                key={cat.id} 
                                onClick={() => setActiveCategory(cat.id)} 
                                className="filter-btn"
                                style={{ 
                                    border: activeCategory === cat.id ? '1px solid var(--color-primary)' : '1px solid #eee', 
                                    background: activeCategory === cat.id ? 'var(--color-primary)' : 'white', 
                                    color: activeCategory === cat.id ? 'white' : 'var(--color-primary)', 
                                    padding: '6px 14px', 
                                    borderRadius: '6px', 
                                    fontWeight: 600, 
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ width: '1px', height: '18px', background: 'rgba(0,0,0,0.06)', flexShrink: 0 }} />

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', minWidth: 'max-content' }}>
                        <span className="filter-label" style={{ fontWeight: 900, color: 'var(--color-primary)', marginRight: '8px', fontSize: '0.75rem' }}>COLOR:</span>
                        {Object.entries(colorMap).map(([name, gradient]) => (
                            <motion.div key={name} className="filter-swatch" whileHover={{ scale: 1.2 }} onClick={() => setActiveColor(activeColor === name ? null : name)} style={{ width: '22px', height: '22px', borderRadius: '50%', background: gradient, cursor: 'pointer', border: activeColor === name ? '2px solid var(--color-primary)' : '1px solid rgba(0,0,0,0.1)' }} title={name} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                <motion.div layout className="product-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '100px 0' }}>
                        <p style={{ opacity: 0.5, fontSize: '1.2rem' }}>No encontramos variedades con esos filtros...</p>
                        <button 
                            onClick={() => { setActiveCategory('todas'); setActiveColor(null); }} 
                            style={{ 
                                marginTop: '20px', background: 'none', border: 'none', 
                                color: 'var(--color-accent)', cursor: 'pointer', textDecoration: 'underline' 
                            }}
                        >Limpiar filtros</button>
                    </motion.div>
                )}
            </div>

            <style>{`
                .responsive-hide-scrollbar::-webkit-scrollbar { display: none; }
                .responsive-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                .product-image-wrapper { 
                    height: 420px; 
                    overflow: hidden; 
                    position: relative; 
                    border-radius: 20px; 
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px 20px;
                }

                .filter-scroll-container {
                    justify-content: center;
                }

                @media (max-width: 1024px) {
                    .product-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .product-image-wrapper {
                        height: auto;
                        aspect-ratio: 1/1;
                    }
                    .product-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }
                    .filter-scroll-container {
                        justify-content: flex-start;
                        gap: 24px;
                    }
                    .filter-label {
                        font-size: 0.6rem !important;
                        margin-right: 6px !important;
                    }
                    .filter-btn {
                        font-size: 0.64rem !important;
                        padding: 5px 11px !important;
                    }
                    .filter-swatch {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    .container {
                        padding-left: 5px !important;
                        padding-right: 5px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Catalog;
