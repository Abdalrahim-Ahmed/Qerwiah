import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

import { FavoriteButton } from '../FavoriteButton';
import { HeritageImage } from '../HeritageImage';

export const FeaturedProductsSection = ({
  onSelectProduct,
}) => {
  const { t, language, products } = useBrand();
  const prefersReduced = useReducedMotion();

  const featuredList = products.filter((p) => p.featured).slice(0, 4);
  const displayItems = featuredList.length > 0 ? featuredList : products.slice(0, 4);

  const [activeId, setActiveId] = useState(displayItems[0]?.id || '');

  // Keep activeId valid if products change in dashboard
  const resolvedActiveId = displayItems.some((p) => p.id === activeId)
    ? activeId
    : displayItems[0]?.id;

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-10 sm:mb-12">
          
          <h2 className="mt-2 text-[clamp(1.85rem,4.5vw,60px)] lg:text-[60px] font-semibold text-[#4B0011] leading-[1.18] text-balance">
            {t.featured.title}
          </h2>
          <p className="mt-3 text-[18px] text-[#2A0E14]/80 leading-[1.75]">
            {t.featured.subtitle}
          </p>
        </div>

        {/* Interactive Expanding Cards Gallery */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[520px]">
          {displayItems.map((product) => {
            const isExpanded = product.id === resolvedActiveId;
            return (
              <motion.article
                key={product.id}
                layout={!prefersReduced}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveId(product.id)}
                onFocus={() => setActiveId(product.id)}
                onClick={() => setActiveId(product.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-colors ${
                  isExpanded
                    ? 'lg:flex-[2.4] min-h-[380px] lg:min-h-0 border-[#DFAC6D]/60 shadow-lg'
                    : 'lg:flex-1 min-h-[160px] lg:min-h-0 border-[#4B0011]/15 hover:border-[#DFAC6D]'
                }`}
              >
                <HeritageImage
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-full object-cover"
                />

                <FavoriteButton
                  productId={product.id}
                  productName={product.name[language]}
                  className="absolute top-3 end-3 z-10"
                />

                {/* Scrim for guaranteed WCAG contrast */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-[#4B0011]/88 via-[#4B0011]/25 to-transparent'
                      : 'bg-gradient-to-t from-[#4B0011]/85 via-[#4B0011]/45 to-[#4B0011]/15'
                  }`}
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-[#FFF7EB] flex flex-col justify-end">
                  

                  <h3
                    className={`mt-1.5 font-semibold text-[#FFF7EB] ${
                      isExpanded ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                    }`}
                  >
                    {product.name[language]}
                  </h3>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 max-w-md"
                    >
                      <p className="text-sm text-[#FFF7EB]/85 leading-relaxed">
                        {product.shortDescription[language]}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEDEA3] text-[#3A000D] hover:bg-[#DFAC6D] text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>{t.featured.explorePiece}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
