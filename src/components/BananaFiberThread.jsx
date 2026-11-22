import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** The strand stays hidden until the visitor has scrolled this far (px). */
const REVEAL_AFTER_SCROLL = 48;

/**
 * Global organic banana-fiber strand (the brand's wavy decorative line).
 *
 * Mounted ONCE in App.jsx inside <main>, so every page shares the same component:
 *  - hidden when a page first loads (and again whenever the visitor is back at the top);
 *  - fades in with a soft rise as soon as the visitor starts scrolling;
 *  - then draws itself along the page with GSAP ScrollTrigger (stroke-dashoffset scrub).
 *
 * It spans its positioned parent (<main>), sits behind all page content
 * (negative z-index inside <main>'s stacking context) and ignores pointer events,
 * so it never overlaps text or blocks scrolling.
 */
export const BananaFiberThread = () => {
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const mainPathRef = useRef(null);
  const secondaryPathRef = useRef(null);
  const mobilePathRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // Reveal only once the visitor starts scrolling.
  useEffect(() => {
    const update = () => setRevealed(window.scrollY > REVEAL_AFTER_SCROLL);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Scroll-scrubbed drawing along the height of the current page.
  useEffect(() => {
    const container = rootRef.current?.parentElement;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paths = [mainPathRef.current, secondaryPathRef.current, mobilePathRef.current].filter(
      Boolean
    );

    if (paths.length === 0) return;

    if (prefersReduced) {
      paths.forEach((p) => {
        p.style.strokeDasharray = 'none';
        p.style.strokeDashoffset = '0';
      });
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((path, idx) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 15%',
            end: 'bottom 88%',
            scrub: idx === 1 ? 1.45 : 1.05,
            invalidateOnRefresh: true,
          },
        });
      });
    }, container);

    // Pages have different heights (and images load late): re-measure when <main> resizes.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
      data-testid="banana-fiber-thread"
      data-revealed={revealed}
    >
      <div
        className={`h-full w-full transition-[opacity,translate] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:translate-y-0 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Desktop & Tablet Organic S-Curve Banana Fiber Strand */}
        <svg
          className="hidden md:block w-full h-full opacity-75"
          viewBox="0 0 1440 5200"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Primary continuous organic wave swinging left to right across sections */}
          <path
            ref={mainPathRef}
            d="M 1080 0
               C 1290 360, 1240 690, 760 880
               C 240 1085, 110 1370, 380 1690
               C 660 2020, 1260 2120, 1210 2510
               C 1160 2890, 290 2960, 220 3370
               C 150 3780, 1090 3920, 1160 4290
               C 1220 4610, 610 4790, 390 5080"
            stroke="#DFAC6D"
            strokeOpacity="0.72"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Delicate companion fiber filament weaving in gentle counterpoint */}
          <path
            ref={secondaryPathRef}
            d="M 1055 0
               C 1240 410, 1160 730, 710 925
               C 210 1135, 165 1420, 425 1730
               C 710 2060, 1210 2180, 1150 2550
               C 1090 2930, 340 3010, 275 3410
               C 205 3810, 1030 3970, 1110 4325
               C 1180 4640, 650 4820, 445 5090"
            stroke="#DFAC6D"
            strokeOpacity="0.42"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Mobile Narrower & Softer Organic Banana Fiber Strand */}
        <svg
          className="block md:hidden w-full h-full opacity-60"
          viewBox="0 0 390 5200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            ref={mobilePathRef}
            d="M 310 0
               C 365 380, 330 680, 185 940
               C 55 1175, 45 1510, 195 1820
               C 340 2120, 355 2470, 195 2780
               C 55 3050, 60 3420, 220 3740
               C 355 4010, 330 4380, 175 4690
               C 95 4850, 120 4990, 195 5120"
            stroke="#DFAC6D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
