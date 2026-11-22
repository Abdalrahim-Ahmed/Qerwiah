import { Fragment, useState } from 'react';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { SectionDivider } from '../components/SectionDivider';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { AboutPreviewSection } from '../components/home/AboutPreviewSection';
import { CinematicVideoSection } from '../components/home/CinematicVideoSection';
import { MaterialsStorySection } from '../components/home/MaterialsStorySection';
import { WhatsAppSection } from '../components/home/WhatsAppSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Exact Homepage Section Sequence. The decorative divider is rendered between every
  // pair of main sections (Home page only); the global wavy line lives in App.jsx.
  const sections = [
    <HeroSection />,
    <FeaturedProductsSection onSelectProduct={setSelectedProduct} />,
    <AboutPreviewSection />,
    <CinematicVideoSection />,
    <MaterialsStorySection />,
    <WhatsAppSection />,
    <FinalCtaSection />,
  ];

  return (
    <div className="relative overflow-hidden">
      {sections.map((section, index) => (
        <Fragment key={index}>
          {index > 0 && <SectionDivider />}
          {section}
        </Fragment>
      ))}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
