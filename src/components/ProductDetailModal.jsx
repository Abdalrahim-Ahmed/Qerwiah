import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X, Clock, Ruler, Layers } from 'lucide-react';

import { useBrand } from '../context/BrandContext';
import { HeritageImage } from './HeritageImage';
import { LiquidButton } from './LiquidButton';
import { FavoriteButton } from './FavoriteButton';

export const ProductDetailModal = ({ product, onClose }) => {
  const { language, t, getProductWhatsAppLink } = useBrand();

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A0E14]/70 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={product.name[language]}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFF7EB] text-[#2A0E14] rounded-2xl border border-[#DFAC6D]/40 shadow-2xl grid grid-cols-1 md:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.productsPage.close}
              className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-[#FFF7EB]/90 text-[#4B0011] border border-[#4B0011]/20 flex items-center justify-center hover:bg-[#4B0011] hover:text-[#FFF7EB] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-6 bg-[#F4E8D5] min-h-[300px] md:min-h-[460px]">
              <HeritageImage
                src={product.image}
                alt={product.name[language]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#4B0011] leading-snug">
                  {product.name[language]}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#2A0E14]/85 leading-relaxed">
                  {product.shortDescription[language]}
                </p>

                <div className="my-5 h-px bg-[#4B0011]/12" />

                <p className="text-sm text-[#2A0E14]/80 leading-relaxed">
                  {product.story[language]}
                </p>

                <dl className="mt-6 space-y-3 text-xs sm:text-sm border-t border-[#4B0011]/12 pt-4">
                  <div className="flex items-start gap-3">
                    <dt className="flex items-center gap-1.5 text-[#4B0011] font-medium shrink-0">
                      <Layers className="w-4 h-4 text-[#8A8861]" aria-hidden="true" />
                      <span>{t.productsPage.materials}:</span>
                    </dt>
                    <dd className="text-[#2A0E14]/80">{product.materials[language]}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="flex items-center gap-1.5 text-[#4B0011] font-medium shrink-0">
                      <Ruler className="w-4 h-4 text-[#8A8861]" aria-hidden="true" />
                      <span>{t.productsPage.dimensions}:</span>
                    </dt>
                    <dd dir="ltr" className="text-[#2A0E14]/80 tabular-nums">
                      {product.dimensions}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="flex items-center gap-1.5 text-[#4B0011] font-medium shrink-0">
                      <Clock className="w-4 h-4 text-[#8A8861]" aria-hidden="true" />
                      <span>{t.productsPage.craftTime}:</span>
                    </dt>
                    <dd className="text-[#2A0E14]/80 tabular-nums">
                      {product.craftHours} {t.productsPage.hoursUnit}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <LiquidButton
                  href={getProductWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="burgundy"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
                  <span>{t.productsPage.inquireWhatsapp}</span>
                </LiquidButton>
                <FavoriteButton
                  variant="pill"
                  productId={product.id}
                  productName={product.name[language]}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
