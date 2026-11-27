import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { LiquidButton } from './LiquidButton';
import { ProductCard } from './ProductCard';
import logoArBurgundy from '../assets/logo/logo-arabic-burgundy.svg';
import logoEnBurgundy from '../assets/logo/logo-en-burgundy.svg';

const MAX_RECOMMENDATIONS = 6;

export const ProductsEmptyState = ({
  searchQuery,
  activeFilter,
  onReset,
  onSelectProduct,
}) => {
  const { language, isRtl, products, t } = useBrand();
  const prefersReduced = useReducedMotion();
  const trimmedQuery = searchQuery.trim();

  const copy = language === 'ar'
    ? {
        heading: 'ملقيناش اللي بتدوري عليه',
        description:
          'دورنا في مجموعتنا، لكن ملقيناش نتيجة مطابقة لبحثك. جربي كلمة تانية أو اكتشفي قطعنا المميزة.',
        queryPrefix: 'نتائج البحث عن:',
        resetButton: 'عرض كل المنتجات',
        recommendationsTitle: 'يمكن تعجبك القطع دي',
        recommendationsSubtitle: 'اكتشفي قطع مميزة من قروية',
        prevLabel: 'المنتج السابق',
        nextLabel: 'المنتج التالي',
      }
    : {
        heading: "We couldn't find what you're looking for",
        description:
          'We searched our collection, but found no matching piece. Try another keyword or discover our signature creations.',
        queryPrefix: 'Search results for:',
        resetButton: 'View All Products',
        recommendationsTitle: 'You Might Also Like',
        recommendationsSubtitle: 'Discover signature pieces from Qerwiah',
        prevLabel: 'Previous product',
        nextLabel: 'Next product',
      };

  const brandLogo = language === 'ar' ? logoArBurgundy : logoEnBurgundy;

  // Recommendation selection logic:
  // 1. Exclude unavailable/inactive products
  // 2. If active category filter exists, prioritize available products from that category (featured first)
  // 3. Fall back to available featured products, then other available products
  // 4. Deduplicate by product id
  const recommendedProducts = useMemo(() => {
    const available = products.filter(
      (p) => p && p.available !== false && p.active !== false,
    );
    if (available.length === 0) return [];

    const seen = new Set();
    const result = [];

    const addUnique = (list) => {
      for (const item of list) {
        if (result.length >= MAX_RECOMMENDATIONS) break;
        if (!seen.has(item.id)) {
          seen.add(item.id);
          result.push(item);
        }
      }
    };

    if (activeFilter && activeFilter !== 'all') {
      const sameCategoryFeatured = available.filter(
        (p) => p.category === activeFilter && p.featured,
      );
      const sameCategoryRest = available.filter(
        (p) => p.category === activeFilter && !p.featured,
      );
      addUnique(sameCategoryFeatured);
      addUnique(sameCategoryRest);
    }

    const featured = available.filter((p) => p.featured);
    const others = available.filter((p) => !p.featured);
    addUnique(featured);
    addUnique(others);

    return result;
  }, [products, activeFilter]);

  // Carousel State & Responsive Measurement
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchState = useRef({
    startX: 0,
    startY: 0,
    isSwiping: false,
    isScrolling: false,
  });

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

  // Determine cards per view & dimensions based on container width
  const { cardWidth, gap, maxIndex } = useMemo(() => {
    const total = recommendedProducts.length;
    if (containerWidth >= 1024) {
      // Desktop: 3 cards per view
      const g = 24;
      const w = (containerWidth - g * 2) / 3;
      return { cardWidth: w, gap: g, maxIndex: Math.max(0, total - 3) };
    }
    if (containerWidth >= 640) {
      // Tablet: 2 cards per view
      const g = 20;
      const w = (containerWidth - g) / 2;
      return { cardWidth: w, gap: g, maxIndex: Math.max(0, total - 2) };
    }
    // Mobile: 1 primary card + subtle peek of next card
    const g = 14;
    const w = containerWidth > 0 ? Math.round(containerWidth * 0.84) : 280;
    return { cardWidth: w, gap: g, maxIndex: Math.max(0, total - 1) };
  }, [containerWidth, recommendedProducts.length]);

  const resolvedIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, Math.min(prev, maxIndex) - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Axis-locked Touch Swipe (never blocks vertical scrolling)
  const handleTouchStart = (e) => {
    if (maxIndex === 0) return;
    touchState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      isSwiping: false,
      isScrolling: false,
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (maxIndex === 0 || touchState.current.isScrolling) return;

    const dx = e.touches[0].clientX - touchState.current.startX;
    const dy = e.touches[0].clientY - touchState.current.startY;

    if (!touchState.current.isSwiping && !touchState.current.isScrolling) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
        touchState.current.isScrolling = true;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 7) {
        touchState.current.isSwiping = true;
      }
    }

    if (touchState.current.isSwiping) {
      const isAtFirst = resolvedIndex === 0;
      const isAtLast = resolvedIndex === maxIndex;
      let effectiveDx = dx;

      if (isRtl) {
        if ((isAtFirst && dx < 0) || (isAtLast && dx > 0)) {
          effectiveDx = dx * 0.28;
        }
      } else {
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

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      if (isRtl) handlePrev();
      else handleNext();
    } else if (e.key === 'ArrowLeft') {
      if (isRtl) handleNext();
      else handlePrev();
    }
  };

  const step = cardWidth + gap;
  const baseOffset = isRtl ? resolvedIndex * step : -(resolvedIndex * step);
  const totalOffset = baseOffset + dragOffset;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 sm:py-16"
    >
      {/* Centered Empty State */}
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        <img
          src={brandLogo}
          alt={t.brandTitle}
          draggable="false"
          className="h-14 sm:h-16 w-auto mx-auto object-contain select-none mb-6 sm:mb-7"
        />

        <h2 className="text-[clamp(1.75rem,4vw,2.625rem)] font-semibold text-[#4B0011] leading-[1.22] text-balance">
          {copy.heading}
        </h2>

        <p className="mt-3 text-base sm:text-lg text-[#2A0E14]/80 leading-[1.75] max-w-md mx-auto">
          {copy.description}
        </p>

        {/* Dynamic Search Query Display (only shown when a search query exists) */}
        {trimmedQuery && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4E8D5]/75 border border-[#DFAC6D]/45 text-xs sm:text-sm text-[#4B0011]/85">
            <Search className="w-3.5 h-3.5 text-[#4B0011]/65 shrink-0" aria-hidden="true" />
            <span>
              {copy.queryPrefix}{' '}
              <strong className="font-semibold text-[#4B0011]">{trimmedQuery}</strong>
            </span>
          </div>
        )}

        {/* Primary Reset Action */}
        <div className="mt-7">
          <LiquidButton
            type="button"
            variant="burgundy"
            onClick={onReset}
            className="min-w-[190px]"
          >
            <span>{copy.resetButton}</span>
          </LiquidButton>
        </div>
      </div>

      {/* Recommended Products Carousel */}
      {recommendedProducts.length > 0 && (
        <div className="mt-14 sm:mt-18 pt-10 sm:pt-12 border-t border-[#4B0011]/12">
          <div className="flex items-end justify-between gap-4 mb-7 sm:mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#4B0011] leading-snug">
                {copy.recommendationsTitle}
              </h3>
              <p className="mt-1 text-sm sm:text-base text-[#2A0E14]/75">
                {copy.recommendationsSubtitle}
              </p>
            </div>

            {maxIndex > 0 && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={resolvedIndex === 0}
                  onClick={handlePrev}
                  aria-label={copy.prevLabel}
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
                  disabled={resolvedIndex === maxIndex}
                  onClick={handleNext}
                  aria-label={copy.nextLabel}
                  className="w-9 h-9 rounded-full border border-[#4B0011]/20 bg-[#FFF7EB] text-[#4B0011] shadow-xs flex items-center justify-center hover:bg-[#F4E8D5] active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                >
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            aria-roledescription="carousel"
            aria-label={copy.recommendationsTitle}
            className="relative overflow-hidden w-full focus:outline-none"
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
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                  className="flex"
                >
                  <ProductCard
                    product={product}
                    onSelect={onSelectProduct}
                    animateEntrance={false}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Pagination Indicators */}
          {maxIndex > 0 && (
            <div
              className="mt-6 flex items-center justify-center gap-1.5"
              role="tablist"
              aria-label={copy.recommendationsTitle}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
                const isActive = resolvedIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${idx + 1} / ${maxIndex + 1}`}
                    onClick={() => setCurrentIndex(idx)}
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
          )}
        </div>
      )}
    </motion.div>
  );
};
