import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { LiquidButton } from '../components/LiquidButton';
import logoArBurgundy from '../assets/logo/logo-arabic-burgundy.svg';
import logoEnBurgundy from '../assets/logo/logo-en-burgundy.svg';

export const NotFoundPage = () => {
  const { language, isRtl, t, getWhatsAppLink } = useBrand();
  const prefersReduced = useReducedMotion();

  const copy = language === 'ar'
    ? {
        heading: 'الصفحة دي مش موجودة',
        description: 'يمكن الرابط اتغير، أو الصفحة دي انتقلت من مكانها في الأتيليه.',
        primaryCta: 'ارجعي للرئيسية',
        secondaryCta: 'شوّفي منتجاتنا',
        whatsappLabel: 'محتاجة مساعدة؟ كلمينا على واتساب',
      }
    : {
        heading: 'This Page Could Not Be Found',
        description: 'The link may have changed, or this page has moved within our atelier.',
        primaryCta: 'Back to Home',
        secondaryCta: 'Explore Our Collection',
        whatsappLabel: 'Need help? Chat with us on WhatsApp',
      };

  const brandLogo = language === 'ar' ? logoArBurgundy : logoEnBurgundy;
  const HomeArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative z-10 min-h-[calc(100vh-var(--header-height,5rem))] flex items-center justify-center bg-[#FFF7EB] px-5 py-16 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl mx-auto text-center flex flex-col items-center"
      >
        {/* Official Qerwiah Brand Logo */}
        <div className="mb-8 sm:mb-10">
          <img
            src={brandLogo}
            alt={t.brandTitle}
            draggable="false"
            className="h-16 sm:h-20 w-auto mx-auto object-contain select-none"
          />
        </div>

        {/* Main Error Heading */}
        <h1
          id="not-found-heading"
          className="text-[clamp(2rem,5vw,3.25rem)] font-semibold text-[#4B0011] leading-[1.2] text-balance"
        >
          {copy.heading}
        </h1>

        {/* Short Descriptive Text */}
        <p className="mt-4 text-base sm:text-lg text-[#2A0E14]/80 leading-[1.75] max-w-md mx-auto">
          {copy.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
          <LiquidButton
            to="/"
            variant="burgundy"
            className="w-full sm:w-auto min-w-[180px]"
          >
            <span>{copy.primaryCta}</span>
            <HomeArrow className="w-4 h-4" aria-hidden="true" />
          </LiquidButton>

          <LiquidButton
            to="/products"
            variant="outline"
            className="w-full sm:w-auto min-w-[180px] bg-[#F4E8D5]/55 border-[#DFAC6D]/55 hover:bg-[#F4E8D5]"
          >
            <ShoppingBag className="w-4 h-4 text-[#4B0011]" aria-hidden="true" />
            <span>{copy.secondaryCta}</span>
          </LiquidButton>
        </div>

        {/* Understated WhatsApp Contact Link */}
        <div className="mt-8">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#4B0011]/75 hover:text-[#4B0011] underline underline-offset-4 decoration-[#4B0011]/30 hover:decoration-[#4B0011] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4B0011] rounded-sm"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{copy.whatsappLabel}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
