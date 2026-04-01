import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WordPressService from '../services/WordPressService';
import { ArrowLeft, MessageCircle, Info, Check, ShieldCheck, Truck, ChevronRight, ChevronLeft, X } from 'lucide-react';
import Header from '../components/Header';
import ProductCarousel from '../components/ProductCarousel';
const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [randomPost, setRandomPost] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch Current Product
                const pData = await WordPressService.getProduct(id);
                setProduct(pData);
                setLoading(false);

                // Fetch Related (All)
                const allP = await WordPressService.getProducts();
                setRelatedProducts(allP.filter(p => p.id !== parseInt(id)).slice(0, 6));

                // Fetch Random Blog Post
                const allPosts = await WordPressService.getBlogPosts();
                if (allPosts.length > 0) {
                    setRandomPost(allPosts[Math.floor(Math.random() * allPosts.length)]);
                }
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchAllData();
        window.scrollTo(0, 0);
    }, [id]);

    const [carouselIndex, setCarouselIndex] = useState(0);
    const nextRelated = () => {
        const visibleCols = window.innerWidth < 768 ? 2 : 4;
        const maxIndex = Math.max(0, relatedProducts.length - visibleCols);
        setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };
    const prevRelated = () => {
        const visibleCols = window.innerWidth < 768 ? 2 : 4;
        const maxIndex = Math.max(0, relatedProducts.length - visibleCols);
        setCarouselIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const parseShortDescription = (html) => {
        if (!html) return [];
        // Replace <br> with newlines and remove other tags
        const cleanHtml = html.replace(/<br\s*\/?>/gi, '\n');
        const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
        const text = doc.body.textContent || "";

        return text.split('\n')
            .map(line => line.trim())
            .filter(line => line.includes('_'))
            .map(line => {
                const parts = line.split('_');
                const label = parts[0].trim();
                const desc = parts.slice(1).join('_').trim();
                return { label, desc };
            });
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '40px', height: '40px', border: '4px solid var(--color-accent)', borderTopColor: 'transparent', borderRadius: '50%' }} />
        </div>
    );

    if (!product) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Producto no encontrado</div>;

    const waLink = `https://wa.me/56992990735?text=Hola! Estoy interesado en la peonía: ${product.name} (ID: ${product.id})`;
    const productFeatures = parseShortDescription(product.short_description);

    return (
        <>
            <Header />
            <main style={{ background: 'var(--color-bg)', paddingTop: 0, paddingBottom: '100px' }}>
                {/* Thin Hero Banner exclusive for Nav bar overlap context */}
                <div style={{ position: 'relative', width: '100%', height: '160px', marginBottom: '40px', overflow: 'hidden' }}>
                    <img 
                        src="/HERO%20SINGLE%20PRODUCT%20(Grande).webp" 
                        alt="Flor de Exportación Peonías" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
                </div>
                
                <div className="container">

                    {/* Breadcrumbs */}
                    <nav className="responsive-center" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.5 }}>Home</Link>
                        <span style={{ opacity: 0.3 }}>/</span>
                        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.5 }}>Catálogo</Link>
                        <span style={{ opacity: 0.3 }}>/</span>
                        <span style={{ fontWeight: 700 }}>{product.name}</span>
                    </nav>

                    {/* Title Header (Full Width on top) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginBottom: '40px' }}
                        className="responsive-center"
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: 'var(--color-primary)', margin: 0 }} dangerouslySetInnerHTML={{ __html: product.name }} />
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>
                        {/* Gallery Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card mobile-edge-to-edge"
                                style={{ padding: '10px', height: '500px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        src={product.images[activeImage]?.src}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                                    />
                                </AnimatePresence>
                            </motion.div>

                            <div className="responsive-hide-scrollbar" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px', justifyContent: 'center' }}>
                                {product.images.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setActiveImage(idx)}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            flexShrink: 0,
                                            cursor: 'pointer',
                                            borderRadius: '12px',
                                            padding: '4px',
                                            border: activeImage === idx ? '2px solid var(--color-accent)' : '2px solid transparent',
                                            background: 'var(--glass-bg)',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img src={img.src} alt={idx} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Details Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
                            className="responsive-center"
                        >
                            <div className="glass-card" style={{ padding: '35px' }}>
                                <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'inherit' }}>
                                    <Info size={20} color="var(--color-secondary)" />
                                    Sobre la Variedad
                                </h3>
                                <div style={{ opacity: 0.8, lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>

                            {/* Technical Grid (2 columns on Desktop) */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                gap: '15px'
                            }}>
                                {productFeatures.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="glass-card"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            padding: '15px 20px',
                                            background: 'rgba(25, 198, 107, 0.05)',
                                            borderLeft: '4px solid var(--color-accent)'
                                        }}
                                    >
                                        <span style={{
                                            color: 'var(--color-primary)',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
                                            opacity: 0.5
                                        }}>
                                            {feat.label}
                                        </span>
                                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 400, opacity: 0.9 }}>
                                            {feat.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                                    <ShieldCheck color="var(--color-secondary)" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Calidad Certificada</span>
                                </div>
                                <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                                    <Truck color="var(--color-secondary)" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Envíos a todo Chile</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-pro"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '25px', width: '100%', fontSize: '1.1rem' }}
                                >
                                    <MessageCircle size={24} />
                                    Consultar Peonías
                                </a>
                                <p style={{ textAlign: 'center', marginTop: '15px', opacity: 0.5, fontSize: '0.8rem' }}>
                                    *Atención personalizada de exportación.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products Carousel Modularizado */}
                <ProductCarousel 
                    subtitle="Showroom" 
                    title="Variedades que <span style='color: var(--color-secondary)'>te pueden interesar</span>" 
                    excludeId={id} 
                />

                {/* Random Blog Banner */}
                {randomPost && (
                    <section className="section-full">
                        <div className="container">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass-card"
                                style={{
                                    padding: 0,
                                    overflow: 'hidden',
                                    height: '350px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    src={randomPost._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                                    alt={randomPost.title.rendered}
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--color-primary) 0%, transparent 100%)', opacity: 0.85 }}></div>
                                <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '60px', maxWidth: '700px' }}>
                                    <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '15px' }}>Desde el Blog Patagonia</p>
                                    <h2 style={{ color: 'white', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', marginBottom: '30px', lineHeight: 1.1, fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: randomPost.title.rendered }} />
                                    <a href={randomPost.link} target="_blank" rel="noreferrer" className="btn-pro" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', padding: '12px 35px', fontSize: '0.9rem' }}>
                                        Seguir Leyendo
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            {/* Lightbox Modal Interactivo */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: 'rgba(0, 0, 0, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                            cursor: 'zoom-out'
                        }}
                    >
                        {/* Controles Navigacionales */}
                        {product.images.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === 0 ? product.images.length - 1 : prev - 1); }}
                                    style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', padding: '15px', color: 'white', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(5px)' }}
                                >
                                    <ChevronLeft size={35} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === product.images.length - 1 ? 0 : prev + 1); }}
                                    style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', padding: '15px', color: 'white', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(5px)' }}
                                >
                                    <ChevronRight size={35} />
                                </button>
                            </>
                        )}
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                            style={{ position: 'absolute', top: '25px', right: '30px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '10px', color: 'white', cursor: 'pointer', zIndex: 10 }}
                        >
                            <X size={30} />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                src={product.images[activeImage]?.src}
                                onClick={(e) => e.stopPropagation()}
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '15px', cursor: 'default' }}
                            />
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 1024px) {
                    .responsive-center {
                        text-align: center;
                        justify-content: center !important;
                        align-items: center !important;
                    }
                    .responsive-center h1 {
                        text-align: center;
                    }
                    .responsive-hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .responsive-hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .mobile-edge-to-edge {
                        width: calc(100% + 40px) !important;
                        margin-left: -20px !important;
                        margin-right: -20px !important;
                        border-radius: 0 !important;
                        height: 60vh !important;
                        padding: 0 !important;
                        max-width: none !important;
                    }
                }
            `}</style>

        </>
    );
};

export default ProductPage;
