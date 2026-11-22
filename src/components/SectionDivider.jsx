import { useId } from 'react';

/**
 * Decorative divider placed between the main sections of the Home page ONLY.
 * Two delicate hairlines fade in toward a small gold ornament (a lozenge flanked by
 * smaller lozenges and dots). Purely decorative: hidden from assistive tech, no
 * pointer events, and symmetrical so it reads identically in RTL and LTR.
 */
export const SectionDivider = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const toCenter = `sd-in-${uid}`;
  const fromCenter = `sd-out-${uid}`;

  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`relative z-10 flex justify-center px-5 sm:px-8 pointer-events-none select-none ${className}`}
      data-testid="section-divider"
    >
      <svg viewBox="0 0 640 28" className="w-full max-w-2xl h-7" fill="none">
        <defs>
          <linearGradient id={toCenter} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#DFAC6D" stopOpacity="0" />
            <stop offset="0.55" stopColor="#DFAC6D" stopOpacity="0.55" />
            <stop offset="1" stopColor="#DFAC6D" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={fromCenter} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#DFAC6D" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="#DFAC6D" stopOpacity="0.55" />
            <stop offset="1" stopColor="#DFAC6D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary hairlines */}
        <line x1="8" y1="14" x2="268" y2="14" stroke={`url(#${toCenter})`} strokeWidth="1" />
        <line x1="372" y1="14" x2="632" y2="14" stroke={`url(#${fromCenter})`} strokeWidth="1" />

        {/* Fine secondary hairlines, shorter and offset */}
        <line x1="96" y1="19" x2="252" y2="19" stroke={`url(#${toCenter})`} strokeWidth="0.6" strokeOpacity="0.7" />
        <line x1="388" y1="19" x2="544" y2="19" stroke={`url(#${fromCenter})`} strokeWidth="0.6" strokeOpacity="0.7" />

        {/* Centre ornament */}
        <path d="M320 4 L330 14 L320 24 L310 14 Z" fill="#FEDEA3" stroke="#DFAC6D" strokeWidth="1" strokeLinejoin="round" />
        <path d="M320 9.5 L324.5 14 L320 18.5 L315.5 14 Z" fill="#DFAC6D" />

        {/* Flanking lozenges and dots */}
        <path d="M296 14 L300 10 L304 14 L300 18 Z" fill="#DFAC6D" fillOpacity="0.8" />
        <path d="M336 14 L340 10 L344 14 L340 18 Z" fill="#DFAC6D" fillOpacity="0.8" />
        <circle cx="282" cy="14" r="1.6" fill="#DFAC6D" fillOpacity="0.7" />
        <circle cx="358" cy="14" r="1.6" fill="#DFAC6D" fillOpacity="0.7" />
      </svg>
    </div>
  );
};
