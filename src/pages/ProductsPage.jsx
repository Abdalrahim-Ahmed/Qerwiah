import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Search, X } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

import { HeritageImage } from '../components/HeritageImage';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { FavoriteButton } from '../components/FavoriteButton';

const getDisplayPrice = (product, language) => {
  const rawPrice = product?.price;
  let value = rawPrice;
  let currency = product?.currency;

  if (rawPrice && typeof rawPrice === 'object') {
    value = rawPrice[language] ?? rawPrice.amount ?? rawPrice.value;
    currency = rawPrice.currency ?? currency;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    value = new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG', {
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (typeof value !== 'string' || !value.trim()) return null;
  const localizedCurrency =
    currency && typeof currency === 'object'
      ? currency[language] ?? currency.ar ?? currency.en
      : currency;
  return localizedCurrency ? `${value.trim()} ${localizedCurrency}` : value.trim();
};

export const ProductsPage = () => {
  const { t, language, products, getProductWhatsAppLink } = useBrand();
  const prefersReduced = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    const normalize = (value) =>
      value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u064B-\u065F\u0670]/g, '')
        .trim();

    const query = normalize(searchQuery);
    return products.filter((product) => {
      const matchesCategory = filter === 'all' || product.category === filter;
      if (!matchesCategory) return false;
      if (!query) return true;

      const searchableText = [
        product.name.ar,
        product.name.en,
        product.shortDescription.ar,
        product.shortDescription.en,
        product.story.ar,
        product.story.en,
        product.materials.ar,
        product.materials.en,
        product.edition.ar,
        product.edition.en,
        product.category,
      ]
        .map(normalize)
        .join(' ');

      return searchableText.includes(query);
    });
  }, [products, filter, searchQuery]);

  const filterTabs = [
    { key: 'all', label: t.productsPage.filters.all },
    { key: 'bags', label: t.productsPage.filters.bags },
    { key: 'wallets', label: t.productsPage.filters.wallets },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#4B0011]/12">
          <div className="max-w-2xl">
            
            <h1 className="mt-2 text-[clamp(2rem,4.5vw,60px)] font-semibold text-[#4B0011] leading-[1.18] text-balance">
              {t.productsPage.title}
            </h1>
            <p className="mt-3 text-[18px] text-[#2A0E14]/80 leading-[1.75]">
              {t.productsPage.subtitle}
            </p>
          </div>

          {/* Search and Interactive Filter Controls */}
          <div
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 self-start w-full md:w-auto mt-4 md:mt-14 lg:mt-16 p-1.5 rounded-3xl sm:rounded-full bg-[#F4E8D5] border border-[#DFAC6D]/45 shadow-sm"
          >
            <label className="relative block w-full sm:w-56 lg:w-64 shrink-0">
              <Search
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-[#4B0011]/55"
                aria-hidden="true"
              />
              <input
                type="text"
                role="searchbox"
                inputMode="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={language === 'ar' ? 'ابحثي عن قطعة...' : 'Search the collection...'}
                aria-label={language === 'ar' ? 'البحث في المجموعة' : 'Search the collection'}
                className="w-full h-10 rounded-full bg-transparent ps-10 pe-9 text-sm text-[#2A0E14] placeholder:text-[#2A0E14]/55 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#4B0011]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={language === 'ar' ? 'مسح البحث' : 'Clear search'}
                  className="absolute top-1/2 -translate-y-1/2 end-2 w-7 h-7 rounded-full flex items-center justify-center text-[#4B0011]/65 hover:bg-[#4B0011]/10 hover:text-[#4B0011] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </label>

            <div
              className="flex w-full sm:w-auto items-center gap-1 p-1 rounded-full bg-[#FFF7EB]/55 whitespace-nowrap"
              role="tablist"
              aria-label="Product Categories"
            >
              {filterTabs.map((tab) => {
                const active = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(tab.key)}
                    className={`flex-1 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-center rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011] ${
                      active
                        ? 'bg-[#4B0011] text-[#FFF7EB] shadow-md shadow-[#4B0011]/15'
                        : 'text-[#4B0011]/80 hover:bg-[#FFF7EB]/70 hover:text-[#4B0011]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Archive Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#2A0E14]/70">
            {t.productsPage.empty}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filtered.map((product, idx) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/12 hover:border-[#DFAC6D] overflow-hidden transition-colors"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="aspect-[4/4.4] w-full bg-[#F4E8D5] overflow-hidden cursor-pointer block text-start"
                  >
                    <div className="relative h-full w-full">
                      {product.detailImages?.[0] || product.image ? (
                        <HeritageImage
                          src={product.detailImages?.[0] || product.image}
                          alt={product.name[language]}
                          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] group-hover:opacity-0"
                        />
                      ) : null}
                      {product.detailImages?.[1] ? (
                        <HeritageImage
                          src={product.detailImages[1]}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover opacity-0 scale-[1.02] transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                  </button>
                  <FavoriteButton
                    productId={product.id}
                    productName={product.name[language]}
                    className="absolute top-3 end-3"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>

                    <h2 className="mt-2 text-xl font-semibold text-[#4B0011]">
                      {product.name[language]}
                    </h2>
                    <p className="mt-1 text-base font-medium text-[#8A8861] tabular-nums">
                      {getDisplayPrice(product, language) || t.productsPage.priceInquiry}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#4B0011]/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs sm:text-sm font-semibold text-[#4B0011] hover:text-[#3A000D] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      {t.productsPage.viewDetails}
                    </button>

                    <a
                      href={getProductWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4B0011] text-[#FFF7EB] hover:bg-[#3A000D] text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
                      <span>{t.productsPage.inquireWhatsapp}</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
