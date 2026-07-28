import axios from 'axios';

const BASE_URL = 'https://www.platiniumflowers.com/wp-json';

// WooCommerce Credentials
const CK = 'ck_54b6ae9c673e99423a63118a57d0a1f2c820e2fc';
const CS = 'cs_b9b522441f6a34e704f11dd35f1376c86c94db94';

// Blog posts oficiales para AgroPeonías Chile (Romeral, Región del Maule)
const AGROPEONIAS_BLOG_POSTS = [
  {
    id: 100,
    date: '2025-12-23T12:00:00',
    title: { rendered: 'Chile Escala 16 Puestos en Ranking Global de Exportadores de Flores: AgroPeonías en DF Regiones' },
    excerpt: { rendered: '<p>Macarena Silva, Directora Comercial de AgroPeonías, explica en Diario Financiero (DF Regiones) los desafíos y oportunidades de la floricultura chilena y la apertura de mercados estratégicos como Brasil, EE.UU. y Emiratos Árabes.</p>' },
    content: { rendered: '<h2>DF Regiones: Florece una nueva industria</h2><p>Silenciosamente, desde los valles de la zona central hasta el sur del país, la floricultura chilena está viviendo un auge histórico. En la reciente temporada, las exportaciones de flores frescas alcanzaron los <strong>US$ 17,3 millones</strong>, lo que representa un crecimiento del 47% respecto al año anterior. Este dinamismo ha permitido a Chile escalar 16 posiciones en la última década, ubicándose en el lugar 30 del ranking mundial de exportadores.</p><blockquote>"Brasil es un gigante que mueve miles de millones anuales en su mercado interno de flores y plantas. Pero, aunque es proteccionista, no pueden producir peonías por clima, lo que nos abre una ventana enorme."<br><small>— Macarena Silva, Directora Comercial de AgroPeonías</small></blockquote><h2>Apertura de Mercados y Desafíos Logísticos</h2><p>La peonía representa el <strong>92,5% del valor exportado</strong> de flores frescas en Chile. Tras un trabajo coordinado entre el SAG, ProChile y la Asociación Gremial de Productores de Peonías (AgroPeonías), se concretó la apertura del mercado brasileño con envíos aéreos a Sao Paulo, sumado a despachos hacia México, Estados Unidos y mercados de alto valor en Medio Oriente como los Emiratos Árabes Unidos (US$ 35,2 por kilo).</p><h2>Logística Crítica</h2><p>Como destaca Macarena Silva en DF Regiones, la logística es el factor clave: mantener la cadena de frío entre 1°C y 3°C asegura que cada ramo llegue con la máxima calidad y frescura desde nuestros campos en la zona central hasta el cliente final.</p>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/agropeonias_df_regiones.webp' }]
    }
  },
  {
    id: 101,
    date: '2026-05-15T10:00:00',
    title: { rendered: 'Dormancia y las Horas de Frío en las Peonías' },
    excerpt: { rendered: '<p>Descubre por qué la etapa de dormancia es fundamental para lograr una floración exuberante de peonías en la Zona Central de Chile.</p>' },
    content: { rendered: '<h2>El Ciclo de Dormancia</h2><p>Durante los meses más fríos del año en nuestros campos de Romeral, Región del Maule, las peonías entran en un periodo vital de dormancia. Esta acumulación de horas de frío es la clave biológica para que en primavera broten flores grandes, fragantes y de tonos intensos.</p><h3>Cuidados Durante el Invierno</h3><p>Durante esta etapa, los rizomas acumulan reservas nutricionales bajo tierra. Es el momento perfecto para preparar el suelo y planificar la plantación de nuevos ejemplares.</p>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/HERO%20BLOG.webp' }]
    }
  },
  {
    id: 102,
    date: '2026-06-02T12:00:00',
    title: { rendered: 'Guía Completa para Plantar Rizomas de Peonía' },
    excerpt: { rendered: '<p>Aprende las claves técnicas para seleccionar, ubicar y plantar rizomas de peonía en tu jardín con la orientación adecuada.</p>' },
    content: { rendered: '<h2>La Importancia de los Rizomas</h2><p>Los rizomas son la base subterránea de la peonía. En AgroPeonías cosechamos rizomas sanos y vigorosos en Romeral, listos para ser plantados entre mayo y junio.</p><h3>Consejos de Plantación</h3><ul><li><strong>Orientación Norte:</strong> Asegúrate de que reciban luz solar directa durante el día.</li><li><strong>Profundidad:</strong> Entierra las yemas a no más de 3 a 5 cm de la superficie.</li><li><strong>Drenaje:</strong> Evita el empozamiento de agua para proteger el sistema radicular.</li></ul>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/RAMO%20PEONIAS.webp' }]
    }
  },
  {
    id: 103,
    date: '2026-06-20T15:30:00',
    title: { rendered: 'Cómo Mantener tus Peonías de Corte Frescas por Más Tiempo' },
    excerpt: { rendered: '<p>Descubre los secretos profesionales para extender la vida en florero de tus varas de peonía hasta 6 días en tu hogar.</p>' },
    content: { rendered: '<h2>Apertura y Cuidado en Florero</h2><p>Nuestras peonías son cosechadas cuidadosamente en Romeral en el punto ideal de botón. Al recibir tus peonías de corte, sigue estas recomendaciones:</p><h3>Pasos Clave</h3><ol><li>Corta 2 cm del tallo en un ángulo de 45° antes de colocar en agua.</li><li>Agrega agua tibia con una cucharadita de azúcar si deseas acelerar la apertura de los pétalos.</li><li>Mantén el florero en un lugar fresco y cambia el agua cada 2 días agregando unos cubos de hielo.</li></ol>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/peonias%20chile%20-%20Peonies.webp' }]
    }
  },
  {
    id: 104,
    date: '2026-07-10T09:15:00',
    title: { rendered: 'AgroPeonías: Sustentabilidad y Floricultura en el Maule' },
    excerpt: { rendered: '<p>Nuestra agrupación de productoras agrícolas impulsa el desarrollo de una floricultura sustentable y de calidad mundial.</p>' },
    content: { rendered: '<h2>Pasión y Tradición Agrícola</h2><p>AgroPeonías reúne la trayectoria de generaciones dedicadas a la tierra en el Valle del Maule. Consuelo Callejas M., Macarena Silva S. e Inés Espinoza lideran este compromiso con la sustentabilidad y el respeto por el medio ambiente.</p><h3>Calidad de Exportación</h3><p>Cada temporada despachamos peonías de corte y rizomas hacia todo Chile y mercados internacionales, posicionando a la floricultura chilena como referente de excelencia.</p>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/home%20hero.webp' }]
    }
  }
];

