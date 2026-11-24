import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../../context/BrandContext';
import { BRAND_IMAGES } from '../../data/seedData';
import { HeritageImage } from '../HeritageImage';
import { LiquidButton } from '../LiquidButton';

export const AboutPreviewSection = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Photograph */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <figure>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFAC6D]/45 shadow-md bg-[#F4E8D5]">
                <HeritageImage
                  src={BRAND_IMAGES.artisanHands}
                  alt={t.aboutPreview.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              
            </figure>
          </motion.div>

          {/* Editorial Introduction */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            
            <h2 className="mt-2 text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#4B0011] leading-[1.18] text-balance">
              {t.aboutPreview.title}
            </h2>

            <div className="mt-6 space-y-4 text-[18px] text-[#2A0E14]/82 leading-[1.75] max-w-xl">
              <p>{t.aboutPreview.paragraph1}</p>
              <p>{t.aboutPreview.paragraph2}</p>
            </div>

            <div className="mt-8">
              <LiquidButton to="/about" variant="burgundy">
                <span>{t.aboutPreview.cta}</span>
              </LiquidButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
