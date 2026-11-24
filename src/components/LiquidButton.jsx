import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  burgundy:
    'bg-[#4B0011] text-[#FFF7EB] border border-[#4B0011] hover:bg-[#3A000D] shadow-sm',
  gold:
    'bg-[#FEDEA3] text-[#3A000D] border border-[#DFAC6D] hover:bg-[#DFAC6D] shadow-sm',
  outline:
    'bg-transparent text-[#4B0011] border border-[#4B0011]/35 hover:border-[#4B0011] hover:bg-[#4B0011]/5',
};

export const LiquidButton = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'burgundy',
  className = '',
  target,
  rel,
}) => {
  const base = `liquid-btn inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0011] active:scale-[0.98] ${VARIANT_CLASSES[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
};
