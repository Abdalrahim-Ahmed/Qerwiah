

export const BRAND_IMAGES = {
  toteSignature: '/src/assets/images/pasted-product-bag.png',
  crossbodyNile: '/src/assets/images/bag_crossbody_nile_1795087228106.jpg',
  walletHeritage: '/src/assets/images/wallet_heritage_bifold_1795087227936.jpg',
  clutchOasis: '/src/assets/images/bag_clutch_oasis_1795087228741.jpg',
  artisanHands: '/src/assets/images/about_artisan_hands_1795087228142.jpg',
  materialsDuo: '/src/assets/images/materials_fiber_leather_1795087227674.jpg',
  videoPoster: '/src/assets/images/video_heritage_poster_1795087228235.jpg',
  bananaFibers: '/src/assets/images/materials_banana_fibers_1795087243927.jpg',
  genuineLeather: '/src/assets/images/materials_genuine_leather_1795087243756.jpg',
};

// Replaceable local video asset path: drop an MP4/WebM file at public/assets/videos/alqerwiah-heritage.mp4
// or update the source directly from the Admin Dashboard.
export const DEFAULT_BRAND_VIDEO_SRC = '/assets/videos/alqerwiah-heritage.mp4';

export const INITIAL_BRAND_SETTINGS = {
  whatsappNumber: '+201013644721',
  contactEmail: 'qerwiah.brand@gmail.com',
  instagramUrl: 'https://www.instagram.com/qerwiah.26977717?obrf=MXhhZDNrZzg3ZWFpNQ==',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61575589427524&rdid=1fgY7xFiLefuNw3O&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18aCTPZjzr%2F#',
  atelierLocation: {
    ar: 'الفيوم والقاهرة، مصر',
    en: 'Fayoum & Cairo, Egypt',
  },
  videoSrc: DEFAULT_BRAND_VIDEO_SRC,
  videoPoster: BRAND_IMAGES.videoPoster,
};

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-deira-tote',
    slug: 'deira-heritage-tote',
    category: 'bags',
    featured: true,
    image: BRAND_IMAGES.toteSignature,
    craftHours: 28,
    dimensions: '36 × 28 × 14 cm',
    name: {
      ar: 'حقيبة الديرة التراثية',
      en: 'Al-Deira Heritage Tote',
    },
    shortDescription: {
      ar: 'نسيج متقن من ألياف الموز الطبيعية مع مقابض وقاعدة من الجلد الطبيعي العنّابي.',
      en: 'Handwoven natural banana-fiber body framed with deep burgundy full-grain leather handles.',
    },
    story: {
      ar: 'تستلهم حقيبة الديرة خطوطها من سلال الحصاد المصرية القديمة في قرى الدلتا والفيوم، معاد صياغتها بهيكل معاصر متين يحفظ أناقتها اليومية.',
      en: 'Inspired by historic harvest baskets from Egypt’s Delta and Fayoum villages, Al-Deira reshapes rural weaving into an architectural everyday tote.',
    },
    materials: {
      ar: 'ألياف موز مصرية مجففة يدوياً · جلد بقري مدبوغ نباتياً · نحاس مصقول',
      en: 'Sun-cured Egyptian banana fibers · Vegetable-tanned leather · Brushed brass',
    },
    edition: {
      ar: 'إصدار الحرف اليدوية',
      en: 'Artisan Heritage Edition',
    },
  },
  {
    id: 'prod-nile-crossbody',
    slug: 'nile-saddle-crossbody',
    category: 'bags',
    featured: true,
    image: BRAND_IMAGES.crossbodyNile,
    craftHours: 22,
    dimensions: '24 × 19 × 8 cm',
    name: {
      ar: 'حقيبة كتف ضفاف النيل',
      en: 'Nile Bank Crossbody',
    },
    shortDescription: {
      ar: 'تصميم سرجي ناعم يمزج دفء الغطاء الجلدي العنّابي مع ملمس ألياف الموز المنسوجة.',
      en: 'Soft saddle silhouette pairing a supple burgundy leather flap with woven banana-fiber textile.',
    },
    story: {
      ar: 'صُممت لترافق المسافرات اليوميات بخفة وأصالة، حيث تُخاط الغرز اليدوية بخيوط الكتان المشمع حول قفل نحاسي مستوحى من الأختام الريفية.',
      en: 'Crafted for effortless daily movement, stitched with waxed linen thread around a minimal brass clasp echoing rural heirloom seals.',
    },
    materials: {
      ar: 'ألياف موز مضفرة بدقة · جلد طبيعي عنّابي · إكسسوارات نحاس معتق',
      en: 'Loomed banana-fiber weave · Deep burgundy full-grain leather · Antique brass clasp',
    },
    edition: {
      ar: 'مجموعة الرواية',
      en: 'Al-Rewaya Collection',
    },
  },
  {
    id: 'prod-fayoum-wallet',
    slug: 'fayoum-bifold-wallet',
    category: 'wallets',
    featured: true,
    image: BRAND_IMAGES.walletHeritage,
    craftHours: 14,
    dimensions: '11.5 × 9.5 × 1.8 cm',
    name: {
      ar: 'محفظة الفيوم المنسوجة',
      en: 'Fayoum Woven Bifold Wallet',
    },
    shortDescription: {
      ar: 'محفظة وحاملة بطاقات فاخرة بتطعيم دقيق من ألياف الموز داخل إطار جلد طبيعي.',
      en: 'Refined leather bifold and slim cardholder inlaid with golden woven banana-fiber panels.',
    },
    story: {
      ar: 'تجمع محفظة الفيوم بين دقة التطعيم الخشبي والنسجي في الريف المصري وبين براعة تشطيب الحواف الجلدية الراقية.',
      en: 'Uniting delicate rural marquetry traditions with precision-burnished leather edges, designed to age with a rich warm patina.',
    },
    materials: {
      ar: 'جلد طبيعي كامل الحبيبات · حشوة ألياف موز منسوجة · خياطة سروجية يدوية',
      en: 'Full-grain burgundy leather · Hand-loomed banana-fiber inlay · Hand saddle stitching',
    },
    edition: {
      ar: 'القطع الدقيقة',
      en: 'Small Leather & Fiber Goods',
    },
  },
  {
    id: 'prod-oasis-clutch',
    slug: 'oasis-braided-clutch',
    category: 'clutches',
    featured: true,
    image: BRAND_IMAGES.clutchOasis,
    craftHours: 19,
    dimensions: '26 × 16 × 6 cm',
    name: {
      ar: 'كلتش الواحة المضفّر',
      en: 'Oasis Braided Clutch',
    },
    shortDescription: {
      ar: 'حقيبة سهرة مضفّرة بجدائل ألياف الموز الذهبية وحواف جلدية بلون الزيتون والعنّابي.',
      en: 'Braided golden banana-fiber evening silhouette accented with olive and burgundy leather trim.',
    },
    story: {
      ar: 'تستعرض تقنية الضفيرة الثلاثية المتوارثة، حيث تلتقي درجة الزيتون المستوحاة من بساتين الواحات بعمق العنّابي الكلاسيكي.',
      en: 'Showcasing an heirloom three-strand braid technique, pairing oasis-olive leather piping with signature burgundy lining.',
    },
    materials: {
      ar: 'جدائل ألياف الموز الذهبية · جلد زيتوني وعنّابي · قفل نحاسي مصبوب',
      en: 'Braided golden banana cords · Olive & burgundy leather trim · Solid brass turn-lock',
    },
    edition: {
      ar: 'أمسيات القروية',
      en: 'Evening Heritage Series',
    },
  },
  {
    id: 'prod-senoures-satchel',
    slug: 'senoures-courtyard-satchel',
    category: 'bags',
    featured: false,
    image: BRAND_IMAGES.videoPoster,
    craftHours: 32,
    dimensions: '29 × 22 × 11 cm',
    name: {
      ar: 'حقيبة سنورس الكلاسيكية',
      en: 'Senoures Courtyard Satchel',
    },
    shortDescription: {
      ar: 'هيكل كلاسيكي متماسك بمقبض علوي مزدوج وخياطة جلدية متشابكة تحيط بلوح النسيج.',
      en: 'Structured top-handle satchel with whipped leather lacing framing a handwoven fiber center.',
    },
    story: {
      ar: 'قطعة تحفظ روح البيوت الريفية الدافئة؛ تُجمع يدوياً على مدار أربعة أيام في ورشتنا بالفيوم.',
      en: 'An heirloom satchel assembled over four days in our Fayoum atelier, celebrating warm mudbrick tones and quiet architectural balance.',
    },
    materials: {
      ar: 'لوح ألياف موز مجدول · جلد عنّابي سميك · بطانة كتان مصري خالص',
      en: 'Woven banana-fiber panel · Heavyweight burgundy hide · Pure Egyptian linen lining',
    },
    edition: {
      ar: 'إصدار التراث الخالد',
      en: 'Timeless Archive Piece',
    },
  },
  {
    id: 'prod-karmah-cardholder',
    slug: 'karmah-slim-cardholder',
    category: 'wallets',
    featured: false,
    image: BRAND_IMAGES.materialsDuo,
    craftHours: 10,
    dimensions: '10.5 × 7.5 × 0.8 cm',
    name: {
      ar: 'حافظة بطاقات الكرمة',
      en: 'Al-Karmah Slim Cardholder',
    },
    shortDescription: {
      ar: 'تصميم خفيف للاستخدام اليومي يجمع بين نعومة الجلد المدبوغ وملمس الألياف الحريرية.',
      en: 'Ultra-slim pocket companion pairing silk-sheen banana fibers with burnished burgundy hide.',
    },
    story: {
      ar: 'تحية للحياكة الدقيقة التي كانت تزين الأدوات الشخصية في القرى المصرية، برؤية مبسطة تناسب إيقاع اليوم.',
      en: 'A tribute to fine pocket craft in Egyptian villages, distilled into clean minimalist lines for everyday carry.',
    },
    materials: {
      ar: 'ألياف موز خام معالجة طبيعياً · جلد عنّابي فاخر · خيط كتان طبيعي',
      en: 'Conditioned natural banana fibers · Supple burgundy leather · Natural linen thread',
    },
    edition: {
      ar: 'القطع الدقيقة',
      en: 'Small Leather & Fiber Goods',
    },
  },
];

