import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../context/BrandContext';

const INTRO_SESSION_KEY = 'alqerwiah_intro_seen';

export const CinematicIntro = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== '1';
    } catch {
      return false;
    }
  });

  const dismiss = () => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const duration = prefersReduced ? 900 : 3200;
    const timer = window.setTimeout(dismiss, duration);
    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#640018] text-[#FFF7EB] px-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="AL QERWIAH Intro"
        >
          {/* Organic banana-fiber strand sweeping across intro */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full opacity-35"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M -60 470 C 210 260, 440 580, 660 340 C 850 130, 1020 420, 1260 220"
              stroke="#FEDEA3"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: prefersReduced ? 0.4 : 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.path
              d="M -40 500 C 230 300, 470 610, 690 365 C 880 165, 1040 450, 1250 255"
              stroke="#DFAC6D"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{
                duration: prefersReduced ? 0.4 : 2.4,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>

          {/* Center Brand Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.94, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0.3 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#FEDEA3] mb-4"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              EGYPTIAN HERITAGE CRAFT
            </motion.p>

            <h1
              className="text-4xl sm:text-6xl font-semibold text-[#FFF7EB] tracking-tight"
              style={{ fontFamily: '"Noto Kufi Arabic", "Playfair Display", serif' }}
            >
              القروية
            </h1>

            <p
              className="mt-2 text-lg sm:text-2xl tracking-[0.22em] text-[#DFAC6D]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              AL QERWIAH
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto my-6 h-px w-28 bg-[#DFAC6D]/60 origin-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-sm sm:text-base text-[#FFF7EB]/85 leading-relaxed"
            >
              {t.intro.subtitle}
            </motion.p>
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="relative z-10 mt-10 px-4 py-2 text-xs text-[#FEDEA3]/80 hover:text-[#FFF7EB] border border-[#FEDEA3]/30 hover:border-[#FEDEA3]/70 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.intro.skip}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
