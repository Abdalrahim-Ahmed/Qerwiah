import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { BRAND_IMAGES } from '../../data/seedData';

const REEL_FRAMES = [
  { src: BRAND_IMAGES.videoPoster, objectPos: 'center center' },
  { src: BRAND_IMAGES.bananaFibers, objectPos: 'center center' },
  { src: BRAND_IMAGES.artisanHands, objectPos: 'center center' },
  { src: BRAND_IMAGES.toteSignature, objectPos: 'center center' },
];

export const CinematicVideoSection = () => {
  const { t, settings } = useBrand();
  const prefersReduced = useReducedMotion();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);

  // Reset availability check whenever videoSrc changes in Dashboard
  useEffect(() => {
    setVideoUnavailable(false);
    setIsPlaying(false);
    setReelIndex(0);
  }, [settings.videoSrc]);

  // Fallback animated 2:3 heritage documentary reel if local MP4 asset is not yet placed
  useEffect(() => {
    if (!isPlaying || !videoUnavailable) return;
    const interval = window.setInterval(() => {
      setReelIndex((prev) => (prev + 1) % REEL_FRAMES.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [isPlaying, videoUnavailable]);

  const togglePlay = async () => {
    if (videoUnavailable) {
      setIsPlaying((prev) => !prev);
      return;
    }

    const el = videoRef.current;
    if (!el) {
      setVideoUnavailable(true);
      setIsPlaying(true);
      return;
    }

    if (el.paused) {
      try {
        await el.play();
        setIsPlaying(true);
      } catch {
        // If local MP4 asset isn't present or codec fails, transition gracefully to editorial reel
        setVideoUnavailable(true);
        setIsPlaying(true);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const activeChapter =
    t.videoSection.chapters[reelIndex % t.videoSection.chapters.length];

  return (
    <section
      aria-labelledby="heritage-video-heading"
      className="relative z-10 py-20 sm:py-28 bg-transparent"
    >
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Landscape Editorial Video Frame */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex justify-center"
          >
            <div className="relative w-full p-2.5 sm:p-3.5 rounded-[1.5rem] border border-[#DFAC6D]/60 bg-[#FFF7EB] shadow-xl">
              {/* Subtle Golden Banana-Fiber Frame Accent */}
              <svg
                className="pointer-events-none absolute -top-4 -start-4 w-24 h-24 text-[#DFAC6D]/80"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 10 80 C 12 36, 36 12, 84 10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M 22 86 C 24 48, 46 24, 90 22"
                  stroke="#FEDEA3"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>

              {/* 16:9 Landscape Video Viewport */}
              <div className="relative w-full aspect-video rounded-[1.1rem] overflow-hidden bg-[#2A0E14]">
                {!videoUnavailable ? (
                  <video
                    ref={videoRef}
                    src={settings.videoSrc}
                    poster={settings.videoPoster}
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    loop
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setVideoUnavailable(true)}
                    className="w-full h-full object-cover"
                    aria-label={t.videoSection.title}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={reelIndex}
                        src={
                          isPlaying
                            ? REEL_FRAMES[reelIndex].src
                            : settings.videoPoster
                        }
                        alt={t.videoSection.title}
                        referrerPolicy="no-referrer"
                        initial={{ opacity: 0.35, scale: prefersReduced ? 1 : 1.04 }}
                        animate={{
                          opacity: 1,
                          scale: isPlaying && !prefersReduced ? 1.08 : 1,
                        }}
                        exit={{ opacity: 0.25 }}
                        transition={{
                          opacity: { duration: 0.7 },
                          scale: { duration: 3.8, ease: 'easeOut' },
                        }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    {isPlaying && (
                      <div className="absolute inset-x-0 top-0 p-5 bg-gradient-to-b from-[#2A0E14]/70 to-transparent">
                        <p className="text-xs text-[#FEDEA3] tracking-wide">
                          {activeChapter}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Subtle Poster Gradient Scrim */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2A0E14]/65 via-transparent to-[#2A0E14]/15"
                  aria-hidden="true"
                />

                {/* Center Play Overlay Before Playback */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={t.videoSection.playLabel}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FEDEA3]"
                  >
                    <span className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#640018]/90 text-[#FEDEA3] border border-[#FEDEA3]/55 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <Play className="w-7 h-7 fill-current translate-x-0.5" aria-hidden="true" />
                    </span>
                  </button>
                )}

                {/* Accessible Bottom Controls Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? t.videoSection.pauseLabel : t.videoSection.playLabel}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#640018]/90 hover:bg-[#640018] text-[#FFF7EB] border border-[#FEDEA3]/35 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
                        <span>{t.videoSection.pauseLabel}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
                        <span>{t.videoSection.playLabel}</span>
                      </>
                    )}
                  </button>

                  {!videoUnavailable && (
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? t.videoSection.unmuteLabel : t.videoSection.muteLabel}
                      className="w-9 h-9 rounded-full bg-[#2A0E14]/65 hover:bg-[#640018] text-[#FFF7EB] border border-[#FFF7EB]/25 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Text Column */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-xs sm:text-sm font-medium text-[#8A8861]">
              {t.videoSection.kicker}
            </p>
            <h2
              id="heritage-video-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#640018] leading-snug text-balance"
            >
              {t.videoSection.title}
            </h2>

            <div className="my-6 h-px w-20 bg-[#DFAC6D]" />

            <p className="text-base sm:text-lg text-[#2A0E14]/82 leading-relaxed max-w-lg">
              {t.videoSection.description}
            </p>

            {/* Poetic Craft Chapters */}
            <ol className="mt-8 space-y-3 text-sm text-[#2A0E14]/80 border-t border-[#640018]/10 pt-6 max-w-lg">
              {t.videoSection.chapters.map((chapter, idx) => (
                <li key={chapter} className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold text-[#8A8861] tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{chapter}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
