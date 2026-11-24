import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../../context/BrandContext';
import { BRAND_IMAGES } from '../../data/seedData';
import { HeritageImage } from '../HeritageImage';

export const MaterialsStorySection = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          
          <h2 className="mt-2 text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#4B0011] leading-[1.18] text-balance">
            {t.materials.title}
          </h2>
          <p className="mt-4 text-[18px] text-[#2A0E14]/80 leading-[1.75]">
            {t.materials.description}
          </p>
        </div>

        {/* Exactly THREE images: Left (Genuine Leather), Center (Larger Finished Bag), Right (Natural Banana Fibers) */}
        <div
          dir="ltr"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* 1. Left: Genuine Leather */}
          <motion.figure
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 md:mt-6"
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

          {/* 2. Center: Finished Handmade Bag (Visually Dominant & Larger) */}
          <motion.figure
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6"
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

          {/* 3. Right: Natural Banana Fibers */}
          <motion.figure
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 md:mt-6"
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
