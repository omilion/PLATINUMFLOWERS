import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [{ n: 'Inicio', p: '/' }, { n: 'Catálogo', p: '/catalogo' }, { n: 'Blog', p: '/blog' }, { n: 'Contacto', p: '/contacto' }];
    const isDarkBgPage = location.pathname === '/' || location.pathname === '/catalogo' || location.pathname === '/contacto' || location.pathname.startsWith('/blog');
    const headerColor = (isDarkBgPage && !isScrolled) ? 'white' : 'var(--color-primary)';

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
            padding: isScrolled ? '15px 0' : '25px 0', 
            transition: 'all 0.4s ease',
            background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent', 
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
            color: headerColor,
            transform: (location.pathname === '/' && !isScrolled) ? 'translateY(-100%)' : 'translateY(0)',
            opacity: (location.pathname === '/' && !isScrolled) ? 0 : 1,
            pointerEvents: (location.pathname === '/' && !isScrolled) ? 'none' : 'auto'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <motion.img 
                        key={isScrolled ? 'v' : 'b'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={isScrolled ? "/logo platinum flower full verde hori.webp" : "/logo platinum flower full blanco hori.webp"}
                        alt="Platinium Flowers"
                        style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
                    />
                </Link>

                <nav style={{ display: 'none' }} className="desktop-nav">
                    <ul style={{ display: 'flex', listStyle: 'none', gap: '45px' }}>
                        {navItems.map((i) => (
                            <li key={i.p}><Link to={i.p} style={{ 
                                textDecoration: 'none', 
                                color: headerColor, 
                                fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', 
                                opacity: location.pathname === i.p ? 1 : 0.7, 
                                position: 'relative', paddingBottom: '8px' 
                            }}>
                                {i.n}
                                {location.pathname === i.p && <motion.div layoutId="n" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: isDarkBgPage && !isScrolled ? 'white' : 'var(--color-accent)' }} />}
                            </Link></li>
                        ))}
                    </ul>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                     <Link to="/catalogo" className="btn-pro" style={{ 
                        padding: '12px 28px', fontSize: '0.75rem', display: 'none',
                        background: isDarkBgPage && !isScrolled ? 'white' : 'var(--color-primary)',
                        color: isDarkBgPage && !isScrolled ? 'var(--color-primary)' : 'white'
                     }} id="cta-d">Comprar ahora</Link>
                     <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ 
                        background: headerColor, 
                        border: 'none', 
                        color: isDarkBgPage && !isScrolled ? 'var(--color-primary)' : 'white', 
                        padding: '10px', borderRadius: '12px', cursor: 'pointer' 
                     }} id="m-toggle">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} style={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100vh', background: 'var(--color-primary)', zIndex: 1001, padding: '100px 40px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <button onClick={() => setIsMenuOpen(false)} style={{ position: 'absolute', top: '30px', right: '40px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px', borderRadius: '50%' }}><X size={30} /></button>
                        {navItems.map((i) => (<Link key={i.p} to={i.p} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'white', fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-2px' }}>{i.n}</Link>))}
                        <Link to="/catalogo" className="btn-pro" style={{ marginTop: '40px', textAlign: 'center' }}>Ir al Catálogo</Link>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                @media (min-width: 1024px) { .desktop-nav { display: block !important; } #m-toggle { display: none !important; } #cta-d { display: inline-block !important; } }
            `}</style>
        </header>
    );
};
export default Header;
