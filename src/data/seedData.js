

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

const PRODUCT_DETAIL_GALLERIES = [
  [
    new URL('../assets/images/products/product-1/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-1/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-2/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-2/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-3/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-3/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-4/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-4/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-5/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-5/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-6/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-6/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-7/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-7/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-8/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-8/image-2.jpg', import.meta.url).href,
  ],
  [
    new URL('../assets/images/products/product-9/image-1.jpg', import.meta.url).href,
    new URL('../assets/images/products/product-9/image-2.jpg', import.meta.url).href,
  ],
];

const DEIRA_TOTE_IMAGE = new URL(
  '../assets/images/bag_tote_signature_1795087225085.jpg',
  import.meta.url,
).href;

const PRODUCT_CURRENCY = { ar: 'جنيه', en: 'EGP' };

// Replaceable local video asset path: drop an MP4/WebM file at public/assets/videos/alqerwiah-heritage.mp4
// or update the source directly from the Admin Dashboard.
export const DEFAULT_BRAND_VIDEO_SRC = '/assets/videos/alqerwiah-heritage.mp4';

export const INITIAL_BRAND_SETTINGS = {
  whatsappNumber: '+201013644721',
  contactEmail: 'qerwiah.brand@gmail.com',
  instagramUrl: 'https://www.instagram.com/qerwiah.26977717?obrf=MXhhZDNrZzg3ZWFpNQ==',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61575589427524&rdid=1fgY7xFiLefuNw3O&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18aCTPZjzr%2F#',
  atelierLocation: {
    ar: 'دندرة، قنا، مصر',
    en: 'Dendera, Qena, Egypt',
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
    image: PRODUCT_DETAIL_GALLERIES[0][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[0],
    craftHours: 28,
    price: 1500,
    currency: PRODUCT_CURRENCY,
    dimensions: '36 × 28 × 14 cm',
    name: {
      ar: 'نفحة من القداسة وروح التراث',
      en: 'Al-Deira Heritage Tote',
    },
    shortDescription: {
      ar: 'نسيج متقن من ألياف الموز الطبيعية مع مقابض وقاعدة من الجلد الطبيعي العنّابي.',
      en: 'Handwoven natural banana-fiber body framed with deep burgundy full-grain leather handles.',
    },
    story: {
      ar: 'في قلب هذا التصميم تتوسط النجمة عشرة عناصر تحيط بها، في قراءة رمزية مستوحاة من الفن الإسلامي، تستحضر النبي ﷺ والعشرة المبشرين بالجنة، في تكوين يحمل معاني الطهر والبركة والصحبة المباركة.\n\nاستلهمنا من هذه الرمزية جمالها الروحي وعمقها التاريخي، وأعدنا صياغتها في تصميم معاصر يجمع بين قدسية المعنى وأصالة التراث وأناقة الحاضر.\n\nفي الجروية، لكل قطعة روح، ولكل تفصيلة حكاية، ولكل حكاية أثر يبقى.',
      en: 'Inspired by historic harvest baskets from Egypt’s Delta and Fayoum villages, Al-Deira reshapes rural weaving into an architectural everyday tote.',
    },
    detailStory: {
      ar: 'في مواسم الحصاد، كانت الأيدي تجمع ما تركته الأرض وتعيد نسجه ليرافق يومًا جديدًا. من تلك الذاكرة تولد الديرة؛ قطعة تحمل هدوء الحقول وأناقة الطريق.',
      en: 'At harvest time, patient hands gathered what the land left behind and gave it a new life. Al-Deira carries that quiet memory of open fields into the rhythm of today.',
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
    image: PRODUCT_DETAIL_GALLERIES[1][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[1],
    craftHours: 22,
    price: 1300,
    currency: PRODUCT_CURRENCY,
    dimensions: '24 × 19 × 8 cm',
    name: {
      ar: 'روح الصحراء',
      en: 'Nile Bank Crossbody',
    },
    shortDescription: {
      ar: 'تصميم سرجي ناعم يمزج دفء الغطاء الجلدي العنّابي مع ملمس ألياف الموز المنسوجة.',
      en: 'Soft saddle silhouette pairing a supple burgundy leather flap with woven banana-fiber textile.',
    },
    story: {
      ar: 'استوحينا التصميم من الجعران المجنّح في الحضارة المصرية القديمة، أحد الرموز التي ارتبطت بالتجدد والبعث والحماية.\n\nجاء الجناحان في التصميم ليمنحاه إحساسًا بالانطلاق والحرية، بينما يستحضر شكل الجعران أسرار الحضارة المصرية وعظمتها.\n\nقطعة تحمل رمزًا من رموز مصر الخالدة، بروح تراثية ولمسة عصرية تجمع بين الأصالة والفخامة. ❤️',
      en: 'Crafted for effortless daily movement, stitched with waxed linen thread around a minimal brass clasp echoing rural heirloom seals.',
    },
    detailStory: {
      ar: 'تسير هذه القطعة على إيقاع النهر؛ هادئة في حضورها، قريبة من صاحبها، وتحمل في خطوطها ذكرى الرحلات الصغيرة بين ضفتي المدينة.',
      en: 'This piece follows the river’s unhurried rhythm: quiet in presence, close at hand, and filled with the feeling of small journeys between the city’s two banks.',
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
    image: PRODUCT_DETAIL_GALLERIES[2][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[2],
    craftHours: 14,
    price: 1300,
    currency: PRODUCT_CURRENCY,
    dimensions: '11.5 × 9.5 × 1.8 cm',
    name: {
      ar: 'أنوبيس',
      en: 'Fayoum Woven Bifold Wallet',
    },
    shortDescription: {
      ar: 'محفظة وحاملة بطاقات فاخرة بتطعيم دقيق من ألياف الموز داخل إطار جلد طبيعي.',
      en: 'Refined leather bifold and slim cardholder inlaid with golden woven banana-fiber panels.',
    },
    story: {
      ar: 'من قلب الحضارة المصرية القديمة، استوحينا التصميم من أنوبيس، حارس العالم الآخر ورمز الحماية في المعتقد المصري القديم.\n\nشخصية ارتبطت بالأسرار والهيبة، وحضرت بقوة في النقوش والمعابد المصرية، فحوّلنا ملامحها إلى تصميم يجمع بين سحر التاريخ وروح الحرفة اليدوية.\n\nقطعة تجمع فخامة الجلد الطبيعي مع تفاصيل النسيج المستوحاة من تراثنا.\n\nمش مجرد محفظة… دي حكاية من أسرار مصر القديمة، تحملها معاك أينما ذهبت.',
      en: 'Uniting delicate rural marquetry traditions with precision-burnished leather edges, designed to age with a rich warm patina.',
    },
    detailStory: {
      ar: 'من ضفاف الفيوم وبساتينها جاءت فكرة هذه المحفظة: تفاصيل صغيرة تحفظ أثر المكان، وترافق صاحبها في يومه كذكرى حميمة لا تحتاج إلى كلمات.',
      en: 'Inspired by Fayoum’s lakeside gardens, this small keepsake carries a trace of place into everyday life—a familiar memory held close without a word.',
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
    image: PRODUCT_DETAIL_GALLERIES[3][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[3],
    craftHours: 19,
    price: 1950,
    currency: PRODUCT_CURRENCY,
    dimensions: '26 × 16 × 6 cm',
    name: {
      ar: 'سفيفة',
      en: 'Oasis Braided Clutch',
    },
    shortDescription: {
      ar: 'حقيبة سهرة مضفّرة بجدائل ألياف الموز الذهبية وحواف جلدية بلون الزيتون والعنّابي.',
      en: 'Braided golden banana-fiber evening silhouette accented with olive and burgundy leather trim.',
    },
    story: {
      ar: 'من جمال الحرفة اليدوية وتداخل الخيوط، استوحينا تصميم هذه الحقيبة، حيث يلتقي النسيج الطبيعي بتفاصيل الجلد الأنيق في تناغم يجمع بين دفء الخامات وفخامة التصميم.\n\nيعكس الجزء المنسوج روح الصناعات اليدوية التي توارثتها الأجيال، بينما تضيف لمسات الجلد واللون العنابي حضورًا عصريًا مميزًا.\n\nقطعة تحتفي بجمال التفاصيل البسيطة، وتجمع بين أصالة الحرفة وأناقة الحاضر.\n\n**سفيفة… حين تتحول الخيوط إلى فن، والتفاصيل إلى حكاية.**',
      en: 'Showcasing an heirloom three-strand braid technique, pairing oasis-olive leather piping with signature burgundy lining.',
    },
    detailStory: {
      ar: 'تستعير هذه القطعة إشاراتها من حكايات مصر القديمة، حيث يصبح الرمز حارسًا للذاكرة. حضورها مساءي واثق، لكنه يحتفظ بدفء الأشياء المصنوعة بمحبة.',
      en: 'Drawing on the symbols of ancient Egypt, this piece treats an emblem as a keeper of memory. Its evening presence is assured, yet warmly personal.',
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
    image: PRODUCT_DETAIL_GALLERIES[4][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[4],
    craftHours: 32,
    price: 750,
    currency: PRODUCT_CURRENCY,
    dimensions: '29 × 22 × 11 cm',
    name: {
      ar: 'جعران',
      en: 'Senoures Courtyard Satchel',
    },
    shortDescription: {
      ar: 'هيكل كلاسيكي متماسك بمقبض علوي مزدوج وخياطة جلدية متشابكة تحيط بلوح النسيج.',
      en: 'Structured top-handle satchel with whipped leather lacing framing a handwoven fiber center.',
    },
    story: {
      ar: 'استوحينا التصميم من الجعران المجنّح في الحضارة المصرية القديمة، أحد الرموز التي ارتبطت بالتجدد والبعث والحماية.\n\nجاء الجناحان في التصميم ليمنحاه إحساسًا بالانطلاق والحرية، بينما يستحضر شكل الجعران أسرار الحضارة المصرية وعظمتها.\n\nقطعة تحمل رمزًا من رموز مصر الخالدة، بروح تراثية ولمسة عصرية تجمع بين الأصالة والفخامة. ❤️',
      en: 'An heirloom satchel assembled over four days in our Fayoum atelier, celebrating warm mudbrick tones and quiet architectural balance.',
    },
    detailStory: {
      ar: 'تبدأ حكاية سنورس من فناء بيت ريفي تتعاقب عليه شمس الصباح وظلال النخيل. تستعيد القطعة ذلك السكون، لتجعل من الطريق اليومي امتدادًا لدفء المكان.',
      en: 'Senoures begins in a village courtyard where morning light meets the shade of palms. It carries that stillness forward, making an everyday journey feel rooted in place.',
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
    image: PRODUCT_DETAIL_GALLERIES[5][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[5],
    craftHours: 10,
    price: 600,
    currency: PRODUCT_CURRENCY,
    dimensions: '10.5 × 7.5 × 0.8 cm',
    name: {
      ar: 'اللوتس',
      en: 'Al-Karmah Slim Cardholder',
    },
    shortDescription: {
      ar: 'تصميم خفيف للاستخدام اليومي يجمع بين نعومة الجلد المدبوغ وملمس الألياف الحريرية.',
      en: 'Ultra-slim pocket companion pairing silk-sheen banana fibers with burnished burgundy hide.',
    },
    story: {
      ar: 'استوحينا التصميم من زهرة اللوتس المصرية، اللي ارتبطت عند المصريين القدماء بالشروق والبعث وبداية الحياة من جديد؛ فكانت رمزًا للنقاء والتجدد والجمال.\nجسدنا بتلاتها المتفتحة في طبقات من الجلد الطبيعي بألوان متناغمة، تتوسطها لمسة من النسيج اليدوي، في مزج يجمع بين رمزية الحضارة المصرية وجمال الحرفة المعاصرة.\nزهرة من ذاكرة الحضارة… تتحول إلى قطعة فنية تحمل حكاية الجمال والتجدد عبر الزمن. ❤️',
      en: 'A tribute to fine pocket craft in Egyptian villages, distilled into clean minimalist lines for everyday carry.',
    },
    detailStory: {
      ar: 'استُلهمت الكرمة من زينة كانت تُحمل كعلامة شخصية، ومن رغبة في أن تبقى الأشياء اليومية قريبة من جذورها. حكايتها بسيطة: تفصيل صغير، وذكرى تدوم.',
      en: 'Al-Karmah recalls the personal keepsakes once carried as quiet emblems. Its story is simple: a small detail, a sense of belonging, and a memory made to last.',
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
  {
    id: 'prod-horus-clutch',
    slug: 'horus-evening-clutch',
    category: 'clutches',
    featured: false,
    image: PRODUCT_DETAIL_GALLERIES[6][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[6],
    craftHours: 18,
    price: 700,
    currency: PRODUCT_CURRENCY,
    dimensions: '',
    name: {
      ar: 'بنت الصعيد',
      en: 'Eye of Horus Clutch',
    },
    shortDescription: {
      ar: 'كلتش مسائي يستحضر رموز مصر القديمة في قطعة ذات حضور هادئ.',
      en: 'An evening clutch carrying an echo of ancient Egyptian symbols.',
    },
    story: {
      ar: 'حياء بنت الصعيد… حين تطل من خلف الباب.\n\nمن وراء الباب، تطل بعينين تملؤهما الحكايات، في خجلٍ رقيق وحياءٍ أصيل، كأنها تخشى أن يراها العالم قبل أن تراه.\n\nاستلهمنا التصميم من تلك اللحظة البسيطة التي تختصر جمال المرأة الصعيدية؛ عزةٌ ووقار، وخجلٌ له سحره الخاص.\n\nحكاية أنوثة مصرية نسجها التراث. 🤎',
      en: 'An evening piece inspired by the symbols of ancient Egypt.',
    },
    detailStory: {
      ar: 'في هذا التصميم، يتحول الرمز القديم إلى رفيق معاصر. حكاية عن عينٍ تحفظ الطريق، وعن قطعة تختار أن ترافق لحظات المساء بهدوء.',
      en: 'Here, an ancient emblem becomes a contemporary companion: a story of a watchful eye and a piece made for the quiet confidence of evening.',
    },
    materials: { ar: '', en: '' },
    edition: { ar: 'قطع القروية', en: 'Qerwiah Pieces' },
  },
  {
    id: 'prod-nile-banner-cardholder',
    slug: 'nile-banner-cardholder',
    category: 'wallets',
    featured: false,
    image: PRODUCT_DETAIL_GALLERIES[7][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[7],
    craftHours: 9,
    price: 700,
    currency: PRODUCT_CURRENCY,
    dimensions: '',
    name: {
      ar: 'ابن الأرض',
      en: 'Nile Banner Cardholder',
    },
    shortDescription: {
      ar: 'حافظة بطاقات تحمل ألوان النهر وتفاصيل مستوحاة من ذاكرة المكان.',
      en: 'A cardholder with river colors and details drawn from a sense of place.',
    },
    story: {
      ar: 'في قلب الصعيد، يعبر الرجل بين أشجار الموز، بخطوات تحمل هيبة الأرض وأصالة أهلها. مشهد يستلهم روح الجنوب، حيث الخضرة تحكي عن الخير، والرجل يحكي عن جذور وهوية لا تتغير.\nقطعة تحمل حكاية من قلب الصعيد… حيث لكل تفصيلة أصل، ولكل خيط حكاية.',
      en: 'A small everyday piece recalling the colors of the Nile and Egyptian stories.',
    },
    detailStory: {
      ar: 'تحكي ألوان هذه القطعة عن نهرٍ جمع ضفافه حكايات كثيرة. صُممت لتكون تذكارًا شخصيًا من مصر، يرافق صاحبه في تنقلاته اليومية.',
      en: 'Its colors recall a river that has gathered countless stories along its banks. This small keepsake carries a personal trace of Egypt into everyday journeys.',
    },
    materials: { ar: '', en: '' },
    edition: { ar: 'قطع القروية', en: 'Qerwiah Pieces' },
  },
  {
    id: 'prod-fayoum-palm-wallet',
    slug: 'fayoum-palm-wallet',
    category: 'wallets',
    featured: false,
    image: PRODUCT_DETAIL_GALLERIES[8][0],
    detailImages: PRODUCT_DETAIL_GALLERIES[8],
    craftHours: 13,
    price: 400,
    currency: PRODUCT_CURRENCY,
    dimensions: '',
    name: {
      ar: 'عين حورس',
      en: 'Fayoum Palm Wallet',
    },
    shortDescription: {
      ar: 'محفظة صغيرة تحتفي بظلال النخيل وواحات الفيوم.',
      en: 'A small wallet celebrating the palms and oases of Fayoum.',
    },
    story: {
      ar: 'ستوحينا التصميم من عين حورس (عين الوجات)، أحد أشهر الرموز في الحضارة المصرية القديمة، واللي ارتبط بالحماية والقوة والشفاء واستعادة التوازن.\n\nكان المصري القديم بيشوف فيها رمزًا للحفظ من الشر وتجدد الحياة، فخلّدها على جدران المعابد والتمائم، لتصبح واحدة من العلامات الخالدة في تراثنا.\n\nأعدنا تقديم الرمز بلمسة من الجلد الطبيعي والنسيج اليدوي، لنمزج بين سحر الحضارة المصرية وأناقة التصميم المعاصر.\n\nعين من قلب التاريخ… تحمل حكاية الحماية والقوة، وتعيش من جديد في قطعة فنية. ❤️',
      en: 'Palm motifs recall a familiar scene from Fayoum’s oases.',
    },
    detailStory: {
      ar: 'تحت ظلال النخيل، تهدأ الحكايات ولا تنتهي. تستلهم هذه المحفظة مشهد الواحة لتحتفظ بلمحة من فيومٍ خضراء، قريبة مهما ابتعد الطريق.',
      en: 'Stories slow beneath the palms, but never end. Inspired by an oasis in Fayoum, this wallet keeps a glimpse of green close, wherever the road leads.',
    },
    materials: { ar: '', en: '' },
    edition: { ar: 'قطع القروية', en: 'Qerwiah Pieces' },
  },
];

export const INITIAL_ADMINS = [
  {
    id: 'admin-founder-1',
    name: 'نور الهدى المنصوري',
    email: 'hager.tayea1810@gmail.com',
    passwordHash: null,
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