export const INITIAL_ADMINS = [
  {
    id: 'admin-founder-1',
    name: 'نور الهدى المنصوري',
    email: 'admin@alqerwiah.eg',
    password: 'heritage2026',
    role: 'owner',
    active: true,
    createdAt: '2026-01-15T09:00:00.000Z',
  },
  {
    id: 'admin-curator-2',
    name: 'كريم الصاوي / Karim El-Sawy',
    email: 'curator@alqerwiah.eg',
    password: 'craft2026',
    role: 'curator',
    active: true,
    createdAt: '2026-02-10T11:30:00.000Z',
  },
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'سلمى الشريف',
    phoneOrEmail: '+201022334455',
    subject: 'استفسار عن حقيبة الديرة التراثية',
    message: 'أرغب في معرفة تفاصيل المقاسات المتاحة وإمكانية إضافة أحرف محفورة على الجلد.',
    createdAt: '2026-11-12T14:20:00.000Z',
    status: 'new',
  },
  {
    id: 'inq-2',
    name: 'Layla Mansour',
    phoneOrEmail: 'layla@designhouse.com',
    subject: 'Editorial Exhibition Collaboration',
    message: 'We would love to feature Al-Deira and Oasis Clutch in our Cairo Craftsmanship showcase next month.',
    createdAt: '2026-11-15T10:05:00.000Z',
    status: 'reviewed',
  },
];
