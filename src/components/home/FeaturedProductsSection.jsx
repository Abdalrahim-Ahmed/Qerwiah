import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

import { FavoriteButton } from '../FavoriteButton';
import { HeritageImage } from '../HeritageImage';
import { getProductCraftingTime } from '../../utils/productFormatters';

export const FeaturedProductsSection = ({
  onSelectProduct,
}) => {
  const { t, language, products, isRtl } = useBrand();
  const prefersReduced = useReducedMotion();

  const featuredList = products.filter((p) => p.featured).slice(0, 4);
  const displayItems = featuredList.length > 0 ? featuredList : products.slice(0, 4);

  // Desktop/Tablet active state (expanding gallery)
  const [activeId, setActiveId] = useState(displayItems[0]?.id || '');

  // Keep activeId valid if products change in dashboard
  const resolvedActiveId = displayItems.some((p) => p.id === activeId)
    ? activeId
    : displayItems[0]?.id;

  // Mobile Carousel State
  const [mobileIndex, setMobileIndex] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchState = useRef({
    startX: 0,
    startY: 0,
    isSwiping: false,
    isScrolling: false,
  });

  // Keep mobileIndex in valid range if items change
  const resolvedMobileIndex = Math.min(mobileIndex, Math.max(0, displayItems.length - 1));

  // Measure mobile carousel container width
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = useCallback(() => {
    setMobileIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setMobileIndex((prev) => Math.min(displayItems.length - 1, prev + 1));
  }, [displayItems.length]);

  // Touch Swipe Handlers for Mobile (Never blocks vertical scrolling)
  const handleTouchStart = (e) => {
    touchState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      isSwiping: false,
      isScrolling: false,
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (touchState.current.isScrolling) return;

    const dx = e.touches[0].clientX - touchState.current.startX;
    const dy = e.touches[0].clientY - touchState.current.startY;

    // Detect direction on first meaningful gesture
    if (!touchState.current.isSwiping && !touchState.current.isScrolling) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
        // Natural vertical scroll - allow default browser scrolling
        touchState.current.isScrolling = true;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 7) {
        // Horizontal carousel swipe
        touchState.current.isSwiping = true;
      }
    }

    if (touchState.current.isSwiping) {
      // Boundary resistance
      const isAtFirst = resolvedMobileIndex === 0;
      const isAtLast = resolvedMobileIndex === displayItems.length - 1;
      let effectiveDx = dx;

      if (isRtl) {
        // In RTL: dx > 0 moves toward next; dx < 0 moves toward prev
        if ((isAtFirst && dx < 0) || (isAtLast && dx > 0)) {
          effectiveDx = dx * 0.28;
        }
      } else {
        // In LTR: dx < 0 moves toward next; dx > 0 moves toward prev
        if ((isAtFirst && dx > 0) || (isAtLast && dx < 0)) {
          effectiveDx = dx * 0.28;
        }
      }

      setDragOffset(effectiveDx);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (touchState.current.isSwiping) {
      const threshold = 40;
      if (isRtl) {
        if (dragOffset > threshold) {
          handleNext();
        } else if (dragOffset < -threshold) {
          handlePrev();
        }
      } else {
        if (dragOffset < -threshold) {
          handleNext();
        } else if (dragOffset > threshold) {
          handlePrev();
        }
      }
    }
    setDragOffset(0);
    touchState.current.isSwiping = false;
    touchState.current.isScrolling = false;
  };

  // Keyboard navigation for carousel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      if (isRtl) handlePrev();
      else handleNext();
    } else if (e.key === 'ArrowLeft') {
      if (isRtl) handleNext();
      else handlePrev();
    }
  };

  // Dimensions for One Card + Peek
  // Card takes 84% of container, leaving 16% minus gap for next card peek
  const cardWidth = containerWidth > 0 ? Math.round(containerWidth * 0.84) : 290;
  const gap = 14;
  const step = cardWidth + gap;
  const baseOffset = isRtl
    ? resolvedMobileIndex * step
    : -resolvedMobileIndex * step;
  const totalOffset = baseOffset + dragOffset;

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="mt-2 text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#4B0011] leading-[1.18] text-balance">
            {t.featured.title}
          </h2>
          <p className="mt-3 text-[18px] text-[#2A0E14]/80 leading-[1.75]">
            {t.featured.subtitle}
          </p>
        </div>

        {/* MOBILE ONLY: One Card + Peek Carousel (< md) */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className="relative overflow-hidden w-full select-none focus:outline-none"
            aria-roledescription="carousel"
            aria-label={t.featured.title}
          >
            <div
              className="flex items-stretch will-change-transform"
              style={{
                gap: `${gap}px`,
                transform: `translate3d(${totalOffset}px, 0, 0)`,
                transition: isDragging
                  ? 'none'
                  : prefersReduced
                  ? 'none'
                  : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {displayItems.map((product, idx) => {
                const isCurrent = idx === resolvedMobileIndex;
                const craftingTime = getProductCraftingTime(product, language, t);

                return (
                  <article
                    key={product.id}
                    onClick={() => {
                      if (!isCurrent) {
                        setMobileIndex(idx);
                      } else {
                        onSelectProduct(product);
                      }
                    }}
                    style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 h-[400px] ${
                      isCurrent
                        ? 'border-[#DFAC6D]/60 shadow-lg'
                        : 'border-[#4B0011]/15 opacity-85 hover:border-[#DFAC6D]'
                    }`}
                    aria-current={isCurrent ? 'true' : undefined}
                  >
                    <HeritageImage
                      src={product.image}
                      alt={product.name[language]}
                      className="w-full h-full object-cover"
                    />

                    <FavoriteButton
                      productId={product.id}
                      productName={product.name[language]}
                      className="absolute top-3 end-3 z-10"
                    />

                    {/* Scrim for guaranteed WCAG contrast */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#4B0011]/88 via-[#4B0011]/25 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-[#FFF7EB] flex flex-col justify-end">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="mt-1.5 font-semibold text-[#FFF7EB] text-[1.5rem] leading-snug">
                          {product.name[language]}
                        </h3>

                        {craftingTime && (
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FEDEA3] shrink-0 mt-1.5"
                            title={t.productsPage?.craftHoursLabel || t.featured?.craftHoursLabel}
                          >
                            <Clock className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
                            <span className="tabular-nums">{craftingTime}</span>
                          </span>
                        )}
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEDEA3] text-[#3A000D] hover:bg-[#DFAC6D] text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap active:scale-95"
                        >
                          <span>{t.featured.explorePiece}</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls: Pagination Dots + Minimal Arrows */}
          {displayItems.length > 1 && (
            <div className="mt-5 flex items-center justify-between px-1">
              {/* Subtle pagination indicators */}
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label={t.featured.title}
              >
                {displayItems.map((product, idx) => {
                  const isActive = resolvedMobileIndex === idx;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${product.name[language]} (${idx + 1}/${displayItems.length})`}
                      onClick={() => setMobileIndex(idx)}
                      className="p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011] rounded-full"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-7 bg-[#4B0011]'
                            : 'w-2 bg-[#4B0011]/25 hover:bg-[#4B0011]/45'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Minimal Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={resolvedMobileIndex === 0}
                  onClick={handlePrev}
                  aria-label={language === 'ar' ? 'المنتج السابق' : 'Previous product'}
                  className="w-9 h-9 rounded-full border border-[#4B0011]/20 bg-[#FFF7EB] text-[#4B0011] shadow-xs flex items-center justify-center hover:bg-[#F4E8D5] active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                >
                  {isRtl ? (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  disabled={resolvedMobileIndex === displayItems.length - 1}
                  onClick={handleNext}
                  aria-label={language === 'ar' ? 'المنتج التالي' : 'Next product'}
                  className="w-9 h-9 rounded-full border border-[#4B0011]/20 bg-[#FFF7EB] text-[#4B0011] shadow-xs flex items-center justify-center hover:bg-[#F4E8D5] active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                >
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP & TABLET: Interactive Expanding Cards Gallery (Preserved Exactly on md+) */}
        <div className="hidden md:flex flex-col lg:flex-row gap-4 lg:h-[520px]">
          {displayItems.map((product) => {
            const isExpanded = product.id === resolvedActiveId;
            const craftingTime = getProductCraftingTime(product, language, t);
            return (
              <motion.article
                key={product.id}
                layout={!prefersReduced}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveId(product.id)}
                onFocus={() => setActiveId(product.id)}
                onClick={() => setActiveId(product.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-colors ${
                  isExpanded
                    ? 'lg:flex-[2.4] min-h-[380px] lg:min-h-0 border-[#DFAC6D]/60 shadow-lg'
                    : 'lg:flex-1 min-h-[160px] lg:min-h-0 border-[#4B0011]/15 hover:border-[#DFAC6D]'
                }`}
              >
                <HeritageImage
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-full object-cover"
                />

                <FavoriteButton
                  productId={product.id}
                  productName={product.name[language]}
                  className="absolute top-3 end-3 z-10"
                />

                {/* Scrim for guaranteed WCAG contrast */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-[#4B0011]/88 via-[#4B0011]/25 to-transparent'
                      : 'bg-gradient-to-t from-[#4B0011]/85 via-[#4B0011]/45 to-[#4B0011]/15'
                  }`}
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-[#FFF7EB] flex flex-col justify-end">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3
                      className={`mt-1.5 font-semibold text-[#FFF7EB] ${
                        isExpanded
                          ? 'text-[1.625rem] sm:text-[2rem]'
                          : 'text-[1.25rem] sm:text-[1.375rem]'
                      }`}
                    >
                      {product.name[language]}
                    </h3>

                    {craftingTime && (
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FEDEA3] shrink-0 mt-1.5"
                        title={t.productsPage?.craftHoursLabel || t.featured?.craftHoursLabel}
                      >
                        <Clock className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
                        <span className="tabular-nums">{craftingTime}</span>
                      </span>
                    )}
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 max-w-md"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEDEA3] text-[#3A000D] hover:bg-[#DFAC6D] text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>{t.featured.explorePiece}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
