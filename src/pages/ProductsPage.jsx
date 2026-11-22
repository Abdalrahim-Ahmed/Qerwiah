import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Search, X } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

import { HeritageImage } from '../components/HeritageImage';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { FavoriteButton } from '../components/FavoriteButton';

export const ProductsPage = () => {
  const { t, language, products, getWhatsAppLink } = useBrand();
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
    { key: 'clutches', label: t.productsPage.filters.clutches },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#640018]/12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#8A8861]">
              {t.productsPage.kicker}
            </p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-semibold text-[#640018] text-balance">
              {t.productsPage.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#2A0E14]/80 leading-relaxed">
              {t.productsPage.subtitle}
            </p>
          </div>

          {/* Search and Interactive Filter Controls */}
          <div
            dir="ltr"
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 self-start w-full md:w-auto mt-4 md:mt-14 lg:mt-16"
          >
            <label dir="rtl" className="relative block order-2 w-full sm:w-72 lg:w-80">
              <Search
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-[#640018]/55"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={language === 'ar' ? 'ابحثي عن قطعة...' : 'Search the collection...'}
                aria-label={language === 'ar' ? 'البحث في المجموعة' : 'Search the collection'}
                className="w-full h-11 rounded-full border border-[#DFAC6D]/55 bg-[#FFF7EB] px-11 text-sm text-[#2A0E14] placeholder:text-[#2A0E14]/45 outline-none transition-colors focus:border-[#640018]/55 focus:ring-2 focus:ring-[#640018]/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={language === 'ar' ? 'مسح البحث' : 'Clear search'}
                  className="absolute top-1/2 -translate-y-1/2 end-3 w-7 h-7 rounded-full flex items-center justify-center text-[#640018]/65 hover:bg-[#640018]/8 hover:text-[#640018] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </label>

            <div
              className="order-1 flex w-full sm:w-auto items-center gap-0.5 p-1.5 rounded-full bg-[#F4E8D5] border border-[#DFAC6D]/45 whitespace-nowrap"
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
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#640018] text-[#FFF7EB] shadow-sm'
                        : 'text-[#640018]/80 hover:text-[#640018]'
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
                className="group flex flex-col rounded-2xl bg-[#FFF7EB] border border-[#640018]/12 hover:border-[#DFAC6D] overflow-hidden transition-colors"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="aspect-[4/4.4] w-full bg-[#F4E8D5] overflow-hidden cursor-pointer block text-start"
                  >
                    <HeritageImage
                      src={product.image}
                      alt={product.name[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                  <FavoriteButton
                    productId={product.id}
                    productName={product.name[language]}
                    className="absolute top-3 end-3"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#8A8861]">
                      <span>{product.edition[language]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {product.craftHours} {t.productsPage.hoursUnit}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-semibold text-[#640018]">
                      {product.name[language]}
                    </h2>

                    <p className="mt-2 text-sm text-[#2A0E14]/80 leading-relaxed">
                      {product.shortDescription[language]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#640018]/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs sm:text-sm font-semibold text-[#640018] hover:text-[#4A0011] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      {t.productsPage.viewDetails}
                    </button>

                    <a
                      href={getWhatsAppLink(
                        language === 'ar'
                          ? `مرحباً القروية، أود الاستفسار عن قطعة: ${product.name.ar}`
                          : `Hello AL QERWIAH, I would like to inquire about: ${product.name.en}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#640018] text-[#FFF7EB] hover:bg-[#4A0011] text-xs font-medium transition-colors whitespace-nowrap"
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
