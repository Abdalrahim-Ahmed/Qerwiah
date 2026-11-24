import { useState } from 'react';

export const HeritageImage = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4E8D5] via-[#FFF7EB] to-[#DFAC6D]/30 text-[#4B0011] p-6 text-center ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="mb-3 opacity-70"
        >
          <path
            d="M8 28C14 20 26 20 32 12M8 14C16 22 24 22 32 28"
            stroke="#4B0011"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="2"
            stroke="#DFAC6D"
            strokeWidth="1.2"
          />
        </svg>
        <span className="text-xs tracking-wide opacity-80 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
