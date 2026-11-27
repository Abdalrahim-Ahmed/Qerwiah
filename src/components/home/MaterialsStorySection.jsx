import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { BRAND_IMAGES } from '../../data/seedData';
import { HeritageImage } from '../HeritageImage';

export const MaterialsStorySection = () => {
  const { t, language, isRtl } = useBrand();
  const prefersReduced = useReducedMotion();
  const desktopGridRef = useRef(null);
  const isDesktopInView = useInView(desktopGridRef, { once: true, amount: 0.25 });

  // Storytelling stages in the exact sequence requested:
  // Stage 01: Banana Fibers -> Stage 02: Genuine Leather -> Stage 03: Final Handmade Creation
  const stages = [
    {
      number: '01',
      id: 'stage-banana-fibers',
      title: t.materials.leftTitle,
      description: t.materials.leftCaption,
      image: BRAND_IMAGES.bananaFibers,
      label: language === 'ar' ? 'المرحلة 01 · ألياف الموز' : 'Stage 01 · Banana Fibers',
    },
    {
      number: '02',
      id: 'stage-genuine-leather',
      title: t.materials.rightTitle,
      description: t.materials.rightCaption,
      image: BRAND_IMAGES.genuineLeather,
      label: language === 'ar' ? 'المرحلة 02 · الجلد الطبيعي' : 'Stage 02 · Egyptian Leather',
    },
    {
      number: '03',
      id: 'stage-finished-piece',
      title: t.materials.centerTitle,
      description: t.materials.centerCaption,
      image: BRAND_IMAGES.toteSignature,
      label: language === 'ar' ? 'المرحلة 03 · القطعة المكتملة' : 'Stage 03 · Final Creation',
    },
  ];

  const [currentStage, setCurrentStage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = next, -1 = prev

  const handleNext = useCallback(() => {
    if (currentStage < stages.length - 1) {
      setSlideDirection(1);
      setCurrentStage((prev) => prev + 1);
    }
  }, [currentStage, stages.length]);

  const handlePrev = useCallback(() => {
    if (currentStage > 0) {
      setSlideDirection(-1);
      setCurrentStage((prev) => prev - 1);
    }
  }, [currentStage]);

  const goToStage = (idx) => {
    if (idx === currentStage) return;
    setSlideDirection(idx > currentStage ? 1 : -1);
    setCurrentStage(idx);
  };

  // Touch Swipe for Mobile Storytelling (Never blocks vertical scroll)
  const touchState = useRef({
    startX: 0,
    startY: 0,
    isSwiping: false,
    isScrolling: false,
  });

  const handleTouchStart = (e) => {
    touchState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      isSwiping: false,
      isScrolling: false,
    };
  };

  const handleTouchMove = (e) => {
    if (touchState.current.isScrolling) return;

    const dx = e.touches[0].clientX - touchState.current.startX;
    const dy = e.touches[0].clientY - touchState.current.startY;

    if (!touchState.current.isSwiping && !touchState.current.isScrolling) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
        touchState.current.isScrolling = true;
        return;
      }
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 7) {
        touchState.current.isSwiping = true;
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (touchState.current.isSwiping) {
      const dx = e.changedTouches[0].clientX - touchState.current.startX;
      const threshold = 40;
      if (Math.abs(dx) >= threshold) {
        if (isRtl) {
          if (dx > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        } else {
          if (dx < 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    }
    touchState.current.isSwiping = false;
    touchState.current.isScrolling = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      if (isRtl) handlePrev();
      else handleNext();
    } else if (e.key === 'ArrowLeft') {
      if (isRtl) handleNext();
      else handlePrev();
    }
  };

  // Storytelling transition variants (coordinated subtle horizontal slide + fade)
  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: prefersReduced ? 0 : (isRtl ? -direction : direction) * 26,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.42,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: prefersReduced ? 0 : (isRtl ? direction : -direction) * 26,
      transition: {
        duration: prefersReduced ? 0.15 : 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="mt-2 text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#4B0011] leading-[1.18] text-balance">
            {t.materials.title}
          </h2>
          <p className="mt-4 text-[18px] text-[#2A0E14]/80 leading-[1.75]">
            {t.materials.description}
          </p>
        </div>

        {/* MOBILE ONLY: Compact Horizontal Storytelling (< md) */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden"
        >
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className="relative bg-[#FFF7EB] rounded-2xl border border-[#DFAC6D]/50 shadow-sm p-4 overflow-hidden focus:outline-none"
            aria-roledescription="story-stage"
            aria-label={t.materials.title}
          >
            {/* Stage Progress Bar & Counter Header */}
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <div
                className="flex items-center gap-1.5 flex-1"
                role="tablist"
                aria-label={t.materials.title}
              >
                {stages.map((stage, idx) => (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={currentStage === idx}
                    aria-label={`${stage.title} (${stage.number})`}
                    onClick={() => goToStage(idx)}
                    className="flex-1 py-1.5 -my-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011] rounded-full"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        currentStage === idx
                          ? 'bg-[#4B0011]'
                          : currentStage > idx
                          ? 'bg-[#4B0011]/60'
                          : 'bg-[#4B0011]/15'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span className="tabular-nums text-xs font-semibold tracking-wider text-[#4B0011]/80 shrink-0">
                {stages[currentStage].number} / 03
              </span>
            </div>

            {/* Animated Stage Content: Image + Text transition together */}
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={stages[currentStage].id}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-3.5"
              >
                {/* Prominent but compact image */}
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#DFAC6D]/40 bg-[#F4E8D5] shadow-xs">
                  <HeritageImage
                    src={stages[currentStage].image}
                    alt={stages[currentStage].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stage Text */}
                <div className="px-1 pt-1 pb-1">
                  <span className="inline-block text-xs font-medium text-[#DFAC6D] bg-[#4B0011] px-2.5 py-0.5 rounded-full mb-1.5">
                    {stages[currentStage].label}
                  </span>
                  <h3 className="text-xl font-semibold text-[#4B0011] leading-snug">
                    {stages[currentStage].title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-[#2A0E14]/85 leading-relaxed">
                    {stages[currentStage].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Navigation: Minimal arrows + stage hint */}
            <div className="mt-3 pt-3 border-t border-[#4B0011]/10 flex items-center justify-between">
              <span className="text-xs text-[#2A0E14]/65">
                {language === 'ar' ? 'اسحبي للتنقل بين المراحل' : 'Swipe to explore stages'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentStage === 0}
                  onClick={handlePrev}
                  aria-label={language === 'ar' ? 'المرحلة السابقة' : 'Previous stage'}
                  className="w-8 h-8 rounded-full border border-[#4B0011]/20 bg-[#FFF7EB] text-[#4B0011] shadow-xs flex items-center justify-center hover:bg-[#F4E8D5] active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                >
                  {isRtl ? (
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  disabled={currentStage === stages.length - 1}
                  onClick={handleNext}
                  aria-label={language === 'ar' ? 'المرحلة التالية' : 'Next stage'}
                  className="w-8 h-8 rounded-full border border-[#4B0011]/20 bg-[#FFF7EB] text-[#4B0011] shadow-xs flex items-center justify-center hover:bg-[#F4E8D5] active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011]"
                >
                  {isRtl ? (
                    <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DESKTOP & TABLET: Exactly THREE images — Cards Emerging From Behind the Main Product */}
        <div
          ref={desktopGridRef}
          dir="ltr"
          className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* 1. Left: Genuine Leather (Emerges from behind center handbag toward left) */}
          <motion.figure
            initial={
              prefersReduced
                ? { opacity: 1, x: '0%', scale: 1 }
                : { opacity: 0, x: '95%', scale: 0.94 }
            }
            animate={
              prefersReduced || isDesktopInView
                ? { opacity: 1, x: '0%', scale: 1 }
                : { opacity: 0, x: '95%', scale: 0.94 }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.75,
              delay: prefersReduced ? 0 : 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 md:col-span-3 md:mt-6"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#DFAC6D]/45 bg-[#F4E8D5] shadow-sm">
              <HeritageImage
                src={BRAND_IMAGES.genuineLeather}
                alt={t.materials.rightTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center">
              <h3 className="text-base font-semibold text-[#4B0011]">
                {t.materials.rightTitle}
              </h3>
            </figcaption>
          </motion.figure>

          {/* 2. Center: Finished Handmade Bag (Appears first, visually dominant in front) */}
          <motion.figure
            initial={
              prefersReduced
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            animate={
              prefersReduced || isDesktopInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-20 md:col-span-6"
          >
            <div className="aspect-[3/4] sm:aspect-[4/4.6] rounded-2xl overflow-hidden border-2 border-[#DFAC6D]/70 bg-[#F4E8D5] shadow-xl">
              <HeritageImage
                src={BRAND_IMAGES.toteSignature}
                alt={t.materials.centerTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-[#4B0011]">
                {t.materials.centerTitle}
              </h3>
            </figcaption>
          </motion.figure>

          {/* 3. Right: Natural Banana Fibers (Emerges from behind center handbag toward right, staggered) */}
          <motion.figure
            initial={
              prefersReduced
                ? { opacity: 1, x: '0%', scale: 1 }
                : { opacity: 0, x: '-95%', scale: 0.94 }
            }
            animate={
              prefersReduced || isDesktopInView
                ? { opacity: 1, x: '0%', scale: 1 }
                : { opacity: 0, x: '-95%', scale: 0.94 }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.75,
              delay: prefersReduced ? 0 : 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 md:col-span-3 md:mt-6"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#DFAC6D]/45 bg-[#F4E8D5] shadow-sm">
              <HeritageImage
                src={BRAND_IMAGES.bananaFibers}
                alt={t.materials.leftTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center">
              <h3 className="text-base font-semibold text-[#4B0011]">
                {t.materials.leftTitle}
              </h3>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
