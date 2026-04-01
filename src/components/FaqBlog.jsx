import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WordPressService from '../services/WordPressService';
import { ChevronDown, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = ({ limit, variant = 'grid', hideTitle = false }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await WordPressService.getBlogPosts();
                setPosts(limit ? data.slice(0, limit) : data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [limit]);

    if (loading) return null;

    return (
        <section className={hideTitle ? "" : "section-full"}>
            <div className="container">
                {!hideTitle && (
                    <motion.div 
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Inspiración & <span style={{ color: 'var(--color-secondary)' }}>Historias</span></h2>
                        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>Consejos expertos para cuidar tus peonías y secretos de la Patagonia.</p>
                    </motion.div>
                )}

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: variant === 'overlay' ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: 'var(--space-xl)' 
                }}>
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`glass-card ${limit && idx >= 2 ? 'hide-on-mobile' : ''}`}
                            style={{ 
                                padding: 0, 
                                height: variant === 'overlay' ? '450px' : 'auto', 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: variant === 'overlay' ? 'none' : 'var(--color-white)',
                                overflow: 'hidden'
                            }}
                        >
                            {variant === 'overlay' ? (
                                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                                    <img 
                                        src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400'} 
                                        alt={post.title.rendered}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-fluid)' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%, var(--color-primary))', opacity: 0.9 }}></div>
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '30px', color: 'white' }}>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        <Link to={`/blog/${post.id}`} style={{ color: 'var(--color-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Leer historia <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ height: '250px', overflow: 'hidden' }}>
                                        <img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400'} alt={post.title.rendered} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        <div style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '30px' }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                        <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', background: 'rgba(0,0,0,0.03)', padding: '12px 25px', borderRadius: '30px', color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content', marginTop: 'auto' }}>
                                            Leer Artículo <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
                {limit && (
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link to="/blog" className="glass-card" style={{ padding: '18px 40px', borderRadius: '50px', textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>
                             Ver todo el Blog
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            style={{ padding: '20px 0', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.1)' }} 
            onClick={() => setIsOpen(!isOpen)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 600, color: 'var(--color-primary)', paddingRight: '20px' }}>{question}</h3>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown color="var(--color-primary)" size={18} /></motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ marginTop: '15px', color: 'var(--color-text)', opacity: 0.7, fontWeight: 300, lineHeight: 1.6, fontSize: '0.95rem' }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    const faqs = [
        { q: "¿Necesitas que tus flores se abran más rápido porque las necesitas para un evento?", a: "Toma un florero, agrega agua tibia y una cucharada de azúcar, revuelve bien para disolver el azúcar y acomoda las flores. Coloca el florero en un lugar cálido. Esto acelerará la floración de tus peonías." },
        { q: "¿Cuánto dura una peonía en florero?", a: "Una peonía en florero dura de 5 a 6 días cuando se recibe en etapa de botón. Las condiciones de temperatura afectan directamente la vida útil de las flores en el florero." },
        { q: "¿Puedo mantener mis peonías por unos días más en botón?", a: "Sí. Puedes tomar tus ramos, envolverlos en una bolsa de plástico y dejarlos en el refrigerador en la parte inferior. Esto ayudará a mantenerlas unos 2 o 3 días más en botón. Recuerda que cuanto más tiempo pasen en frío, menor será su vida útil en el florero." },
        { q: "¿Cómo puedo hacer que mis flores duren más en un florero?", a: "A las peonías, como a todas las flores, les afecta el calor. Para que duren más, puedes cortar el tallo unos 2 cm cada dos días y cambiar el agua del florero. Al mismo tiempo, puedes agregar unos cubos de hielo dos veces al día para enfriar el agua y ayudar a la hidratación." },
        { q: "¿Cómo pido mis peonías?", a: "Puedes hacerlo por correo electrónico o por teléfono, también por Facebook o Instagram. Solo tienes que tener claras las variedades o colores que te gustan y confirmar la disponibilidad para la fecha que las necesitas. Tenemos stock semanal en Santiago que varía cada semana. Si requieres un volumen mayor de flores, debemos coordinar la fecha y el retiro de las mismas." },
        { q: "¿Cómo se venden las peonías?", a: "Se venden en cajas de 100 varas de color sólido (un solo color) o variedades mixtas (varios colores). Este formato es muy utilizado para compartir entre varias personas. También manejamos stock en ramos de 5 varas, según las variedades que se cosechan semanalmente." },
        { q: "¿Cómo es la entrega o dónde retiro mis peonías?", a: "El valor de la vara incluye el envío desde el huerto a Santiago. El cliente retira en nuestras oficinas ubicadas en Santiago. Debes confirmar el pago del pedido y luego retirarlo en los horarios que acordamos con cada cliente. Si requieres envío, podemos coordinar un Uber o podemos enviarlas con un cargo extra y el mínimo es una caja." },
        { q: "¿Venden rizomas o plantas de peonía?", a: "A partir de mayo tenemos disponibles rizomas de peonía. Cada temporada manejamos un stock diferente de variedades de las cuales puedes elegir las que más te gusten." },
        { q: "¿Puedo pedir rizomas a regiones?", a: "Realizamos envíos a regiones desde Santiago. Se envían \"por pagar\" por bus o avión, según la preferencia del cliente." },
        { q: "¿Cómo cultivar mis peonías?", a: "Sigue nuestros consejos y podrás cultivar peonías en tu jardín. Con cuidados constantes lograrás buenos resultados." },
        { q: "¿Las peonías son de sol o de sombra?", a: "La mayoría de las peonías son de sol. Deben estar orientadas al norte al momento de la plantación. Algunas variedades más delicadas necesitan semisombra. A medida que la planta se desarrolle, te irás dando cuenta de sus requerimientos." }
    ];

    const half = Math.ceil(faqs.length / 2);
    const leftCol = faqs.slice(0, half);
    const rightCol = faqs.slice(half);

    return (
        <section id="faq" className="section-full" style={{ background: '#ffffff', padding: '100px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                     <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 700 }}>Preguntas Frecuentes</h2>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                        {leftCol.map((f, i) => (
                            <FaqItem key={`l-${i}`} question={f.q} answer={f.a} />
                        ))}
                    </div>
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                        {rightCol.map((f, i) => (
                            <FaqItem key={`r-${i}`} question={f.q} answer={f.a} />
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ 
                    marginTop: '80px', position: 'relative', overflow: 'hidden', padding: '80px 40px', 
                    borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'
                }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img src="/BANER%20CTA%20FINAL.webp" alt="Asistencia WhatsApp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)' }} />
                    </div>
                    
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <MessageCircle size={45} color="var(--color-accent)" style={{ marginBottom: '20px', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
                         <h3 style={{ color: 'white', marginBottom: '30px', fontSize: '2rem', fontWeight: 800, textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>¿Sigues con dudas sobre el proceso?</h3>
                         <a href="https://wa.me/56992990735" target="_blank" rel="noreferrer" className="btn-pro" style={{ padding: '16px 40px', fontSize: '1.05rem', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>Acláralas vía WhatsApp</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Blog, Faq };
