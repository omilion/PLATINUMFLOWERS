import axios from 'axios';

const BASE_URL = 'https://www.platiniumflowers.com/wp-json';
const CK = 'ck_54b6ae9c673e99423a63118a57d0a1f2c820e2fc';
const CS = 'cs_b9b522441f6a34e704f11dd35f1376c86c94db94';

async function checkProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/wc/v3/products`, {
      auth: { username: CK, password: CS },
      params: { per_page: 5, status: 'publish' }
    });
    
    console.log('--- PRODUCT DATA PREVIEW ---');
    response.data.forEach(p => {
      console.log(`ID: ${p.id} | Name: ${p.name} | Price: ${p.price}`);
      console.log(`Images: ${p.images.length > 0 ? p.images[0].src : 'No image'}`);
      console.log(`Attributes: ${p.attributes.map(a => a.name).join(', ')}`);
      console.log('-----------------------------');
    });
  } catch (err) {
    console.error('Error fetching products:', err.response?.data || err.message);
  }
}

checkProducts();
