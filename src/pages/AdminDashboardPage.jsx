
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Check,
  Edit3,
  LogOut,
  Minus,
  Mail,
  Palette,
  Package,
  Plus,
  Settings,
  Shield,
  Star,
  Trash2,
  UserCheck,
  UserX,
  Menu,
  LayoutDashboard,
  ChevronLeft,
  ArrowRight,
  Users,
} from 'lucide-react';

import { useBrand } from '../context/BrandContext';
import { BRAND_IMAGES } from '../data/seedData';
import { formatProductPrice } from '../utils/productFormatters';

import { HeritageImage } from '../components/HeritageImage';
import { LiquidButton } from '../components/LiquidButton';

const EMPTY_PRODUCT_FORM = {
  category: 'bags',
  featured: true,
  image: BRAND_IMAGES.toteSignature,
  craftHours: 20,
  price: '',
  dimensions: '30 × 24 × 10 cm',
  nameAr: '',
  nameEn: '',
  descAr: '',
  descEn: '',
  storyAr: '',
  storyEn: '',
  materialsAr: 'ألياف موز طبيعية · جلد مصري مدبوغ نباتياً',
  materialsEn: 'Natural banana fibers · Vegetable-tanned Egyptian leather',
  editionAr: 'إصدار القروية',
  editionEn: 'Qerwiah Heritage Edition',
};

