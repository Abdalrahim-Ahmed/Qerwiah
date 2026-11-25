import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useBrand } from '../context/BrandContext';
import { introConfig } from '../config/introConfig';
import logoArBeige from '../assets/logo/logo-arabic-beige.svg';
import './CinematicIntro.css';

const INTRO_SESSION_KEY = 'alqerwiah_intro_seen';

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch (error) {
    console.warn('Unable to read the Qerwiah intro session state.', error);
    return false;
  }
};

export const CinematicIntro = () => {
  const { t } = useBrand();
  const prefersReduced = useReducedMotion();
  const dismissedRef = useRef(false);
  const [visible, setVisible] = useState(() => !hasSeenIntro());
  const tagline = introConfig.showTagline && introConfig.tagline.trim()
    ? introConfig.tagline
    : null;

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;

    dismissedRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch (error) {
      console.warn('Unable to save the Qerwiah intro session state.', error);
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setTimeout(dismiss, prefersReduced ? 1100 : 3300);
    return () => window.clearTimeout(timer);
  }, [dismiss, prefersReduced, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: prefersReduced ? 0.1 : 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReduced ? 0.18 : 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="qerwiah-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Qerwiah brand introduction"
        >
          <svg
            className="qerwiah-intro__threads"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="qerwiah-intro__thread qerwiah-intro__thread--primary"
              pathLength="1"
              d="M-110 225 C90 145 185 190 288 342 S444 638 630 542 C812 448 826 305 1001 318 S1252 509 1550 240"
            />
            <path
              className="qerwiah-intro__thread qerwiah-intro__thread--gold"
              pathLength="1"
              d="M-115 704 C112 760 220 654 326 500 S470 225 648 351 C816 470 832 628 1010 584 S1270 278 1555 360"
            />
            <path
              className="qerwiah-intro__thread qerwiah-intro__thread--fine"
              pathLength="1"
              d="M-100 256 C164 292 211 578 416 565 S655 324 832 350 S1108 640 1540 688"
            />
          </svg>

          <motion.div
            className="qerwiah-intro__identity relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReduced ? 0.2 : 0.85,
              delay: prefersReduced ? 0 : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src={logoArBeige}
              alt="القروية"
              width={410}
              height={157}
              className="qerwiah-intro__logo"
              draggable={false}
            />
            {tagline && (
              <motion.p
                className="qerwiah-intro__tagline"
                dir="auto"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 7 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.2 : 0.7,
                  delay: prefersReduced ? 0 : 1.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {tagline}
              </motion.p>
            )}
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="qerwiah-intro__skip relative z-10"
          >
            {t.intro.skip}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
