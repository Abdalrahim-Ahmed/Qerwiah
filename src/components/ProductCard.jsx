import { motion, useReducedMotion } from 'motion/react';
import { Clock, MessageCircle } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { HeritageImage } from './HeritageImage';
import { FavoriteButton } from './FavoriteButton';
import { formatProductPrice, getProductCraftingTime } from '../utils/productFormatters';

export const ProductCard = ({
  product,
  onSelect,
  index = 0,
  animateEntrance = true,
  className = '',
}) => {
  const { t, language, getProductWhatsAppLink } = useBrand();
  const prefersReduced = useReducedMotion();

  const firstImage = product.detailImages?.[0] || product.image;
  const secondImage = product.detailImages?.[1];
  const craftingTime = getProductCraftingTime(product, language, t);
  const displayPrice = formatProductPrice(product?.price);

  const cardBody = (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="aspect-[4/4.4] w-full bg-[#F4E8D5] overflow-hidden cursor-pointer block text-start"
        >
          <div className="relative h-full w-full">
            {firstImage ? (
              <HeritageImage
                src={firstImage}
                alt={product.name[language]}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] group-hover:opacity-0"
              />
            ) : null}
            {secondImage ? (
              <HeritageImage
                src={secondImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 scale-[1.02] transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-[1.03]"
              />
            ) : null}
          </div>
        </button>
        <FavoriteButton
          productId={product.id}
          productName={product.name[language]}
          className="absolute top-3 end-3"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <h2 className="text-[1.375rem] font-semibold text-[#4B0011]">
              {product.name[language]}
            </h2>
            {craftingTime && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#DFAC6D] shrink-0"
                title={t.productsPage.craftHoursLabel}
              >
                <Clock className="w-3.5 h-3.5 text-[#DFAC6D]" aria-hidden="true" />
                <span className="tabular-nums">{craftingTime}</span>
              </span>
            )}
          </div>
          <p className="mt-1 text-lg font-medium text-olive tabular-nums">
            {displayPrice ? (
              <span dir="ltr" className="inline-block tabular-nums">
                {displayPrice}
              </span>
            ) : (
              t.productsPage.priceInquiry
            )}
          </p>
        </div>

        <div className="pt-4 border-t border-[#4B0011]/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-xs sm:text-sm font-semibold text-[#4B0011] hover:text-[#3A000D] underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            {t.productsPage.viewDetails}
          </button>

          <a
            href={getProductWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4B0011] text-[#FFF7EB] hover:bg-[#3A000D] text-xs font-medium transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
            <span>{t.productsPage.inquireWhatsapp}</span>
          </a>
        </div>
      </div>
    </>
  );

  const baseClassName = `group flex flex-col rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/12 hover:border-[#DFAC6D] overflow-hidden transition-colors ${className}`;

  if (!animateEntrance) {
    return <article className={baseClassName}>{cardBody}</article>;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={baseClassName}
    >
      {cardBody}
    </motion.article>
  );
};
