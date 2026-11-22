import { Heart } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const FavoriteButton = ({
  productId,
  productName,
  variant = 'icon',
  className = '',
}) => {
  const { t, isFavorite, toggleFavorite } = useBrand();
  const active = isFavorite(productId);
  const action = active ? t.favorites.removeAria : t.favorites.addAria;

  const handleClick = (e) => {
    // Cards are clickable themselves; the heart must not trigger them.
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(productId);
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={`${action}: ${productName}`}
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#640018] ${
          active
            ? 'bg-[#FEDEA3] border-[#DFAC6D] text-[#4A0011] hover:bg-[#DFAC6D]'
            : 'bg-transparent border-[#640018]/35 text-[#640018] hover:border-[#640018] hover:bg-[#640018]/5'
        } ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-transform ${active ? 'fill-[#640018] text-[#640018] scale-110' : ''}`}
          aria-hidden="true"
        />
        <span>{active ? t.favorites.saved : t.favorites.save}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`${action}: ${productName}`}
      className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur transition-all duration-300 cursor-pointer active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#640018] ${
        active
          ? 'bg-[#FFF7EB] border-[#DFAC6D] text-[#640018]'
          : 'bg-[#FFF7EB]/85 border-[#640018]/15 text-[#640018]/75 hover:bg-[#FFF7EB] hover:text-[#640018]'
      } ${className}`}
    >
      <Heart
        className={`w-[18px] h-[18px] transition-transform ${active ? 'fill-[#640018] scale-110' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
};
