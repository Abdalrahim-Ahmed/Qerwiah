import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { LiquidButton } from '../LiquidButton';

export const WhatsAppSection = () => {
  const { t, settings, getWhatsAppLink } = useBrand();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative z-10 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-[#F4E8D5]/75 border border-[#DFAC6D]/50 px-6 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#4B0011] text-balance">
              {t.whatsapp.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2A0E14]/82 leading-relaxed">
              {t.whatsapp.description}
            </p>
            <p className="mt-4 text-xs text-[#4B0011]/80">
              {t.whatsapp.numberLabel}:{' '}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-semibold tabular-nums hover:underline hover:text-[#4B0011]"
                aria-label="WhatsApp"
              >
                {settings.whatsappNumber}
              </a>
            </p>
          </div>

          <div className="shrink-0">
            <LiquidButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="burgundy"
            >
              <MessageCircle className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
              <span>{t.whatsapp.button}</span>
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
