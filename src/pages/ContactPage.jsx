import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import ProductBanner from '../components/ProductBanner';
import WordPressService from '../services/WordPressService';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        'your-name': '',
        'your-email': '',
        'your-subject': '',
        'your-message': ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            // Reemplazar '123' con el ID real del formulario CF7 si es necesario
            const res = await WordPressService.submitContact(formData, '123'); 
            if (res.status === 'mail_sent') {
                setStatus('success');
                setMsg(res.message || '¡Mensaje enviado con éxito! Nos contactaremos pronto.');
                setFormData({ 'your-name': '', 'your-email': '', 'your-subject': '', 'your-message': '' });
            } else {
                setStatus('error');
                setMsg(res.message || 'Hubo un problema. Por favor intenta de nuevo.');
            }
        } catch (err) {
            setStatus('error');
            setMsg('Error de conexión. Intenta más tarde.');
        }
    };

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <Header />
            <main style={{ paddingTop: '0' }}>
                
                {/* 🎯 HERO DE CONTACTO */}
                <section style={{ 
                    width: '100%',
                    position: 'relative',
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/peonias chile - Peonies.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '220px 0 100px 0',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <div className="container">
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '15px' }}
                        >
                            Hablemos de Peonías
                        </motion.p>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', color: 'white', marginBottom: '20px', fontWeight: 800 }}
                        >
                            Contacto <span style={{ color: 'var(--color-accent)' }}>Directo</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9, fontWeight: 300, lineHeight: 1.8, color: 'white' }}
                        >
                            Desde Coyhaique para el mundo. Resolvemos tus dudas sobre compras corporativas, eventos o el cuidado de tus ramos en la Patagonia.
                        </motion.p>
                    </div>
                </section>

                <section className="section-full">
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>
                        
                        {/* ✉️ FORMULARIO PREMIUM */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card" 
                            style={{ padding: '50px' }}
                        >
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Send size={24} color="var(--color-secondary)" />
                                Envíanos un mensaje
                            </h2>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        name="your-name" 
                                        placeholder="Nombre completo" 
                                        value={formData['your-name']}
                                        onChange={handleChange}
                                        required 
                                        className="premium-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <input 
                                        type="email" 
                                        name="your-email" 
                                        placeholder="Correo electrónico" 
                                        value={formData['your-email']}
                                        onChange={handleChange}
                                        required 
                                        className="premium-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        name="your-subject" 
                                        placeholder="Asunto (Ej: Evento, Pedido Mayorista)" 
                                        value={formData['your-subject']}
                                        onChange={handleChange}
                                        required 
                                        className="premium-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <textarea 
                                        name="your-message" 
                                        placeholder="Escribe aquí tu mensaje..." 
                                        rows="5" 
                                        value={formData['your-message']}
                                        onChange={handleChange}
                                        required
                                        className="premium-input"
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="btn-pro" 
                                    style={{ width: '100%', padding: '20px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}
                                >
                                    {status === 'loading' ? 'Enviando...' : (
                                        <>Enviar Mensaje <Send size={18} /></>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: 'rgba(0, 92, 57, 0.1)', color: 'var(--color-primary)', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <CheckCircle size={20} /> {msg}
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: 'rgba(255, 102, 102, 0.1)', color: '#d00', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <AlertCircle size={20} /> {msg}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>

                        {/* 🏔️ INFO DE CONTACTO & ESPÍRITU PATAGÓNICO */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
                        >
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '25px', color: 'var(--color-primary)' }}>Nuestra Presencia</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div className="glass-card" style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--color-accent)' }}>
                                            <MapPin size={24} color="var(--color-primary)" />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>Sede Patagonia</h4>
                                            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem', fontWeight: 300 }}>Camino Villa Ortega s/n, Coyhaique. Región de Aysén.</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div className="glass-card" style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--color-accent)' }}>
                                            <Phone size={24} color="var(--color-primary)" />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>Atención Clientes</h4>
                                            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem', fontWeight: 300 }}>+569 9 2990 735</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div className="glass-card" style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--color-accent)' }}>
                                            <Mail size={24} color="var(--color-primary)" />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>Consultas Mail</h4>
                                            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem', fontWeight: 300 }}>ventas@platiniumflowers.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ background: 'var(--color-primary)', color: 'white', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Atención Inmediata</h3>
                                    <p style={{ opacity: 0.8, fontWeight: 300, marginBottom: '25px', lineHeight: 1.6 }}>Si necesitas una respuesta rápida para stock de la semana, prefiere nuestro WhatsApp corporativo.</p>
                                    <a href="https://wa.me/56992990735" target="_blank" rel="noreferrer" className="btn-pro" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', padding: '15px 30px', textDecoration: 'none' }}>
                                        Chatear ahora <MessageCircle size={18} style={{ marginLeft: '10px' }} />
                                    </a>
                                </div>
                                <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }}>
                                    <Send size={150} color="white" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>
            </main>

            <style>{`
                .premium-input {
                    width: 100%;
                    padding: 18px 25px;
                    border-radius: 15px;
                    border: 1px solid rgba(0,0,0,0.06);
                    background: rgba(0,0,0,0.02);
                    font-family: inherit;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                }
                .premium-input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--color-accent);
                    box-shadow: 0 10px 30px rgba(0, 245, 212, 0.1);
                }
            `}</style>

            {/* 🧭 SECCIÓN INFORMATIVA BIFRONTE (UNIFICADA) */}
            <section style={{ padding: '80px 0', background: 'var(--color-bg)' }}>
                <div className="container" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '60px'
                }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '30px' }}
                    >
                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, color: 'var(--color-primary)', margin: 0 }}>
                            Nos encargamos de todo el proceso de cultivo y comercialización de nuestras flores y por eso nos hemos caracterizado a lo largo del tiempo.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '30px' }}
                    >
                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, color: 'var(--color-primary)', margin: 0 }}>
                            Nuestra disponibilidad de peonias va desde la última semana de Noviembre hasta mediados de Enero, para el mercado de flor de corte. 
                            La temporada de rizomas se prolonga desde fines de Abril a mediados de Junio.
                        </p>
                    </motion.div>
                </div>
            </section>

            <ProductBanner />
        </div>
    );
};

export default ContactPage;
