import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { LiquidButton } from '../LiquidButton';
import { HeritageImage } from '../HeritageImage';

export const HeroSection = () => {
  const { t, language, isRtl, products } = useBrand();
  const prefersReduced = useReducedMotion();
  const slides = products.slice(0, 5);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced || paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [prefersReduced, paused, slides.length]);

  const currentSlide = slides[index] || slides[0];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative z-10 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-medium text-[#8A8861] tracking-wide"
            >
              {t.hero.kicker}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#640018] leading-[1.18] text-balance"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-[#2A0E14]/82 leading-relaxed max-w-xl"
            >
              {t.hero.subcopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <LiquidButton to="/products" variant="burgundy">
                <span>{t.hero.ctaCollection}</span>
              </LiquidButton>
              <LiquidButton to="/about" variant="outline">
                <span>{t.hero.ctaStory}</span>
              </LiquidButton>
            </motion.div>

            {/* Subtle editorial heritage note */}
            <div className="mt-10 pt-6 border-t border-[#640018]/12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8A8861]">
              <span>AL QERWIAH – القروية</span>
              <span aria-hidden="true">·</span>
              <span>{t.footer.heritageMark}</span>
            </div>
          </div>

          {/* Dominant Product Image Slider */}
          <div
            className="lg:col-span-6 flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative flex-1 min-h-[420px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl overflow-hidden bg-[#F4E8D5] border border-[#DFAC6D]/45 shadow-lg">
              <AnimatePresence mode="wait">
                {currentSlide && (
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <HeritageImage
                      src={currentSlide.image}
                      alt={currentSlide.name[language]}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#2A0E14]/80 via-[#2A0E14]/15 to-transparent"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Bottom Info & Controls */}
              {currentSlide && (
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#FFF7EB]">
                  <div className="max-w-sm">
                    <p className="text-xs text-[#FEDEA3] tracking-wide">
                      {currentSlide.edition[language]}
                    </p>
                    <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-[#FFF7EB]">
                      {currentSlide.name[language]}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {/* Slide Indicators */}
                    <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
                      {slides.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setIndex(idx)}
                          aria-label={`${idx + 1} ${t.hero.slideOf} ${slides.length}`}
                          aria-selected={idx === index}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === index
                              ? 'w-6 bg-[#FEDEA3]'
                              : 'w-2 bg-[#FFF7EB]/45 hover:bg-[#FFF7EB]/80'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Manual Prev / Next */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={isRtl ? handleNext : handlePrev}
                        aria-label={t.hero.prevSlide}
                        className="w-10 h-10 rounded-full bg-[#FFF7EB]/18 backdrop-blur-sm border border-[#FFF7EB]/30 text-[#FFF7EB] hover:bg-[#640018] hover:border-[#FEDEA3]/50 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={isRtl ? handlePrev : handleNext}
                        aria-label={t.hero.nextSlide}
                        className="w-10 h-10 rounded-full bg-[#FFF7EB]/18 backdrop-blur-sm border border-[#FFF7EB]/30 text-[#FFF7EB] hover:bg-[#640018] hover:border-[#FEDEA3]/50 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
