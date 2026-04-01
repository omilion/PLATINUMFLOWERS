import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import WordPressService from '../services/WordPressService';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPost = async () => {
            try {
                const data = await WordPressService.getPost(id);
                setPost(data);
                setLoading(false);
            } catch (err) {
                console.error("Error cargando el post", err);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffff', paddingTop: '100px' }}>
                <p style={{ letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800 }}>Cargando Artículo...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#ffffff', paddingTop: '100px' }}>
                <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>Artículo no encontrado</h2>
                <Link to="/blog" className="btn-pro" style={{ marginTop: '30px' }}>Volver al Blog</Link>
            </div>
        );
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/1200x600';
    const date = new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Corrector Inteligente de HTML para combatir Plugins de WordPress (LazyLoad, Srcsets rotos, URLs relativas)
    let cleanHTML = post.content.rendered;
    
    // 1. Extraer la URL original si está camuflada por un plugin de Lazy Load en un data-src, data-lazy-src o data-orig-file
    cleanHTML = cleanHTML.replace(/<img(.*?)data-src="([^"]+)"(.*?)>/g, '<img$1src="$2"$3>');
    cleanHTML = cleanHTML.replace(/<img(.*?)data-orig-file="([^"]+)"(.*?)>/g, '<img$1src="$2"$3>');
    
    // 2. Si las imágenes están en paths relativos (ej: href="/wp-content..."), reescribirlas como absolutas hacia el backend real
    cleanHTML = cleanHTML.replace(/src="\/(?!\/)([^"]*)"/g, 'src="https://www.platiniumflowers.com/$1"');
    
    // 3. Eliminar strings de 'srcset' porque suelen tener URLs rotas arrastradas de migraciones o entornos de localhost previos
    cleanHTML = cleanHTML.replace(/srcset="([^"]*)"/gi, '');
    
    // 4. Force override del domino obsoleto .cl con expiración SSL al actual .com para que el navegador confíe en y rendere las imágenes parseadas del HTML.
    cleanHTML = cleanHTML.replace(/platiniumflowers\.cl/g, 'platiniumflowers.com');

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Cabecera / Hero Image del Post */}
            <div style={{ position: 'relative', width: '100%', height: '65vh', minHeight: '500px', backgroundColor: 'var(--color-primary)' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                    <img src={featuredImage} alt={post.title.rendered} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,23,32,0.9) 0%, rgba(16,23,32,0.1) 100%)' }} />
                </div>
                
                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '60px' }}>
                    <Link to="/blog" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <ArrowLeft size={16} /> Volver al Blog
                    </Link>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '20px', maxWidth: '900px', fontWeight: 800 }}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', gap: '30px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 500 }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} color="var(--color-accent)"/> Publicado: {date}</span>
                    </motion.div>
                </div>
            </div>

            {/* Inyección HTML del cuerpo del artículo */}
            <div className="container" style={{ maxWidth: '850px', margin: '0 auto', paddingTop: '80px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="wp-content-injected"
                    style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-text)', opacity: 0.9 }}
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                />
                
                {/* Footer Call to Action del Post */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '100px', padding: '60px 40px', background: '#F8F9FA', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontSize: '2rem' }}>¿Inspirado por este artículo?</h3>
                    <p style={{ opacity: 0.8, marginBottom: '30px', fontSize: '1.1rem', color: 'var(--color-text)' }}>Conoce nuestros formatos de exportación directamente desde la Patagonia.</p>
                    <Link to="/catalogo" className="btn-pro" style={{ display: 'inline-block' }}>Ver Formatos de Peonías</Link>
                </motion.div>
            </div>
            
            {/* Añadimos estilos globales para formatear el HTML que tira WordPress por defecto */}
            <style dangerouslySetInnerHTML={{__html: `
                .wp-content-injected h2 { color: var(--color-primary); margin-top: 50px; margin-bottom: 25px; font-size: 2.2rem; font-weight: 800; }
                .wp-content-injected h3 { color: var(--color-primary); margin-top: 40px; margin-bottom: 20px; font-size: 1.8rem; font-weight: 700; }
                .wp-content-injected p { margin-bottom: 25px; }
                .wp-content-injected img { max-width: 100%; height: auto; border-radius: 15px; margin: 30px 0; }
                .wp-content-injected figure { margin: 30px 0; text-align: center; }
                .wp-content-injected figcaption { font-size: 0.9rem; opacity: 0.6; margin-top: 10px; }
                .wp-content-injected ul { margin-bottom: 25px; padding-left: 20px; }
                .wp-content-injected li { margin-bottom: 10px; }
                .wp-content-injected blockquote { border-left: 5px solid var(--color-accent); padding-left: 25px; margin: 40px 0; font-style: italic; font-size: 1.4rem; color: var(--color-primary); }
            `}} />
        </div>
    );
};

export default SinglePost;
