import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../../context/BrandContext';
import { LiquidButton } from '../LiquidButton';
import heroBg from '../../assets/images/hero-bg.jpg';

export const HeroSection = () => {
  const { t, language } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative z-10 overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center py-16 sm:py-20 lg:py-28">
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Directional overlay: darker behind text (right side in RTL, left side in LTR) fading toward the bag */}
        <div
          className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l from-[#2D000A]/95 via-[#3D000E]/75 to-[#4B0011]/30 sm:to-transparent"
          aria-hidden="true"
        />
        {/* Global subtle film overlay for rich contrast */}
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-semibold flex flex-col gap-1 sm:gap-2 tracking-tight drop-shadow-md"
          >
            <span className="text-[clamp(2.25rem,5.5vw,70px)] lg:text-[70px] leading-[1.12] text-[#FFF7EB]">
              {t.hero.headlineLine1 || (language === 'ar' ? 'من روح الريف' : 'Rooted in Heritage.')}
            </span>
            <span className="text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] leading-[1.15] text-[#FEDEA3]">
              {t.hero.headlineLine2 || (language === 'ar' ? 'صنعت حكاية جديدة' : 'Crafted for Today.')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[18px] text-[#FFF7EB]/90 leading-[1.75] max-w-xl drop-shadow"
          >
            {t.hero.subcopy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <LiquidButton to="/products" variant="gold">
              <span>{t.hero.ctaCollection}</span>
            </LiquidButton>
            <LiquidButton
              to="/about"
              variant="outline"
              className="border-[#FFF7EB]/40 text-[#FFF7EB] hover:text-[#FEDEA3] hover:border-[#FEDEA3] hover:bg-[#FFF7EB]/10"
            >
              <span>{t.hero.ctaStory}</span>
            </LiquidButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
