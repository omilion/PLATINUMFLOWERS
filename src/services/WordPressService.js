import axios from 'axios';

const BASE_URL = 'https://www.platiniumflowers.com/wp-json';

// WooCommerce Credentials
const CK = 'ck_54b6ae9c673e99423a63118a57d0a1f2c820e2fc';
const CS = 'cs_b9b522441f6a34e704f11dd35f1376c86c94db94';

/**
 * Cliente seguro Vercel->Neon->Gemini
 */
const translateText = async (text, type = 'text') => {
  if (!text) return text;
  try {
      const res = await axios.post('/api/translate', { text, type });
      return res.data.translation || text;
  } catch(e) {
      console.warn("AI Proxy Failed, falling back to ES:", e);
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
    const p2 = {...p, title: {...p.title}, excerpt: {...p.excerpt}, content: {...p.content}};
    [p2.title.rendered, p2.excerpt.rendered, p2.content.rendered] = await Promise.all([
        translateText(p.title.rendered, 'text'),
        translateText(p.excerpt.rendered, 'html'),
        translateText(p.content.rendered, 'html')
    ]);
    return p2;
}

/**
 * Helper to handle session caching & AI Translation Wrapping
 */
const withCache = async (key, fetcher, translatorWrapper) => {
  const lang = localStorage.getItem('platinium_lang') || 'es';
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
      const response = await axios.get(`${BASE_URL}/wc/v3/products`, { params: { consumer_key: CK, consumer_secret: CS, per_page: 50 } });
      return response.data;
    }, async (data) => Promise.all(data.map(tProduct)));
  },

  getProduct: async (id) => {
    return withCache(`wc_product_cache_${id}`, async () => {
      const response = await axios.get(`${BASE_URL}/wc/v3/products/${id}`, { params: { consumer_key: CK, consumer_secret: CS } });
      return response.data;
    }, async (data) => tProduct(data));
  },

  getBlogPosts: async () => {
    return withCache('wp_blog_posts_cache', async () => {
      const response = await axios.get(`${BASE_URL}/wp/v2/posts?_embed=true`);
      return response.data;
    }, async (data) => Promise.all(data.map(tPost)));
  },

  getPost: async (id) => {
    return withCache(`wp_blog_post_cache_${id}`, async () => {
      const response = await axios.get(`${BASE_URL}/wp/v2/posts/${id}?_embed=true`);
      return response.data;
    }, async (data) => tPost(data));
  },

  submitContact: async (formData, formId = '123') => {
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    const response = await axios.post(`${BASE_URL}/contact-form-7/v1/contact-forms/${formId}/feedback`, data);
    return response.data;
  }
};

export default WordPressService;
