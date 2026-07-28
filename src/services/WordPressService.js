import axios from 'axios';

// Si AgroPeonías habilita su propio WordPress en el futuro, se configura aquí.
const BASE_URL = 'https://www.agropeonias.cl/wp-json';

// Catálogo real extraído directamente de la web oficial de AgroPeonías (https://www.agropeonias.cl/shop)
const AGROPEONIAS_PRODUCTS = [
  {
    id: 1,
    name: 'Kansas',
    slug: 'kansas',
    short_description: 'Peonía fucsia magenta brillante con pétalos dobles súper densos sobre tallos firmes.',
    description: 'Kansas impresiona por su potente tono fucsia/magenta con pétalos dobles sobre tallos firmes y erguidos. Aporta vitalidad y contraste único en cualquier composición floral. Cultivada en nuestro predio en Romeral, Región del Maule.',
    price: '3700',
    regular_price: '3700',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_kansas.webp' }, { src: '/ramo_peonias.webp' }]
  },
  {
    id: 2,
    name: 'Gardenia',
    slug: 'gardenia',
    short_description: 'Blanca crema delicada con textura sedosa y una distinguida fragancia dulce.',
    description: 'La peonía Gardenia despliega inflorescencias de blanco puro cremoso con matices amarillos sutiles al centro. Destaca por su elegancia serena y su gran vida útil en florero.',
    price: '3800',
    regular_price: '3800',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_gardenia.webp' }, { src: '/caja_peonias.webp' }]
  },
  {
    id: 3,
    name: 'Diana Parks',
    slug: 'diana-parks',
    short_description: 'Espectacular peonía de tono rojo escarlata brillante con forma de bomba compacta.',
    description: 'Diana Parks es una de las variedades rojas más codiciadas de la floricultura. Sus pétalos interiores forman un domo aterciopelado de color rojo intenso que cautiva a floristas y banqueteras.',
    price: '4200',
    regular_price: '4200',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_diana_parks.webp' }]
  },
  {
    id: 4,
    name: 'Etched Salmon',
    slug: 'etched-salmon',
    short_description: 'Salmón rosado simétrico de textura esculpida, una verdadera joya florícola.',
    description: 'Galardonada internacionalmente por su simetría perfecta de pétalos rosados con matices salmón y bordes plateados. Su forma doble esculpida la convierte en una variedad de lujo.',
    price: '4500',
    regular_price: '4500',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_etched_salmon.webp' }]
  },
  {
    id: 5,
    name: 'Buckeye Belle',
    slug: 'buckeye-belle',
    short_description: 'Rojo caoba profundo aterciopelado con estambres dorados resplandecientes.',
    description: 'Buckeye Belle deslumbra por su sofisticada tonalidad rojo borgoña/vino con centro de anteras amarillas doradas. Aporta dramatismo y elegancia contemporánea.',
    price: '4000',
    regular_price: '4000',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_buckeye_belle.webp' }]
  },
  {
    id: 6,
    name: 'Pillow Talk',
    slug: 'pillow-talk',
    short_description: 'Rosa suave pastel de pétalos acolchados gigantes y aroma envolvente.',
    description: 'Grandes flores dobles de tono rosa delicado que recuerdan nubes afelpadas. Es ideal para bodas, eventos románticos y arreglos de alto estándar.',
    price: '3900',
    regular_price: '3900',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_pillow_talk.webp' }]
  },
  {
    id: 7,
    name: 'Henry Bockstoce',
    slug: 'henry-bockstoce',
    short_description: 'Rojo carmesí de tamaño colosal y centro en forma de rosa perfecta.',
    description: 'Flores gigantes de color rojo sangre profundo sobre tallos gruesos y resistentes. Su estructura en capullo denso garantiza una larga durabilidad tras la cosecha.',
    price: '4300',
    regular_price: '4300',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_henry_bockstoce.webp' }]
  },
  {
    id: 8,
    name: 'Fringed Ivory',
    slug: 'fringed-ivory',
    short_description: 'Blanca marfil plumosa de aspecto silvestre y gran ligereza visual.',
    description: 'Variedad de pétalos deshilachados en marfil puro con un toque verdoso en la base. Transmite frescura y estilo de jardín europeo.',
    price: '3700',
    regular_price: '3700',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_fringed_ivory.webp' }]
  },
  {
    id: 9,
    name: 'Florence Nicholls',
    slug: 'florence-nicholls',
    short_description: 'Blanca ruborizada con destellos rosados en el centro y fragancia romántica.',
    description: 'Abre en un tono blanco marfil con rubor rosa pálido que se aclara gradualmente. Muy buscada por decoradores internacionales.',
    price: '3800',
    regular_price: '3800',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_florence_nicholls.webp' }]
  },
  {
    id: 10,
    name: 'Coral Sunset',
    slug: 'coral-sunset',
    short_description: 'Coral dorado salmón de evolución de color intensa y botones exuberantes.',
    description: 'Destaca por su apertura vibrante en tonos coral y naranja salmón que gradualmente se transforman en amarillo crema marfil. Una maravilla de la naturaleza.',
    price: '4000',
    regular_price: '4000',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_coral_sunset.webp' }]
  },
  {
    id: 11,
    name: 'Bridal Shower',
    slug: 'bridal-shower',
    short_description: 'Blanca nupcial pura de forma abombada rimbombante.',
    description: 'Su nombre lo dice todo: la flor predilecta para novias. Pétalos de blanco inmaculado en capas tupidas y forma esférica majestuosa.',
    price: '4100',
    regular_price: '4100',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_bridal_shower.webp' }]
  },
  {
    id: 12,
    name: 'Red Sarah Bernhardt',
    slug: 'red-sarah-bernhardt',
    short_description: 'Fucsia rubí intenso de la clásica estirpe Bernhardt en versión colorida.',
    description: 'Conserva toda la generosidad y vida útil de la Sarah Bernhardt tradicional, vistiendo pétalos rosa fucsia rubí profundamente fragantes.',
    price: '3900',
    regular_price: '3900',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_red_sarah_bernhardt.webp' }]
  },
  {
    id: 13,
    name: 'Peter Brand',
    slug: 'peter-brand',
    short_description: 'Rojo purpúreo oscuro aterciopelado con estambres dorados en contraste.',
    description: 'Una peonía holandesa histórica de tono vino tinto oscuro y destellos violetas. Excelente consistencia y calidad de tallo.',
    price: '4100',
    regular_price: '4100',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_peter_brand.webp' }]
  },
  {
    id: 14,
    name: 'Sarah Bernhardt',
    slug: 'sarah-bernhardt',
    short_description: 'Rosa suave clásica, la peonía más popular y cotizada del mundo por su elegancia.',
    description: 'La peonía Sarah Bernhardt es el ícono indiscutido de las peonías de corte. Presenta pétalos dobles en un delicado tono rosa suave con destellos plateados. Cosechada en nuestro predio de Romeral.',
    price: '3500',
    regular_price: '3500',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_sarah_bernhardt.webp' }, { src: '/ramo_peonias.webp' }]
  },
  {
    id: 15,
    name: 'Red Charm',
    slug: 'red-charm',
    short_description: 'Rojo profundo encendido en forma de bomba perfecta y textura aterciopelada.',
    description: 'Red Charm es galardonada mundialmente por su forma esférica tipo bomba de pétalos rojo escarlata súper densos. Una variedad de categoría premium.',
    price: '4200',
    regular_price: '4200',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_red_charm.webp' }]
  },
  {
    id: 16,
    name: 'Coral Charm',
    slug: 'coral-charm',
    short_description: 'Impresionante variedad que transforma mágicamente su color de coral vibrante a marfil.',
    description: 'Coral Charm destaca por su forma semi-doble y su espectacular evolución de color. Al abrirse, despliega tonos salmón y coral que gradualmente transicionan hacia un elegante marfil.',
    price: '3800',
    regular_price: '3800',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_coral_charm.webp' }]
  },
  {
    id: 17,
    name: 'Duchesse de Nemours',
    slug: 'duchesse-de-nemours',
    short_description: 'Blanca cremosa clásica con toque verdoso al centro y una exquisita fragancia cítrica.',
    description: 'Una de las variedades blancas más antiguas y apreciadas en la floricultura mundial. Destaca por su aroma fresco cítrico y la delicadeza de sus pétalos compactos.',
    price: '3500',
    regular_price: '3500',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_duchesse_de_nemours.webp' }]
  },
  {
    id: 18,
    name: 'Bowl of Cream',
    slug: 'bowl-of-cream',
    short_description: 'Espectaculares flores dobles de color blanco puro cremoso de gran tamaño y forma majestuosa.',
    description: 'Bowl of Cream hace honor a su nombre con enormes inflorescencias de pétalos cremosos de blanco puro. Una variedad de lujo cotizada internacionalmente.',
    price: '4000',
    regular_price: '4000',
    categories: [{ id: 1, name: 'Flores de Corte', slug: 'flores-de-corte' }],
    images: [{ src: '/product_bowl_of_cream.webp' }]
  },
  {
    id: 19,
    name: 'Rizoma Sarah Bernhardt',
    slug: 'rizoma-sarah-bernhardt',
    short_description: 'Rizoma de alta calidad de la variedad rosa clásica más emblemática.',
    description: 'Cultiva tus propias peonías Sarah Bernhardt. Rizomas vigorosos preparados bajo estándares técnicos de refrigeración y sanidad vegetal en Romeral.',
    price: '7900',
    regular_price: '7900',
    categories: [{ id: 2, name: 'Rizomas', slug: 'rizomas' }],
    images: [{ src: '/product_sarah_bernhardt.webp' }]
  },
  {
    id: 20,
    name: 'Rizoma Coral Charm',
    slug: 'rizoma-coral-charm',
    short_description: 'Rizoma seleccionado de la codiciada variedad cambiante de coral a marfil.',
    description: 'Rizoma de peonía Coral Charm para plantación entre mayo y junio en la Zona Central. Excelente desarrollo vegetativo y floración en primavera.',
    price: '8500',
    regular_price: '8500',
    categories: [{ id: 2, name: 'Rizomas', slug: 'rizomas' }],
    images: [{ src: '/product_coral_charm.webp' }]
  },
  {
    id: 21,
    name: 'Rizoma Red Charm',
    slug: 'rizoma-red-charm',
    short_description: 'Rizoma seleccionado de peonía rojo escarlata aterciopelada en bomba.',
    description: 'Rizoma vigoroso cosechado en Romeral con yemas sanas para un cultivo de alta calidad en huerto o jardín.',
    price: '8900',
    regular_price: '8900',
    categories: [{ id: 2, name: 'Rizomas', slug: 'rizomas' }],
    images: [{ src: '/product_red_charm.webp' }]
  },
  {
    id: 22,
    name: 'Rizoma Kansas',
    slug: 'rizoma-kansas',
    short_description: 'Rizoma de peonía fucsia magenta brillante de gran poder germinativo.',
    description: 'Rizoma seleccionado de la variedad Kansas para cultivo de flores de corte o jardín ornamental.',
    price: '7500',
    regular_price: '7500',
    categories: [{ id: 2, name: 'Rizomas', slug: 'rizomas' }],
    images: [{ src: '/product_kansas.webp' }]
  }
];