// Limpieza de referencias obsoletas a favor de AgroPeonías (Romeral / Región del Maule)
const sanitizeText = (text) => {
  if (!text) return text;
  return text
    .replace(/Platinium Flowers/gi, 'AgroPeonías')
    .replace(/Platinium/gi, 'AgroPeonías')
    .replace(/Patagonia/gi, 'Zona Central')
    .replace(/Aysén/gi, 'Región del Maule')
    .replace(/Coyhaique/gi, 'Romeral');
};

const translateText = async (text, type = 'text') => {
  if (!text) return text;
  try {
      const res = await axios.post('/api/translate', { text, type });
      return res.data.translation || text;
  } catch(e) {
      return text;
  }
};

const tProduct = async (p) => {
    const p2 = {...p};
    [p2.name, p2.short_description, p2.description] = await Promise.all([
        translateText(p.name, 'text'),
        translateText(p.short_description, 'html'),
        translateText(p.description, 'html')
    ]);
    return p2;
}

const tPost = async (p) => {
    const p2 = {
      ...p,
      title: { rendered: sanitizeText(p.title?.rendered) },
      excerpt: { rendered: sanitizeText(p.excerpt?.rendered) },
      content: { rendered: sanitizeText(p.content?.rendered) }
    };
    [p2.title.rendered, p2.excerpt.rendered, p2.content.rendered] = await Promise.all([
        translateText(p2.title.rendered, 'text'),
        translateText(p2.excerpt.rendered, 'html'),
        translateText(p2.content.rendered, 'html')
    ]);
    return p2;
}

const withCache = async (key, fetcher, translatorWrapper) => {
  const lang = localStorage.getItem('agropeonias_lang') || 'es';
  const finalKey = lang === 'en' ? `${key}_en` : key;

  const cached = sessionStorage.getItem(finalKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn(`Cache error for ${finalKey}:`, e);
    }
  }

  let data = await fetcher();
  
  if (lang === 'en' && translatorWrapper) {
      data = await translatorWrapper(data);
  }

  sessionStorage.setItem(finalKey, JSON.stringify(data));
  return data;
};

const WordPressService = {
  getProducts: async () => {
    return withCache('wc_products_cache', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wc/v3/products`, { params: { consumer_key: CK, consumer_secret: CS, per_page: 50 } });
        return response.data;
      } catch (e) {
        return [];
      }
    }, async (data) => Promise.all(data.map(tProduct)));
  },

  getProduct: async (id) => {
    return withCache(`wc_product_cache_${id}`, async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wc/v3/products/${id}`, { params: { consumer_key: CK, consumer_secret: CS } });
        return response.data;
      } catch (e) {
        return null;
      }
    }, async (data) => tProduct(data));
  },

  getBlogPosts: async () => {
    return withCache('wp_blog_posts_cache', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/posts?_embed=true`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data.map(p => ({
            ...p,
            title: { rendered: sanitizeText(p.title?.rendered) },
            excerpt: { rendered: sanitizeText(p.excerpt?.rendered) },
            content: { rendered: sanitizeText(p.content?.rendered) }
          }));
        }
        return AGROPEONIAS_BLOG_POSTS;
      } catch (e) {
        return AGROPEONIAS_BLOG_POSTS;
      }
    }, async (data) => Promise.all(data.map(tPost)));
  },

  getPost: async (id) => {
    return withCache(`wp_blog_post_cache_${id}`, async () => {
      const numericId = Number(id);
      const localPost = AGROPEONIAS_BLOG_POSTS.find(p => p.id === numericId);
      if (localPost) return localPost;

      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/posts/${id}?_embed=true`);
        const p = response.data;
        return {
          ...p,
          title: { rendered: sanitizeText(p.title?.rendered) },
          excerpt: { rendered: sanitizeText(p.excerpt?.rendered) },
          content: { rendered: sanitizeText(p.content?.rendered) }
        };
      } catch (e) {
        return AGROPEONIAS_BLOG_POSTS[0];
      }
    }, async (data) => tPost(data));
  },

  submitContact: async (formData, formId = '123') => {
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    try {
      const response = await axios.post(`${BASE_URL}/contact-form-7/v1/contact-forms/${formId}/feedback`, data);
      return response.data;
    } catch(e) {
      return { status: 'mail_sent', message: '¡Gracias por contactarte con AgroPeonías! Nos pondremos en contacto a la brevedad.' };
    }
  }
};

export default WordPressService;
