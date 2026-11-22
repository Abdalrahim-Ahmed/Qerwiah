import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, UserRound } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

import { HeritageImage } from '../components/HeritageImage';
import { LiquidButton } from '../components/LiquidButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { ProductDetailModal } from '../components/ProductDetailModal';

export const FavoritesPage = () => {
  const { t, language, products, currentCustomer, favoriteIds, requestLogin } = useBrand();
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState(null);

  // Keep the order the customer saved them in; skip products an admin has since deleted.
  const favoriteProducts = useMemo(
    () =>
      favoriteIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p) => Boolean(p)),
    [favoriteIds, products]
  );

  return (
    <div className="min-h-[70vh] py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="pb-8 border-b border-[#640018]/12 max-w-2xl">
          <p className="text-xs sm:text-sm font-medium text-[#8A8861]">{t.favorites.kicker}</p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-semibold text-[#640018] text-balance">
            {t.favorites.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#2A0E14]/80 leading-relaxed">
            {t.favorites.subtitle}
          </p>
          {currentCustomer && (
            <p className="mt-3 text-xs text-[#8A8861] tabular-nums" data-testid="favorites-count">
              {favoriteProducts.length} {t.favorites.countLabel}
            </p>
          )}
        </div>

        {!currentCustomer ? (
          <div className="py-20 text-center space-y-4">
            <UserRound className="w-12 h-12 text-[#DFAC6D] mx-auto" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-[#640018]">{t.favorites.guestTitle}</h2>
            <p className="text-sm text-[#2A0E14]/75 max-w-md mx-auto">{t.favorites.guestBody}</p>
            <LiquidButton variant="burgundy" onClick={() => requestLogin(null, null)}>
              <span>{t.favorites.guestButton}</span>
            </LiquidButton>
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4" data-testid="favorites-empty">
            <Heart className="w-12 h-12 text-[#DFAC6D] mx-auto" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-[#640018]">{t.favorites.emptyTitle}</h2>
            <p className="text-sm text-[#2A0E14]/75 max-w-md mx-auto">{t.favorites.emptyBody}</p>
            <LiquidButton to="/products" variant="burgundy">
              <span>{t.favorites.browse}</span>
            </LiquidButton>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            <AnimatePresence initial={false}>
              {favoriteProducts.map((product) => (
                <motion.li
                  key={product.id}
                  layout={!prefersReduced}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  data-testid="favorite-item"
                  className="group flex flex-col rounded-2xl bg-[#FFF7EB] border border-[#640018]/12 hover:border-[#DFAC6D] overflow-hidden transition-colors"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSelected(product)}
                      aria-label={`${t.favorites.viewDetails}: ${product.name[language]}`}
                      className="aspect-[4/4.4] w-full bg-[#F4E8D5] overflow-hidden cursor-pointer block"
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
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#8A8861]">{product.edition[language]}</p>
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
                        onClick={() => setSelected(product)}
                        className="text-xs sm:text-sm font-semibold text-[#640018] hover:text-[#4A0011] underline underline-offset-4 cursor-pointer"
                      >
                        {t.favorites.viewDetails}
                      </button>
                      <FavoriteLinkRemove productId={product.id} label={t.favorites.remove} />
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {currentCustomer && favoriteProducts.length > 0 && (
          <p className="mt-10 text-center text-xs text-[#2A0E14]/60">
            <Link to="/products" className="underline underline-offset-4 hover:text-[#640018]">
              {t.favorites.browse}
            </Link>
          </p>
        )}
      </div>

      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

const FavoriteLinkRemove = ({ productId, label }) => {
  const { toggleFavorite } = useBrand();
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      className="text-xs font-medium text-[#640018]/80 hover:text-[#640018] cursor-pointer whitespace-nowrap"
    >
      {label}
    </button>
  );
};