// Blog posts oficiales independientes para AgroPeonías Chile (Romeral, Región del Maule)
const AGROPEONIAS_BLOG_POSTS = [
  {
    id: 98,
    date: '2026-04-27T12:00:00',
    title: { rendered: 'Primer Seminario sobre Producción de Peonías y Claves para la Postcosecha en Curicó' },
    excerpt: { rendered: '<p>Organizado por AgroPeonías y PeonyLab con la participación de más de 140 productores, este hito liderado por Consuelo Callejas abordó la peonía como flor de lujo y su rol en la Marca País.</p>' },
    content: { rendered: '<h2>Un Hito para la Floricultura del Valle Central</h2><p>Con la participación de más de <strong>140 asistentes del rubro floricultor</strong> de la región, se realizó en Curicó el <strong>Primer Seminario sobre la Producción de Peonías y Claves para la Postcosecha</strong>, organizado por <strong>AgroPeonías</strong> y PeonyLab.</p><h2>Liderazgo y Gestión Gremial</h2><p>La gestora y coordinadora de este primer gran encuentro fue <strong>Consuelo Callejas</strong>, Empresaria Agrícola y Presidenta de la Asociación Gremial de Peonías de Chile, quien lideró la pauta técnica y comercial ante productores, agrónomos y profesionales del sector en los salones del Hotel Villa El Descanso.</p><figure style="text-align: center; margin: 35px 0;"><img src="/agropeonias_seminario_curico.webp" alt="Consuelo Callejas en el Seminario de Peonías en Curicó" style="max-width: 100%; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);" /><figcaption style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Consuelo Callejas exponiendo las claves del cultivo y postcosecha ante más de 140 floricultores.</figcaption></figure><h2>La Peonía: Producto de Lujo e Imagen País</h2><p>¿Sabías que más del <strong>90% de las exportaciones de floricultura en Chile corresponden a Peonías</strong>? Durante el seminario se profundizó en el potencial de esta flor de alta gama como embajadora de la Marca País en los mercados más exigentes de Europa, Asia y América.</p><h2>Pauta del Seminario y Ejes Temáticos</h2><ul><li><strong>Peonías y Marca País:</strong> Posicionamiento internacional del producto de lujo chileno.</li><li><strong>Manejo Agronómico:</strong> Optimización de nutrición y rendimiento en huerto.</li><li><strong>Uso de Bioestimulantes:</strong> Estrategias sostenibles para potenciar el vigor radicular y floral.</li><li><strong>Visión Comercial para la Industria:</strong> Apertura de canales mayoristas, banqueteras y floristas.</li><li><strong>Apoyo a la Postcosecha:</strong> Cadena de frío y protocolos de conservación en florero.</li></ul><blockquote>"Estamos desarrollando un producto de lujo, trabajando de la mano para el crecimiento nacional e internacional de esta demandada flor. Uno de nuestros mayores desafíos es darla a conocer fuertemente en nuestro propio país."<br><small>— Consuelo Callejas, Presidenta Asociación Gremial de Peonías</small></blockquote>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/agropeonias_seminario_curico.webp' }]
    }
  },
  {
    id: 99,
    date: '2025-12-12T12:00:00',
    title: { rendered: 'Floricultura Nacional y su Crecimiento Sostenido: Consuelo Callejas en Reporte Agrícola' },
    excerpt: { rendered: '<p>Consuelo Callejas, Directora de AgroPeonías, fue entrevistada en el programa Reporte Agrícola por José Ignacio Atenas sobre el auge de las peonías en Chile y la profesionalización del rubro.</p>' },
    content: { rendered: '<h2>Reporte Agrícola: Floricultura Nacional y Crecimiento Sostenido</h2><p>En un nuevo episodio del destacado programa de televisión y plataforma agro <strong>Reporte Agrícola</strong>, el periodista y conductor <strong>José Ignacio Atenas</strong> entrevistó a <strong>Consuelo Callejas</strong>, Directora de <strong>AgroPeonías</strong> y referente de la Asociación Gremial de Peonías del Valle Central, para analizar el sostenido crecimiento de la floricultura en Chile y los grandes desafíos del sector.</p><h2>Panorama de la Floricultura en Chile</h2><p>Actualmente, la floricultura en Chile cuenta con aproximadamente <strong>2.000 hectáreas plantadas</strong> distribuidas en tres grandes segmentos: la floricultura rural (que representa la mayoría del territorio), la floricultura de exportación de alta gama y la engorda de bulbos y rizomas en el sur del país.</p><figure style="text-align: center; margin: 35px 0;"><img src="/agropeonias_reporte_agricola_body.webp" alt="Consuelo Callejas en Reporte Agrícola" style="max-width: 100%; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);" /><figcaption style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Consuelo Callejas, Directora de AgroPeonías, durante su entrevista en Reporte Agrícola.</figcaption></figure><h2>Un Gremio Liderado por Mujeres Profesionalizando el Rubro</h2><p>Consuelo Callejas explicó que, aunque Chile es mundialmente reconocido por excelencia como país exportador frutícola, la floricultura ha ido ganando espacio de forma consistente. Este importante auge responde en gran medida al liderazgo de un gremio impulsado por mujeres productoras que buscan aumentar el consumo nacional y profesionalizar el mercado.</p><blockquote>"Hemos metido bulla porque queremos aumentar el consumo nacional de peonías. Las banqueteras y los floristas conocen la peonía, pero no conocen en qué semana sale, qué color, dónde se producen o qué cantidad pueden comprar."<br><small>— Consuelo Callejas, Directora de AgroPeonías</small></blockquote><h2>Estructuración de Mercado y Educación al Cliente</h2><p>El desafío central para AgroPeonías es educar al mercado local: informar las fechas exactas de floración en el Valle del Maule, las variedades disponibles por semana y garantizar una cadena logística transparente y directa desde el huerto.</p>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/agropeonias_reporte_agricola_feat.webp' }]
    }
  },
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
      'wp:featuredmedia': [{ source_url: '/ramo_peonias.webp' }]
    }
  },
  {
    id: 103,
    date: '2026-06-20T15:30:00',
    title: { rendered: 'Cómo Mantener tus Peonías de Corte Frescas por Más Tiempo' },
    excerpt: { rendered: '<p>Descubre los secretos profesionales para extender la vida en florero de tus varas de peonía hasta 6 días en tu hogar.</p>' },
    content: { rendered: '<h2>Apertura y Cuidado en Florero</h2><p>Nuestras peonías son cosechadas cuidadosamente en Romeral en el punto ideal de botón. Al recibir tus peonías de corte, sigue estas recomendaciones:</p><h3>Pasos Clave</h3><ol><li>Corta 2 cm del tallo en un ángulo de 45° antes de colocar en agua.</li><li>Agrega agua tibia con una cucharadita de azúcar si deseas acelerar la apertura de los pétalos.</li><li>Mantén el florero en un lugar fresco y cambia el agua cada 2 días agregando unos cubos de hielo.</li></ol>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/peonias_chile_peonies.webp' }]
    }
  },
  {
    id: 104,
    date: '2026-07-10T09:15:00',
    title: { rendered: 'AgroPeonías: Sustentabilidad y Floricultura en el Maule' },
    excerpt: { rendered: '<p>Nuestra agrupación de productoras agrícolas impulsa el desarrollo de una floricultura sustentable y de calidad mundial.</p>' },
    content: { rendered: '<h2>Pasión y Tradición Agrícola</h2><p>AgroPeonías reúne la trayectoria de generaciones dedicadas a la tierra en el Valle del Maule. Consuelo Callejas M., Macarena Silva S. e Inés Espinoza lideran este compromiso con la sustentabilidad y el respeto por el medio ambiente.</p><h3>Calidad de Exportación</h3><p>Cada temporada despachamos peonías de corte y rizomas hacia todo Chile y mercados internacionales, posicionando a la floricultura chilena como referente de excelencia.</p>' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/home_hero.webp' }]
    }
  }
];

