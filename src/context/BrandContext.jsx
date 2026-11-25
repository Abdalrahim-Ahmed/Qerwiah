import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BRAND_IMAGES,
  INITIAL_ADMINS,
  INITIAL_BRAND_SETTINGS,
  INITIAL_INQUIRIES,
  INITIAL_PRODUCTS,
} from '../data/seedData';
import { COPY } from '../data/translations';


const STORAGE_KEYS = {
  lang: 'alqerwiah_lang',
  products: 'alqerwiah_products',
  settings: 'alqerwiah_settings',
  admins: 'alqerwiah_admins',
  session: 'alqerwiah_admin_session',
  inquiries: 'alqerwiah_inquiries',
  customRequests: 'alqerwiah_custom_requests',
  customers: 'alqerwiah_customers',
  customerSession: 'alqerwiah_customer_session',
  favorites: 'alqerwiah_favorites',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function loadProducts() {
  const storedProducts = readStorage(STORAGE_KEYS.products, null);
  if (!Array.isArray(storedProducts)) return INITIAL_PRODUCTS;

  const legacyProductImages = new Map([
    ['prod-deira-tote', BRAND_IMAGES.toteSignature],
    ['prod-nile-crossbody', BRAND_IMAGES.crossbodyNile],
    ['prod-fayoum-wallet', BRAND_IMAGES.walletHeritage],
    ['prod-oasis-clutch', BRAND_IMAGES.clutchOasis],
    ['prod-senoures-satchel', BRAND_IMAGES.videoPoster],
    ['prod-karmah-cardholder', BRAND_IMAGES.materialsDuo],
  ]);
  const initialProductsById = new Map(INITIAL_PRODUCTS.map((product) => [product.id, product]));
  const storedIds = new Set(storedProducts.map((product) => product?.id));

  const mergedProducts = storedProducts.map((product) => {
    const initialProduct = initialProductsById.get(product?.id);
    if (!initialProduct) return product;
    const legacyImage = legacyProductImages.get(product.id);
    const shouldReplaceLegacyImage = !product.image || product.image === legacyImage;

    return {
      ...initialProduct,
      ...product,
      image: shouldReplaceLegacyImage
        ? initialProduct.detailImages?.[0] || initialProduct.image
        : product.image,
      detailImages: initialProduct.detailImages,
      detailStory: initialProduct.detailStory,
    };
  });

  return [
    ...mergedProducts,
    ...INITIAL_PRODUCTS.filter((product) => !storedIds.has(product.id)),
  ];
}

function normalizeBrandSettings(stored) {
  if (!stored) return INITIAL_BRAND_SETTINGS;

  const location = stored.atelierLocation && typeof stored.atelierLocation === 'object'
    ? stored.atelierLocation
    : {};
  const isLegacyArabicLocation = /الفيوم|القاهرة/.test(location.ar || '');
  const isLegacyEnglishLocation = /Fayoum|Cairo/i.test(location.en || '');

  return {
    ...INITIAL_BRAND_SETTINGS,
    ...stored,
    atelierLocation: {
      ar: isLegacyArabicLocation ? INITIAL_BRAND_SETTINGS.atelierLocation.ar : (location.ar || INITIAL_BRAND_SETTINGS.atelierLocation.ar),
      en: isLegacyEnglishLocation ? INITIAL_BRAND_SETTINGS.atelierLocation.en : (location.en || INITIAL_BRAND_SETTINGS.atelierLocation.en),
    },
  };
}

const BrandContext = createContext(null);

export const BrandProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.lang);
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [products, setProducts] = useState(loadProducts);

  const [settings, setSettings] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.settings, null);
    const normalized = normalizeBrandSettings(stored);
    const isPlaceholderNumber = !normalized.whatsappNumber || normalized.whatsappNumber === '+201000000000';
    const isPlaceholderEmail = !normalized.contactEmail || normalized.contactEmail === 'atelier@alqerwiah.eg';
    const isPlaceholderInsta = !normalized.instagramUrl || normalized.instagramUrl === 'https://instagram.com/alqerwiah.eg';
    const isPlaceholderFb = !normalized.facebookUrl || normalized.facebookUrl === 'https://facebook.com/alqerwiah.eg';

    return {
      ...normalized,
      whatsappNumber: isPlaceholderNumber ? INITIAL_BRAND_SETTINGS.whatsappNumber : normalized.whatsappNumber,
      contactEmail: isPlaceholderEmail ? INITIAL_BRAND_SETTINGS.contactEmail : normalized.contactEmail,
      instagramUrl: isPlaceholderInsta ? INITIAL_BRAND_SETTINGS.instagramUrl : normalized.instagramUrl,
      facebookUrl: isPlaceholderFb ? INITIAL_BRAND_SETTINGS.facebookUrl : normalized.facebookUrl,
    };
  });

  const [admins, setAdmins] = useState(() =>
    readStorage(STORAGE_KEYS.admins, INITIAL_ADMINS)
  );

  const [session, setSession] = useState(() =>
    readStorage(STORAGE_KEYS.session, null)
  );

  const [inquiries, setInquiries] = useState(() =>
    readStorage(STORAGE_KEYS.inquiries, INITIAL_INQUIRIES)
  );

  const [customRequests, setCustomRequests] = useState(() =>
    readStorage(STORAGE_KEYS.customRequests, [])
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.customRequests, JSON.stringify(customRequests));
    } catch {
      // ignore (storage full or unavailable)
    }
  }, [customRequests]);

  const [customers, setCustomers] = useState(() =>
    readStorage(STORAGE_KEYS.customers, [])
  );
  const [customerSession, setCustomerSession] = useState(() =>
    readStorage(STORAGE_KEYS.customerSession, null)
  );
  // Favorites are keyed by customer id, so one customer can never read another's list.
  const [favorites, setFavorites] = useState(() =>
    readStorage(STORAGE_KEYS.favorites, {})
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.customers, JSON.stringify(customers));
    } catch {
      // ignore
    }
  }, [customers]);

  useEffect(() => {
    try {
      if (customerSession) {
        localStorage.setItem(STORAGE_KEYS.customerSession, JSON.stringify(customerSession));
      } else {
        localStorage.removeItem(STORAGE_KEYS.customerSession);
      }
    } catch {
      // ignore
    }
  }, [customerSession]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Only trust a stored session if it points at a real customer account.
  const currentCustomer = useMemo(
    () =>
      customerSession
        ? customers.find((cu) => cu.id === customerSession.customerId) || null
        : null,
    [customerSession, customers]
  );

  const favoriteIds = useMemo(
    () => (currentCustomer ? favorites[currentCustomer.id] || [] : []),
    [currentCustomer, favorites]
  );

  const isFavorite = (productId) => favoriteIds.includes(productId);

  const addFavoriteFor = (customerId, productId) => {
    setFavorites((prev) => {
      const list = prev[customerId] || [];
      if (list.includes(productId)) return prev;
      return { ...prev, [customerId]: [productId, ...list] };
    });
  };

  // There is ONE shared login page (/login) for customers and administrators. Guests who try
  // to favorite a product are sent there (the intent travels in the navigation state) and the
  // product is saved right after they sign in.
  const requestLogin = (reason = null, pendingProductId = null) => {
    navigate('/login', {
      state: { from: location.pathname + location.search, reason, pendingProductId },
    });
  };

  const toggleFavorite = (productId) => {
    if (!currentCustomer) {
      requestLogin('favorite', productId);
      return 'login-required';
    }
    const owner = currentCustomer.id;
    const already = (favorites[owner] || []).includes(productId);
    setFavorites((prev) => {
      const list = prev[owner] || [];
      return {
        ...prev,
        [owner]: already ? list.filter((id) => id !== productId) : [productId, ...list],
      };
    });
    return already ? 'removed' : 'added';
  };

  // After a successful sign-in/registration, apply the product the guest originally clicked.
  const completeCustomerAuth = (customerId, pendingProductId = null) => {
    setCustomerSession({ customerId, loggedInAt: new Date().toISOString() });
    if (pendingProductId) addFavoriteFor(customerId, pendingProductId);
  };

  const registerCustomer = (input, pendingProductId = null) => {
    const email = input.email.trim().toLowerCase();
    const isAdminEmail = admins.some((a) => a.email.trim().toLowerCase() === email);
    if (isAdminEmail || customers.some((cu) => cu.email === email)) {
      return { ok: false, reason: 'exists' };
    }
    const customer = {
      id: `cust-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      name: input.name.trim(),
      email,
      password: input.password,
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [...prev, customer]);
    completeCustomerAuth(customer.id, pendingProductId);
    return { ok: true };
  };

  const logoutCustomer = () => setCustomerSession(null);

  // Sync language & document direction immediately
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.lang, language);
    } catch {
      // ignore storage quota errors
    }
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.admins, JSON.stringify(admins));
    } catch {
      // ignore
    }
  }, [admins]);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.session);
      }
    } catch {
      // ignore
    }
  }, [session]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  // Verify session against live active admin accounts
  const currentAdmin = useMemo(() => {
    if (!session) return null;
    const matched = admins.find((a) => a.id === session.adminId && a.active);
    return matched ?? null;
  }, [admins, session]);

  useEffect(() => {
    if (session && !currentAdmin) {
      setSession(null);
    }
  }, [session, currentAdmin]);

  const setLanguage = (lang) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const addProduct = (productInput) => {
    const id = `prod-${Date.now()}`;
    const slugBase = productInput.name.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newProduct = {
      ...productInput,
      id,
      slug: slugBase || id,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSettings = (patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const getWhatsAppLink = (customMessage) => {
    const raw = (settings?.whatsappNumber || '201013644721').replace(/[^\d]/g, '');
    const digits = raw.startsWith('0') ? `2${raw}` : (raw || '201013644721');
    if (!customMessage) {
      return `https://wa.me/${digits}`;
    }
    const encoded = encodeURIComponent(customMessage);
    return `https://wa.me/${digits}?text=${encoded}`;
  };

  const getProductWhatsAppMessage = (product, lang = language) => {
    if (!product) return '';
    const productName =
      typeof product.name === 'object'
        ? product.name[lang] || product.name.ar || product.name.en || ''
        : product.name || '';
    const productId = product.id || '';

    // Each field on its own line, blank line between every block.
    // Label and value are on separate lines so nothing sits side-by-side.
    return [
      'السلام عليكم،',
      'أود الاستفسار عن هذا المنتج:',
      `اسم المنتج:\n${productName}`,
      `رقم المنتج (ID):\n${productId}`,
      'هل يمكن معرفة المزيد من التفاصيل عنه؟',
      'وشكرًا لكم.',
    ].join('\n\n');
  };

  const getProductWhatsAppLink = (product, lang = language) => {
    if (!product) return getWhatsAppLink();
    const message = getProductWhatsAppMessage(product, lang);
    return getWhatsAppLink(message);
  };

  const submitInquiry = (input) => {
    const entry = {
      ...input,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setInquiries((prev) => [entry, ...prev]);
  };

  const markInquiryReviewed = (id) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'reviewed' } : item))
    );
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const submitCustomRequest = (
    input
  ) => {
    const id = `cd-${Date.now().toString(36).toUpperCase()}`;
    const entry = {
      ...input,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setCustomRequests((prev) => [entry, ...prev]);
    return id;
  };

  const markCustomRequestReviewed = (id) => {
    setCustomRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'reviewed' } : item))
    );
  };

  const deleteCustomRequest = (id) => {
    setCustomRequests((prev) => prev.filter((item) => item.id !== id));
  };

  // Single sign-in for everyone. The role comes ONLY from the configured administrator
  // accounts (matched by email + password), never from anything the visitor claims.
  const login = (email, password, pendingProductId = null) => {
    const normalized = email.trim().toLowerCase();

    const adminMatch = admins.find((a) => a.email.trim().toLowerCase() === normalized);
    if (adminMatch) {
      if (adminMatch.password !== password) return { ok: false, reason: 'invalid' };
      if (!adminMatch.active) return { ok: false, reason: 'inactive' };
      setSession({
        adminId: adminMatch.id,
        email: adminMatch.email,
        name: adminMatch.name,
        loggedInAt: new Date().toISOString(),
      });
      return { ok: true, role: 'admin' };
    }

    const customer = customers.find((cu) => cu.email === normalized && cu.password === password);
    if (!customer) return { ok: false, reason: 'invalid' };
    completeCustomerAuth(customer.id, pendingProductId);
    return { ok: true, role: 'customer' };
  };

  const logoutAdmin = () => {
    setSession(null);
  };

  const createAdmin = (input) => {
    const normalized = input.email.trim().toLowerCase();
    if (admins.some((a) => a.email.trim().toLowerCase() === normalized)) {
      return false;
    }
    const created = {
      ...input,
      email: normalized,
      id: `admin-${Date.now()}`,
      active: true,
      createdAt: new Date().toISOString(),
    };
    setAdmins((prev) => [...prev, created]);
    return true;
  };

  const toggleAdminActive = (id) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: COPY[language],
    isRtl: language === 'ar',
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    settings,
    updateSettings,
    getWhatsAppLink,
    getProductWhatsAppMessage,
    getProductWhatsAppLink,
    inquiries,
    submitInquiry,
    markInquiryReviewed,
    deleteInquiry,
    customRequests,
    submitCustomRequest,
    markCustomRequestReviewed,
    deleteCustomRequest,
    currentCustomer,
    registerCustomer,
    logoutCustomer,
    favoriteIds,
    isFavorite,
    toggleFavorite,
    requestLogin,
    login,
    admins,
    currentAdmin,
    logoutAdmin,
    createAdmin,
    toggleAdminActive,
    deleteAdmin,
  };

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
};

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error('useBrand must be used within BrandProvider');
  }
  return ctx;
}