export const AdminDashboardPage = () => {
  const {
    t,
    language,
    currentAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    settings,
    updateSettings,
    inquiries,
    markInquiryReviewed,
    deleteInquiry,
    customRequests,
    markCustomRequestReviewed,
    deleteCustomRequest,
    admins,
    createAdmin,
    toggleAdminActive,
    deleteAdmin,
  } = useBrand();

  const isArabic = language === 'ar';

  const [activeTab, setActiveTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Product editor
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);

  // Settings
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Admin editor
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('curator');
  const [adminFeedback, setAdminFeedback] = useState('');

  if (!currentAdmin) {
    return <Navigate to="/login" replace />;
  }

  const openNewProductForm = () => {
    setEditingProductId(null);
    setProductForm(EMPTY_PRODUCT_FORM);
    setShowProductForm(true);
  };

  const openEditProductForm = (product) => {
    setEditingProductId(product.id);

    setProductForm({
      category: product.category,
      featured: product.featured,
      image: product.image,
      craftHours: product.craftHours,
      price: product.price ?? '',
      dimensions: product.dimensions,
      nameAr: product.name.ar,
      nameEn: product.name.en,
      descAr: product.shortDescription.ar,
      descEn: product.shortDescription.en,
      storyAr: product.story.ar,
      storyEn: product.story.en,
      materialsAr: product.materials.ar,
      materialsEn: product.materials.en,
      editionAr: product.edition.ar,
      editionEn: product.edition.en,
    });

    setShowProductForm(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (!productForm.nameAr.trim() || !productForm.nameEn.trim()) return;

    const payload = {
      category: productForm.category,
      featured: productForm.featured,
      image: productForm.image || BRAND_IMAGES.toteSignature,
      craftHours: Number(productForm.craftHours) || 16,
      ...(productForm.price !== '' && productForm.price !== null && productForm.price !== undefined
        ? { price: Number(productForm.price) }
        : {}),
      dimensions: productForm.dimensions || '28 × 20 × 10 cm',
      name: {
        ar: productForm.nameAr.trim(),
        en: productForm.nameEn.trim(),
      },
      shortDescription: {
        ar: productForm.descAr.trim() || productForm.nameAr.trim(),
        en: productForm.descEn.trim() || productForm.nameEn.trim(),
      },
      story: {
        ar: productForm.storyAr.trim() || productForm.descAr.trim(),
        en: productForm.storyEn.trim() || productForm.descEn.trim(),
      },
      materials: {
        ar: productForm.materialsAr.trim(),
        en: productForm.materialsEn.trim(),
      },
      edition: {
        ar: productForm.editionAr.trim(),
        en: productForm.editionEn.trim(),
      },
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setShowProductForm(false);
    setEditingProductId(null);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();

    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      return;
    }

    const ok = createAdmin({
      name: newAdminName.trim(),
      email: newAdminEmail.trim(),
      password: newAdminPassword.trim(),
      role: newAdminRole,
    });

    if (!ok) {
      setAdminFeedback(
        isArabic
          ? 'هذا البريد الإلكتروني مسجل مسبقاً.'
          : 'An admin with this email already exists.'
      );
      return;
    }

    setAdminFeedback('');
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setNewAdminRole('curator');
    setShowAdminForm(false);
  };

  const presetImages = [
    { label: 'Signature Tote', url: BRAND_IMAGES.toteSignature },
    { label: 'Nile Crossbody', url: BRAND_IMAGES.crossbodyNile },
    { label: 'Heritage Wallet', url: BRAND_IMAGES.walletHeritage },
    { label: 'Oasis Clutch', url: BRAND_IMAGES.clutchOasis },
    { label: 'Courtyard Satchel', url: BRAND_IMAGES.videoPoster },
    { label: 'Materials Cardholder', url: BRAND_IMAGES.materialsDuo },
  ];

  const tabs = [
    {
      key: 'products',
      label: t.dashboard.tabs.products,
      icon: Package,
    },
    {
      key: 'settings',
      label: t.dashboard.tabs.settings,
      icon: Settings,
    },
    {
      key: 'inquiries',
      label: t.dashboard.tabs.inquiries,
      icon: Mail,
    },
    {
      key: 'customRequests',
      label: isArabic ? 'طلبات التصميم الخاص' : 'Custom Designs',
      icon: Palette,
    },
    {
      key: 'admins',
      label: t.dashboard.tabs.admins,
      icon: Shield,
    },
  ];

  const sectionTitle = {
    products: t.dashboard.tabs.products,
    settings: t.dashboard.settingsTab.title,
    inquiries: t.dashboard.inquiriesTab.title,
    customRequests: isArabic ? 'طلبات التصميم الخاص' : 'Custom Design Requests',
    admins: t.dashboard.adminsTab.title,
  };

  const closeSidebar = () => setSidebarOpen(false);

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 text-sm text-[#2A0E14] outline-none focus:border-[#4B0011] focus:ring-2 focus:ring-[#4B0011]/10 transition-all';

  const labelClass = 'block text-xs font-medium text-[#4B0011] mb-2';

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F7F0E5] text-[#2A0E14]"
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-[#2A0E14]/50 lg:hidden"
        />
      )}

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky top-0 lg:top-[var(--header-height,5rem)] z-50 lg:z-20
            h-screen lg:h-[calc(100vh-var(--header-height,5rem))] w-[270px] shrink-0
            admin-sidebar-sticky
            bg-[#4B0011] text-[#FFF7EB]
            flex flex-col overflow-y-auto overscroll-contain
            transition-transform duration-300
            ${isArabic ? 'right-0' : 'left-0'}
            ${sidebarOpen
              ? 'translate-x-0'
              : isArabic
                ? 'translate-x-full lg:translate-x-0'
                : '-translate-x-full lg:translate-x-0'
            }
          `}
        >
          {/* Admin Profile */}
          <div className="mx-5 mt-5 mb-5 p-3.5 rounded-2xl bg-[#FFF7EB]/10 border-b border-[#FFF7EB]/15">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#DFAC6D] flex items-center justify-center text-[#4B0011] shrink-0">
                <Users className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1 text-end">
                <p className="text-sm font-semibold truncate">
                  {currentAdmin.name}
                </p>
                <p className="text-[11px] text-[#DFAC6D] mt-1">
                  {currentAdmin.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-5">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      setShowProductForm(false);
                      setShowAdminForm(false);
                      closeSidebar();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5
                      rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${active
                        ? 'bg-[#FFF7EB] text-[#4B0011] shadow-lg'
                        : 'text-[#FFF7EB]/75 hover:text-[#FFF7EB] hover:bg-[#FFF7EB]/10'
                      }
                    `}
                  >
                    <Icon className="w-[19px] h-[19px] shrink-0" />
                    <span>{tab.label}</span>

                    {active && (
                      <span className="ms-auto">
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="mt-auto p-5 border-t border-[#FFF7EB]/15">
            <div className="mb-4 flex items-center gap-2 text-[#DFAC6D]">
              <Shield className="w-4 h-4" />
              <span className="text-[11px]">
                {isArabic ? 'لوحة تحكم آمنة' : 'Secure Admin Panel'}
              </span>
            </div>

            <button
              type="button"
              onClick={logoutAdmin}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#FFF7EB] hover:bg-[#FFF7EB]/10 transition-colors"
            >
              <LogOut className="w-[18px] h-[18px]" />
              <span>{t.dashboard.logoutBtn}</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">

          {/* TOP HEADER */}
          <header className="sticky top-0 z-30 bg-[#FFF7EB]/95 backdrop-blur-md border-b border-[#4B0011]/10">
            <div className="px-5 sm:px-8 lg:px-10 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011]"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="min-w-0">
                  

                  <h1 className="text-xl sm:text-2xl font-semibold text-[#4B0011] truncate">
                    {sectionTitle[activeTab]}
                  </h1>
                </div>
              </div>

              <div className="">
                

                
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 max-w-[1600px] mx-auto">

            {/* Welcome */}
            <div className="mb-8">
              <p className="text-sm text-[#8A8861]">
                {t.dashboard.welcome}, {currentAdmin.name}
              </p>
            </div>

            {/* PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-7">

                {!showProductForm ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-[#4B0011]">
                          {t.dashboard.tabs.products}
                        </h2>
                        <p className="text-xs text-[#8A8861] mt-1">
                          {isArabic
                            ? 'إدارة منتجات القروية وإضافة منتجات جديدة'
                            : 'Manage your products and add new collections'}
                        </p>
                      </div>

                      <LiquidButton
                        type="button"
                        variant="burgundy"
                        onClick={openNewProductForm}
                      >
                        <Plus className="w-4 h-4 text-[#FEDEA3]" />
                        <span>{t.dashboard.productsTab.addBtn}</span>
                      </LiquidButton>
                    </div>

                    {/* Products Count */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <Package className="w-6 h-6 text-[#8A8861]" />
                          <span className="text-2xl font-semibold text-[#4B0011] tabular-nums">
                            {products.length}
                          </span>
                        </div>
                        <p className="mt-3 text-xs text-[#8A8861]">
                          {isArabic ? 'إجمالي المنتجات' : 'Total Products'}
                        </p>
                      </div>

                      <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <Star className="w-6 h-6 text-[#DFAC6D]" />
                          <span className="text-2xl font-semibold text-[#4B0011] tabular-nums">
                            {products.filter((p) => p.featured).length}
                          </span>
                        </div>
                        <p className="mt-3 text-xs text-[#8A8861]">
                          {isArabic ? 'المنتجات المميزة' : 'Featured Products'}
                        </p>
                      </div>

                      <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <Package className="w-6 h-6 text-[#8A8861]" />
                          <span className="text-2xl font-semibold text-[#4B0011] tabular-nums">
                            {products.filter((p) => p.category === 'bags').length}
                          </span>
                        </div>
                        <p className="mt-3 text-xs text-[#8A8861]">
                          {isArabic ? 'الحقائب' : 'Bags'}
                        </p>
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="group rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-[#4B0011]/5 transition-all duration-300"
                        >
                          <div className="aspect-[4/3] bg-[#F4E8D5] overflow-hidden relative">
                            <HeritageImage
                              src={product.image}
                              alt={product.name[language]}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {product.featured && (
                              <span className="absolute top-3 start-3 bg-[#4B0011] text-[#FFF7EB] text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[#DFAC6D] text-[#DFAC6D]" />
                                {isArabic ? 'منتج مميز' : 'Featured'}
                              </span>
                            )}
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                            <div>
                              <div className="flex items-center justify-between gap-2 text-xs text-[#8A8861]">
                                <span>
                                  {t.productsPage.filters[product.category]}
                                </span>
                                <span className="tabular-nums">
                                  {product.dimensions}
                                </span>
                              </div>

                              <h3 className="mt-2 text-lg font-semibold text-[#4B0011]">
                                {product.name[language]}
                              </h3>

                              {formatProductPrice(product?.price) && (
                                <p className="mt-1 text-sm font-medium text-[#8A8861] tabular-nums" dir="ltr">
                                  {formatProductPrice(product.price)}
                                </p>
                              )}

                              <p className="mt-2 text-xs text-[#2A0E14]/70 line-clamp-2 leading-relaxed">
                                {language === 'ar'
                                  ? product.story?.ar || product.shortDescription?.ar
                                  : product.shortDescription?.[language] || product.story?.[language]}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-[#4B0011]/10 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateProduct(product.id, {
                                    featured: !product.featured,
                                  })
                                }
                                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                  product.featured
                                    ? 'text-[#4B0011]'
                                    : 'text-[#8A8861]'
                                }`}
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    product.featured
                                      ? 'fill-[#DFAC6D] text-[#DFAC6D]'
                                      : ''
                                  }`}
                                />
                                <span>
                                  {t.dashboard.productsTab.featuredLabel}
                                </span>
                              </button>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openEditProductForm(product)}
                                  aria-label="Edit"
                                  className="p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011] hover:bg-[#4B0011] hover:text-white transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        isArabic
                                          ? 'هل أنت متأكد من حذف هذا المنتج؟'
                                          : 'Are you sure you want to delete this product?'
                                      )
                                    ) {
                                      deleteProduct(product.id);
                                    }
                                  }}
                                  aria-label={t.dashboard.productsTab.deleteBtn}
                                  className="p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011] hover:bg-[#4B0011] hover:text-white transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* PRODUCT FORM PAGE */
                  <div className="max-w-5xl mx-auto">
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="flex items-center gap-2 text-sm text-[#8A8861] hover:text-[#4B0011] mb-6 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {isArabic ? 'العودة إلى المنتجات' : 'Back to Products'}
                    </button>

                    <form
                      onSubmit={handleSaveProduct}
                      className="rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 p-5 sm:p-8 space-y-6 shadow-sm"
                    >
                      <div className="pb-5 border-b border-[#4B0011]/10">
                        <h2 className="text-xl font-semibold text-[#4B0011]">
                          {editingProductId
                            ? t.dashboard.productsTab.editTitle
                            : t.dashboard.productsTab.newTitle}
                        </h2>
                        <p className="text-xs text-[#8A8861] mt-1">
                          {isArabic
                            ? 'أدخلي بيانات المنتج باللغتين العربية والإنجليزية'
                            : 'Enter product details in Arabic and English'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.nameAr} *
                          </label>
                          <input
                            type="text"
                            required
                            value={productForm.nameAr}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                nameAr: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.nameEn} *
                          </label>
                          <input
                            type="text"
                            required
                            dir="ltr"
                            value={productForm.nameEn}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                nameEn: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <fieldset className="min-w-0 border-0 p-0 m-0">
                          <legend className={labelClass}>
                            {t.dashboard.productsTab.categoryLabel}
                          </legend>
                          <div className="flex gap-1 rounded-xl border border-[#4B0011]/10 bg-[#F4E8D5]/65 p-1">
                            {[
                              { value: 'bags', label: t.productsPage.filters.bags },
                              { value: 'wallets', label: t.productsPage.filters.wallets },
                            ].map((category) => (
                              <label
                                key={category.value}
                                className="flex-1 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="product-category"
                                  value={category.value}
                                  checked={productForm.category === category.value}
                                  onChange={(e) =>
                                    setProductForm({
                                      ...productForm,
                                      category: e.target.value,
                                    })
                                  }
                                  className="peer sr-only"
                                />
                                <span className="flex min-h-11 items-center justify-center rounded-lg bg-[#FFF7EB] px-3 text-center text-sm font-medium text-[#4B0011] transition-colors duration-200 peer-checked:bg-[#4B0011] peer-checked:text-[#FFF7EB] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#4B0011]">
                                  {category.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.dimensions}
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            value={productForm.dimensions}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                dimensions: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="product-price" className={labelClass}>
                            {isArabic ? 'السعر (جنيه)' : 'Price (EGP)'}
                          </label>
                          <input
                            id="product-price"
                            type="number"
                            min={0}
                            step={1}
                            dir="ltr"
                            value={productForm.price}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                price: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="craft-hours" className={labelClass}>
                            {t.dashboard.productsTab.craftHours}
                          </label>
                          <div className="flex items-center rounded-xl border border-[#4B0011]/20 bg-[#FFF7EB] transition-all focus-within:border-[#4B0011] focus-within:ring-2 focus-within:ring-[#4B0011]/10">
                            <button
                              type="button"
                              aria-label={isArabic ? 'تقليل ساعات الصنعة' : 'Decrease production hours'}
                              disabled={productForm.craftHours <= 1}
                              onClick={() =>
                                setProductForm({
                                  ...productForm,
                                  craftHours: Math.max(1, Number(productForm.craftHours) - 1),
                                })
                              }
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-s-xl text-[#4B0011] transition-colors hover:bg-[#4B0011]/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <input
                              id="craft-hours"
                              type="number"
                              min={1}
                              step={1}
                              dir="ltr"
                              value={productForm.craftHours}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  craftHours: Number(e.target.value),
                                })
                              }
                              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-center text-sm font-medium text-[#4B0011] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <button
                              type="button"
                              aria-label={isArabic ? 'زيادة ساعات الصنعة' : 'Increase production hours'}
                              onClick={() =>
                                setProductForm({
                                  ...productForm,
                                  craftHours: Number(productForm.craftHours) + 1,
                                })
                              }
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-e-xl text-[#4B0011] transition-colors hover:bg-[#4B0011]/10"
                            >
                              <Plus className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.descAr}
                          </label>
                          <textarea
                            rows={3}
                            value={productForm.descAr}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                descAr: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.descEn}
                          </label>
                          <textarea
                            rows={3}
                            dir="ltr"
                            value={productForm.descEn}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                descEn: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            {isArabic ? 'قصة المنتج بالعربية' : 'Product Story (Arabic)'}
                          </label>
                          <textarea
                            rows={3}
                            value={productForm.storyAr}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                storyAr: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            {isArabic ? 'قصة المنتج بالإنجليزية' : 'Product Story (English)'}
                          </label>
                          <textarea
                            rows={3}
                            dir="ltr"
                            value={productForm.storyEn}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                storyEn: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.materialsAr}
                          </label>
                          <input
                            type="text"
                            value={productForm.materialsAr}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                materialsAr: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            {t.dashboard.productsTab.materialsEn}
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            value={productForm.materialsEn}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                materialsEn: e.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.dashboard.productsTab.imageUrl}
                        </label>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            dir="ltr"
                            value={productForm.image}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                image: e.target.value,
                              })
                            }
                            className={inputClass}
                          />

                          <select
                            aria-label="Preset Brand Images"
                            onChange={(e) => {
                              if (e.target.value) {
                                setProductForm({
                                  ...productForm,
                                  image: e.target.value,
                                });
                              }
                            }}
                            value=""
                            className={`${inputClass} sm:max-w-[230px]`}
                          >
                            <option value="">
                              {isArabic ? 'اختر صورة جاهزة...' : 'Select atelier image...'}
                            </option>

                            {presetImages.map((img) => (
                              <option key={img.url} value={img.url}>
                                {img.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {productForm.image && (
                          <div className="mt-4 w-32 h-32 rounded-xl overflow-hidden border border-[#4B0011]/15">
                            <HeritageImage
                              src={productForm.image}
                              alt="Product preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <label className="inline-flex items-center gap-3 text-sm text-[#4B0011] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.featured}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              featured: e.target.checked,
                            })
                          }
                          className="w-4 h-4 accent-[#4B0011]"
                        />
                        {t.dashboard.productsTab.featuredLabel}
                      </label>

                      <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#4B0011]/10">
                        <LiquidButton type="submit" variant="burgundy">
                          <Check className="w-4 h-4" />
                          <span>{t.dashboard.productsTab.saveBtn}</span>
                        </LiquidButton>

                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-6 py-3 rounded-full border border-[#4B0011]/20 text-sm text-[#4B0011] hover:bg-[#F4E8D5] transition-colors"
                        >
                          {t.dashboard.productsTab.cancelBtn}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
              <form
                onSubmit={handleSaveSettings}
                className="max-w-4xl bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#4B0011]">
                    {t.dashboard.settingsTab.title}
                  </h2>
                  <p className="text-xs text-[#8A8861] mt-1">
                    {isArabic
                      ? 'إدارة معلومات التواصل وبيانات العلامة التجارية'
                      : 'Manage your brand information and contact details'}
                  </p>
                </div>

                {settingsSaved && (
                  <div
                    role="status"
                    className="p-4 rounded-xl bg-[#8A8861]/15 border border-[#8A8861]/40 text-sm text-[#2A0E14] flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-[#8A8861]" />
                    {t.dashboard.settingsTab.savedNotice}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.whatsappLabel}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.emailLabel}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={settingsForm.contactEmail}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          contactEmail: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.instagramLabel}
                    </label>
                    <input
                      type="url"
                      dir="ltr"
                      value={settingsForm.instagramUrl}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          instagramUrl: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.facebookLabel}
                    </label>
                    <input
                      type="url"
                      dir="ltr"
                      value={settingsForm.facebookUrl}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          facebookUrl: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.locationArLabel}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.atelierLocation.ar}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          atelierLocation: {
                            ...settingsForm.atelierLocation,
                            ar: e.target.value,
                          },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {t.dashboard.settingsTab.locationEnLabel}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settingsForm.atelierLocation.en}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          atelierLocation: {
                            ...settingsForm.atelierLocation,
                            en: e.target.value,
                          },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    {t.dashboard.settingsTab.videoSrcLabel}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settingsForm.videoSrc}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        videoSrc: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                  <p className="mt-2 text-xs text-[#8A8861]">
                    {t.dashboard.settingsTab.videoHint}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4B0011]/10">
                  <LiquidButton type="submit" variant="burgundy">
                    <Check className="w-4 h-4" />
                    <span>{t.dashboard.settingsTab.saveBtn}</span>
                  </LiquidButton>
                </div>
              </form>
            )}

            {/* INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[#4B0011]">
                      {t.dashboard.inquiriesTab.title}
                    </h2>
                    <p className="text-xs text-[#8A8861] mt-1">
                      {isArabic
                        ? 'متابعة رسائل واستفسارات العملاء'
                        : 'Manage customer messages and inquiries'}
                    </p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-[#F4E8D5] text-[#4B0011] text-xs">
                    {inquiries.length} {isArabic ? 'رسالة' : 'Messages'}
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl py-20 text-center">
                    <Mail className="w-10 h-10 text-[#DFAC6D] mx-auto mb-4" />
                    <p className="text-sm text-[#8A8861]">
                      {t.dashboard.inquiriesTab.empty}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-5 hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-semibold text-[#4B0011]">
                              {item.name}
                            </span>

                            <span className="text-[#8A8861]">⬢</span>

                            <span dir="ltr" className="text-[#8A8861]">
                              {item.phoneOrEmail}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full ${
                                item.status === 'reviewed'
                                  ? 'bg-[#8A8861]/15 text-[#657047]'
                                  : 'bg-[#DFAC6D]/20 text-[#4B0011]'
                              }`}
                            >
                              {item.status === 'reviewed'
                                ? t.dashboard.inquiriesTab.reviewed
                                : t.dashboard.inquiriesTab.newStatus}
                            </span>
                          </div>

                          <h3 className="text-base font-semibold text-[#4B0011]">
                            {item.subject}
                          </h3>

                          <p className="text-sm text-[#2A0E14]/75 leading-relaxed whitespace-pre-wrap">
                            {item.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.status === 'new' && (
                            <button
                              type="button"
                              onClick={() => markInquiryReviewed(item.id)}
                              className="px-4 py-2.5 rounded-full bg-[#8A8861]/15 hover:bg-[#8A8861]/25 text-xs font-medium text-[#2A0E14] transition-colors"
                            >
                              <Check className="w-3.5 h-3.5 inline-block me-1" />
                              {t.dashboard.inquiriesTab.markReviewed}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  isArabic
                                    ? 'هل تريد حذف هذه الرسالة؟'
                                    : 'Delete this inquiry?'
                                )
                              ) {
                                deleteInquiry(item.id);
                              }
                            }}
                            className="p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011] hover:bg-[#4B0011] hover:text-white transition-colors"
                            aria-label={t.dashboard.inquiriesTab.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CUSTOM DESIGN REQUESTS */}
            {activeTab === 'customRequests' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[#4B0011]">
                      {isArabic ? 'طلبات التصميم الخاص' : 'Custom Design Requests'}
                    </h2>
                    <p className="text-xs text-[#8A8861] mt-1">
                      {isArabic
                        ? 'متابعة طلبات القطع المصممة حسب الطلب'
                        : 'Review bespoke piece requests from customers'}
                    </p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-[#F4E8D5] text-[#4B0011] text-xs">
                    {customRequests.length} {isArabic ? 'طلب' : 'Requests'}
                  </span>
                </div>

                {customRequests.length === 0 ? (
                  <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl py-20 text-center">
                    <Palette className="w-10 h-10 text-[#DFAC6D] mx-auto mb-4" />
                    <p className="text-sm text-[#8A8861]">
                      {isArabic ? 'لا توجد طلبات تصميم بعد.' : 'No custom design requests yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customRequests.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-5 hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-semibold text-[#4B0011]">{item.fullName}</span>
                            <span className="text-[#8A8861]">⬢</span>
                            <span dir="ltr" className="text-[#8A8861]">{item.email}</span>
                            <span className="text-[#8A8861]">⬢</span>
                            <span dir="ltr" className="text-[#8A8861]">{item.phone}</span>
                            <span
                              className={`px-3 py-1 rounded-full ${
                                item.status === 'reviewed'
                                  ? 'bg-[#8A8861]/15 text-[#657047]'
                                  : 'bg-[#DFAC6D]/20 text-[#4B0011]'
                              }`}
                            >
                              {item.status === 'reviewed' ? t.dashboard.inquiriesTab.reviewed : t.dashboard.inquiriesTab.newStatus}
                            </span>
                          </div>

                          <p className="text-xs text-[#8A8861]">
                            <span dir="ltr" className="tabular-nums">{item.id}</span>
                            {' · '}{item.country}{' · '}{item.productType}
                            {item.material ? ` · ${item.material}` : ''}
                            {item.size ? ` · ${item.size}` : ''}
                            {item.colors ? ` · ${item.colors}` : ''}
                          </p>

                          <p className="text-sm text-[#2A0E14]/80 leading-relaxed whitespace-pre-wrap">
                            {item.description}
                          </p>

                          <p className="text-xs text-[#8A8861]">
                            {isArabic ? 'الميزانية' : 'Budget'}: {item.budget || '—'}
                            {' · '}
                            {isArabic ? 'الموعد' : 'Deadline'}: {item.deadline || '—'}
                            {' · '}
                            {isArabic ? 'التواصل' : 'Contact via'}: {item.contactMethod}
                          </p>

                          {item.referenceImages.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                              {item.referenceImages.map((src, i) => (
                                <li key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-[#4B0011]/15">
                                  <img src={src} alt="" className="w-full h-full object-cover" />
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.status === 'new' && (
                            <button
                              type="button"
                              onClick={() => markCustomRequestReviewed(item.id)}
                              className="px-4 py-2.5 rounded-full bg-[#8A8861]/15 hover:bg-[#8A8861]/25 text-xs font-medium text-[#2A0E14] transition-colors"
                            >
                              <Check className="w-3.5 h-3.5 inline-block me-1" />
                              {t.dashboard.inquiriesTab.markReviewed}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(isArabic ? 'هل تريد حذف هذا الطلب؟' : 'Delete this request?')) {
                                deleteCustomRequest(item.id);
                              }
                            }}
                            className="p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011] hover:bg-[#4B0011] hover:text-white transition-colors"
                            aria-label={t.dashboard.inquiriesTab.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADMINS */}
            {activeTab === 'admins' && (
              <div className="space-y-6">

                {!showAdminForm ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-[#4B0011]">
                          {t.dashboard.adminsTab.title}
                        </h2>
                        <p className="text-xs text-[#8A8861] mt-1">
                          {isArabic
                            ? 'إدارة حسابات وصلاحيات المسؤولين'
                            : 'Manage administrator accounts and permissions'}
                        </p>
                      </div>

                      <LiquidButton
                        type="button"
                        variant="burgundy"
                        onClick={() => {
                          setAdminFeedback('');
                          setShowAdminForm(true);
                        }}
                      >
                        <Plus className="w-4 h-4 text-[#FEDEA3]" />
                        <span>{t.dashboard.adminsTab.addTitle}</span>
                      </LiquidButton>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <Shield className="w-6 h-6 text-[#8A8861]" />
                          <span className="text-2xl font-semibold text-[#4B0011] tabular-nums">
                            {admins.length}
                          </span>
                        </div>
                        <p className="mt-3 text-xs text-[#8A8861]">
                          {isArabic ? 'إجمالي المسؤولين' : 'Total Administrators'}
                        </p>
                      </div>

                      <div className="bg-[#FFF7EB] border border-[#4B0011]/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <UserCheck className="w-6 h-6 text-[#8A8861]" />
                          <span className="text-2xl font-semibold text-[#4B0011] tabular-nums">
                            {admins.filter((a) => a.active).length}
                          </span>
                        </div>
                        <p className="mt-3 text-xs text-[#8A8861]">
                          {isArabic ? 'المسؤولون النشطون' : 'Active Administrators'}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#8A8861]">
                      {t.dashboard.adminsTab.selfNotice}
                    </p>

                    <div className="space-y-3">
                      {admins.map((admin) => (
                        <div
                          key={admin.id}
                          className="rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-[#F4E8D5] flex items-center justify-center text-[#4B0011]">
                              <Users className="w-5 h-5" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-base font-semibold text-[#4B0011]">
                                {admin.name}
                              </p>

                              <p dir="ltr" className="text-xs text-[#8A8861] mt-1 break-all">
                                {admin.email}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F4E8D5] text-[#4B0011]">
                                  {admin.role}
                                </span>

                                <span
                                  className={`text-[10px] px-2.5 py-1 rounded-full ${
                                    admin.active
                                      ? 'bg-[#8A8861]/15 text-[#657047]'
                                      : 'bg-[#4B0011]/10 text-[#4B0011]'
                                  }`}
                                >
                                  {admin.active
                                    ? t.dashboard.adminsTab.active
                                    : t.dashboard.adminsTab.inactive}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => toggleAdminActive(admin.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-[#4B0011]/20 hover:bg-[#F4E8D5] text-xs font-medium text-[#4B0011] transition-colors"
                            >
                              {admin.active ? (
                                <>
                                  <UserX className="w-3.5 h-3.5" />
                                  <span>{t.dashboard.adminsTab.deactivate}</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>{t.dashboard.adminsTab.activate}</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    isArabic
                                      ? 'هل أنت متأكد من حذف هذا المسؤول؟'
                                      : 'Are you sure you want to delete this admin?'
                                  )
                                ) {
                                  deleteAdmin(admin.id);
                                }
                              }}
                              aria-label={t.dashboard.adminsTab.delete}
                              className="p-2.5 rounded-xl bg-[#F4E8D5] text-[#4B0011] hover:bg-[#4B0011] hover:text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* ADD ADMIN FORM */
                  <div className="max-w-2xl mx-auto">
                    <button
                      type="button"
                      onClick={() => setShowAdminForm(false)}
                      className="flex items-center gap-2 text-sm text-[#8A8861] hover:text-[#4B0011] mb-6 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {isArabic ? 'العودة إلى المسؤولين' : 'Back to Administrators'}
                    </button>

                    <form
                      onSubmit={handleCreateAdmin}
                      className="rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/10 p-6 sm:p-8 space-y-5 shadow-sm"
                    >
                      <div className="pb-5 border-b border-[#4B0011]/10">
                        <h2 className="text-xl font-semibold text-[#4B0011]">
                          {t.dashboard.adminsTab.addTitle}
                        </h2>
                        <p className="text-xs text-[#8A8861] mt-1">
                          {isArabic
                            ? 'أدخلي بيانات المسؤول الجديد'
                            : 'Enter the new administrator details'}
                        </p>
                      </div>

                      {adminFeedback && (
                        <p className="text-xs text-[#4B0011] bg-[#4B0011]/10 p-3 rounded-xl">
                          {adminFeedback}
                        </p>
                      )}

                      <div>
                        <label className={labelClass}>
                          {t.dashboard.adminsTab.nameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.dashboard.adminsTab.emailLabel}
                        </label>
                        <input
                          type="email"
                          required
                          dir="ltr"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.dashboard.adminsTab.passwordLabel}
                        </label>
                        <input
                          type="password"
                          required
                          dir="ltr"
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.dashboard.adminsTab.roleLabel}
                        </label>
                        <select
                          value={newAdminRole}
                          onChange={(e) =>
                            setNewAdminRole(e.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="curator">Curator</option>
                          <option value="owner">Owner</option>
                        </select>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#4B0011]/10">
                        <LiquidButton
                          type="submit"
                          variant="burgundy"
                          className="w-full sm:w-auto"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t.dashboard.adminsTab.addBtn}</span>
                        </LiquidButton>

                        <button
                          type="button"
                          onClick={() => setShowAdminForm(false)}
                          className="px-6 py-3 rounded-full border border-[#4B0011]/20 text-sm text-[#4B0011] hover:bg-[#F4E8D5] transition-colors"
                        >
                          {t.dashboard.productsTab.cancelBtn}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};
