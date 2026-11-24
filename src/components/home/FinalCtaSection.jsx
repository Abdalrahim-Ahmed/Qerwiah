import { motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../../context/BrandContext';
import { LiquidButton } from '../LiquidButton';

export const FinalCtaSection = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#4B0011] text-[#FFF7EB] px-6 py-14 sm:px-14 sm:py-20 text-center border border-[#DFAC6D]/35 shadow-xl"
        >
          {/* Subtle woven fiber arcs */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M -40 310 C 260 120, 540 380, 880 180 C 1030 95, 1140 170, 1260 110"
              stroke="#FEDEA3"
              strokeWidth="2"
            />
            <path
              d="M -20 340 C 290 155, 570 405, 900 210 C 1050 125, 1150 205, 1250 145"
              stroke="#DFAC6D"
              strokeWidth="1.2"
            />
          </svg>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#FFF7EB] leading-[1.18] text-balance">
              {t.finalCta.title}
            </h2>
            <p className="mt-4 text-[18px] text-[#FEDEA3]/90 leading-[1.75]">
              {t.finalCta.subtitle}
            </p>
            <div className="mt-8">
              <LiquidButton to="/products" variant="gold">
                <span>{t.finalCta.button}</span>
              </LiquidButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
