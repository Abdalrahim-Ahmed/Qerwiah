import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../context/BrandContext';
import { HeritageImage } from '../components/HeritageImage';
import { LiquidButton } from '../components/LiquidButton';
import aboutImageOne from '../assets/images/about_image_one.jpeg';
import aboutImageTwo from '../assets/images/about_image_two.jpeg';
import aboutImageThree from '../assets/images/about_image_three.jpeg';

const STAGE_IMAGES = [
  aboutImageOne,
  aboutImageTwo,
  aboutImageThree,
];

export const AboutPage = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {/* Editorial Opening Header */}
      <section className="relative z-10 pt-14 pb-12 sm:pt-20 sm:pb-16 border-b border-[#4B0011]/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            
          >
            
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="mt-3 text-[clamp(2rem,4.5vw,60px)] font-semibold text-[#4B0011] leading-[1.18] text-balance"
          >
            {t.aboutPage.title}
          </motion.h1>
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
                      src={STAGE_IMAGES[idx]}
                      alt={stage.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                </figure>
              </div>

              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                <h2 className="mt-2 text-[clamp(1.75rem,3.8vw,52px)] font-semibold text-[#4B0011] leading-[1.2] text-balance">
                  {stage.subtitle}
                </h2>

                <div className="mt-5 space-y-4 text-[18px] text-[#2A0E14]/82 leading-[1.75]">
                  <p>{stage.body1}</p>
                  <p>{stage.body2}</p>
                </div>

              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Closing Archive Invitation */}
      <section className="relative z-10 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#4B0011] text-[#FFF7EB] px-6 py-12 sm:px-12 sm:py-16 text-center border border-[#DFAC6D]/35">
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