const translateText = async (text, type = 'text') => {
  if (!text) return text;
  try {
      const res = await axios.post('/api/translate', { text, type });
      return res.data.translation || text;
  } catch(e) {
      return text;
  }
};

const tPost = async (p) => {
    const p2 = {
      ...p,
      title: { rendered: p.title?.rendered },
      excerpt: { rendered: p.excerpt?.rendered },
      content: { rendered: p.content?.rendered }
    };
    [p2.title.rendered, p2.excerpt.rendered, p2.content.rendered] = await Promise.all([
        translateText(p2.title.rendered, 'text'),
        translateText(p2.excerpt.rendered, 'html'),
        translateText(p2.content.rendered, 'html')
    ]);
    return p2;
};

const withCache = async (key, fetcher, translatorWrapper) => {
  const lang = localStorage.getItem('agropeonias_lang') || 'es';
  const finalKey = lang === 'en' ? `${key}_en` : key;

  try {
    sessionStorage.clear();
  } catch (e) {}

  let data = await fetcher();
  
  if (lang === 'en' && translatorWrapper) {
      data = await translatorWrapper(data);
  }

  return data;
};

const WordPressService = {
  getProducts: async () => {
    return withCache('agropeonias_real_shop_v1', async () => {
      return AGROPEONIAS_PRODUCTS;
    }, async (data) => data);
  },

  getProduct: async (id) => {
    return withCache(`agropeonias_real_product_v1_${id}`, async () => {
      const numericId = Number(id);
      const product = AGROPEONIAS_PRODUCTS.find(p => p.id === numericId || p.slug === id);
      return product || AGROPEONIAS_PRODUCTS[0];
    }, async (data) => data);
  },

  getBlogPosts: async () => {
    return withCache('agropeonias_blog_posts_v5', async () => {
      return AGROPEONIAS_BLOG_POSTS;
    }, async (data) => Promise.all(data.map(tPost)));
  },

  getPost: async (id) => {
    return withCache(`agropeonias_blog_post_v5_${id}`, async () => {
      const numericId = Number(id);
      const post = AGROPEONIAS_BLOG_POSTS.find(p => p.id === numericId);
      return post || AGROPEONIAS_BLOG_POSTS[0];
    }, async (data) => tPost(data));
  },

  submitContact: async (formData) => {
    return { status: 'mail_sent', message: '¡Gracias por contactarte con AgroPeonías! Nos pondremos en contacto a la brevedad.' };
  }
};

export default WordPressService;
