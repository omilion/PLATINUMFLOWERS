import axios from 'axios';

const BASE_URL = 'https://www.platiniumflowers.com/wp-json';

// WooCommerce Credentials
const CK = 'ck_54b6ae9c673e99423a63118a57d0a1f2c820e2fc';
const CS = 'cs_b9b522441f6a34e704f11dd35f1376c86c94db94';

/**
 * Helper to handle session caching
 */
const withCache = async (key, fetcher) => {
  const cached = sessionStorage.getItem(key);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn(`Cache error for ${key}:`, e);
    }
  }

  const data = await fetcher();
  sessionStorage.setItem(key, JSON.stringify(data));
  return data;
};

const WordPressService = {
  /**
   * Obtiene los productos de WooCommerce (con caché de sesión)
   */
  getProducts: async () => {
    return withCache('wc_products_cache', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wc/v3/products`, {
          params: {
            consumer_key: CK,
            consumer_secret: CS,
            per_page: 50
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching WC products:', error.response?.data || error.message);
        throw error;
      }
    });
  },

  /**
   * Obtiene un producto individual por ID (con caché)
   */
  getProduct: async (id) => {
    return withCache(`wc_product_cache_${id}`, async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wc/v3/products/${id}`, {
          params: {
            consumer_key: CK,
            consumer_secret: CS
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching WC product ${id}:`, error.response?.data || error.message);
        throw error;
      }
    });
  },

  /**
   * Obtiene las noticias del blog (con caché de sesión e imágenes embebidas)
   */
  getBlogPosts: async () => {
    return withCache('wp_blog_posts_cache', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/posts?_embed=true`);
        return response.data;
      } catch (error) {
        console.error('Error fetching WP blog posts:', error.response?.data || error.message);
        throw error;
      }
    });
  },

  /**
   * Obtiene un post individual del blog por ID (con caché e imágenes embebidas)
   */
  getPost: async (id) => {
    return withCache(`wp_blog_post_cache_${id}`, async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/posts/${id}?_embed=true`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching WP post ${id}:`, error.response?.data || error.message);
        throw error;
      }
    });
  },

  /**
   * Envía un formulario de contacto a través de Contact Form 7 (REST API)
   * Requiere el ID del formulario configurado en WordPress.
   */
  submitContact: async (formData, formId = '123') => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(`${BASE_URL}/contact-form-7/v1/contact-forms/${formId}/feedback`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default WordPressService;
