import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../context/BrandContext';
import { BRAND_IMAGES } from '../data/seedData';
import { HeritageImage } from '../components/HeritageImage';
import { LiquidButton } from '../components/LiquidButton';

const STAGE_IMAGES = [
  BRAND_IMAGES.artisanHands,
  BRAND_IMAGES.bananaFibers,
  BRAND_IMAGES.crossbodyNile,
];

export const AboutPage = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {/* Editorial Opening Header */}
      <section className="relative z-10 pt-14 pb-12 sm:pt-20 sm:pb-16 border-b border-[#640018]/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xs sm:text-sm font-medium text-[#8A8861]"
          >
            {t.aboutPage.kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="mt-3 text-3xl sm:text-5xl font-semibold text-[#640018] leading-snug text-balance"
          >
            {t.aboutPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-5 text-base sm:text-lg text-[#2A0E14]/82 leading-relaxed max-w-2xl mx-auto"
          >
            {t.aboutPage.lead}
          </motion.p>
        </div>
      </section>

      {/* Three Storytelling Chapters */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20 space-y-20 sm:space-y-28">
        {t.aboutPage.stages.map((stage, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <motion.article
              key={stage.number}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <figure>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFAC6D]/50 bg-[#F4E8D5] shadow-md">
                    <HeritageImage
                      src={STAGE_IMAGES[idx] || BRAND_IMAGES.artisanHands}
                      alt={stage.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-[#8A8861]">
                    {stage.caption}
                  </figcaption>
                </figure>
              </div>

              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                <p className="text-xs sm:text-sm font-semibold text-[#8A8861] tabular-nums">
                  {stage.number}. {stage.title}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#640018] leading-snug text-balance">
                  {stage.subtitle}
                </h2>

                <div className="mt-5 space-y-4 text-sm sm:text-base text-[#2A0E14]/82 leading-relaxed">
                  <p>{stage.body1}</p>
                  <p>{stage.body2}</p>
                </div>

                {/* Editorial Pull Quote with hairline top/bottom dividers */}
                <blockquote className="mt-7 py-4 border-y border-[#DFAC6D]/50 text-base sm:text-lg italic text-[#640018]">
                  {stage.quote}
                </blockquote>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Closing Archive Invitation */}
      <section className="relative z-10 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#640018] text-[#FFF7EB] px-6 py-12 sm:px-12 sm:py-16 text-center border border-[#DFAC6D]/35">
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#FFF7EB] text-balance">
              {t.aboutPage.atelierTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#FEDEA3]/90 max-w-xl mx-auto leading-relaxed">
              {t.aboutPage.atelierBody}
            </p>
            <div className="mt-7">
              <LiquidButton to="/products" variant="gold">
                <span>{t.aboutPage.exploreCta}</span>
              </LiquidButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
