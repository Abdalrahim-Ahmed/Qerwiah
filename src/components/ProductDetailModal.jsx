import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

import { useBrand } from '../context/BrandContext';
import { HeritageImage } from './HeritageImage';
import { LiquidButton } from './LiquidButton';
import { FavoriteButton } from './FavoriteButton';
import { formatProductPrice } from '../utils/productFormatters';

export const ProductDetailModal = ({ product, onClose }) => {
  const { language, t, getProductWhatsAppLink } = useBrand();
  const displayPrice = formatProductPrice(product?.price);
  const galleryImages = product?.detailImages?.filter(Boolean)
    ?? (product?.image ? [product.image] : []);
  const galleryKey = JSON.stringify([product?.id, galleryImages]);
  const [slide, setSlide] = useState({ galleryKey: '', index: 0 });
  const activeImageIndex = slide.galleryKey === galleryKey ? slide.index : 0;
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  // Reset to first image whenever product changes; no automatic interval timer
  useEffect(() => {
    setSlide({ galleryKey, index: 0 });

    const preloadedImages = galleryImages.map((src) => {
      const image = new window.Image();
      image.src = src;
      return image;
    });

    return () => {
      preloadedImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [galleryKey]);

  return createPortal(
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

            <div className="md:col-span-6 relative overflow-hidden bg-[#F4E8D5] min-h-[300px] md:min-h-[460px]">
              {galleryImages[0] && (
                <HeritageImage
                  src={galleryImages[0]}
                  alt=""
                  className="w-full h-full object-cover opacity-0"
                />
              )}
              <AnimatePresence initial={false} mode="sync">
                {activeImage && (
                  <motion.img
                    key={`${product.id}-${activeImage}`}
                    src={activeImage}
                    alt={product.name[language]}
                    loading="eager"
                    draggable="false"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </AnimatePresence>
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
                    onClick={() => setSlide({
                      galleryKey,
                      index: (activeImageIndex - 1 + galleryImages.length) % galleryImages.length,
                    })}
                    className="absolute start-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-[#FFF7EB]/90 text-[#4B0011] border border-[#4B0011]/15 flex items-center justify-center shadow-sm hover:bg-[#FFF7EB] transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
                    onClick={() => setSlide({
                      galleryKey,
                      index: (activeImageIndex + 1) % galleryImages.length,
                    })}
                    className="absolute end-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-[#FFF7EB]/90 text-[#4B0011] border border-[#4B0011]/15 flex items-center justify-center shadow-sm hover:bg-[#FFF7EB] transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        aria-label={`${t.productsPage.showImage} ${index + 1}`}
                        aria-pressed={activeImageIndex === index}
                        onClick={() => setSlide({ galleryKey, index })}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF7EB]/85 shadow-sm backdrop-blur transition-colors hover:bg-[#FFF7EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                      >
                        <span
                          className={`h-2.5 rounded-full transition-all ${
                            activeImageIndex === index
                              ? 'w-5 bg-[#4B0011]'
                              : 'w-2.5 bg-[#8A8861]/65'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <header>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-[#4B0011] leading-tight">
                    {product.name[language]}
                  </h2>
                  <p className="mt-2 text-base font-medium text-[#8A8861] tabular-nums">
                    {displayPrice ? (
                      <>
                        <span className="text-sm text-[#2A0E14]/65">
                          {t.productsPage.priceLabel}:
                        </span>
                        {' '}
                        <span dir="ltr" className="inline-block tabular-nums">
                          {displayPrice}
                        </span>
                      </>
                    ) : (
                      t.productsPage.priceInquiry
                    )}
                  </p>
                </header>

                <section className="mt-8">
                  <h3 className="text-lg font-semibold text-[#8A8861]">
                    {t.productsPage.storyTitle}
                  </h3>
                  <p className="mt-3 font-display text-base sm:text-lg text-[#2A0E14]/90 leading-[1.75] whitespace-pre-line">
                    {(language === 'ar'
                      ? product.story?.ar || product.detailStory?.ar
                      : product.detailStory?.[language] || product.story?.[language]) ||
                      t.productsPage.storyComingSoon}
                  </p>
                </section>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#DFAC6D]/45 pt-4">
                  <span className="flex items-center gap-2 text-sm text-[#2A0E14]/70">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                    {t.productsPage.craftHoursLabel}
                  </span>
                  <p className="text-base font-semibold text-[#4B0011] tabular-nums">
                    {product.craftHours} {t.productsPage.hoursUnit}
                  </p>
                </div>
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
    </AnimatePresence>,
    document.body
  );
};
