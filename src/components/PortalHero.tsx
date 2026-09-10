import React, { useRef, useState, useEffect, useCallback } from 'react';
import { HERO_IMAGE } from '../data/catalogue';

export const PortalHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  const updateScrollProgress = useCallback(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) return;

    // How far the top of the section has scrolled past the top of the viewport
    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    setProgress(clampedProgress);
  }, [reducedMotion]);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // Derived styling values strictly bound to scroll position
  // 1. Title scale from 1 to 1.42, letter spacing tightening from 0.02em to -0.035em
  const titleScale = 1 + progress * 0.42;
  const letterSpacing = 0.02 - progress * 0.055; // tightening
  const halfSpanTranslatePercent = progress * 48; // roughly half span width outward

  // 2. Background image settles from 1.18 overscale down to 1.0
  const imageScale = 1.18 - progress * 0.18;

  // 3. Duotone overlay raises from 0 to 0.32 opacity
  const duotoneOpacity = progress * 0.32;

  // 4. Solid parting panels translate outward past their width
  const panelTranslate = progress * 103;

  // 5. Center accent dots travel toward opposite corners
  const amberDotX = -progress * 44; // vw
  const amberDotY = -progress * 40; // vh
  const tealDotX = progress * 44; // vw
  const tealDotY = progress * 40; // vh

  return (
    <section
      ref={sectionRef}
      id="portal-hero"
      className="relative h-[250vh] w-full bg-[#0A0C0E]"
      aria-label="Monolith Portal Hero"
    >
      {/* Sticky full-height stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate select-none">
        {/* LAYER 1: Full-bleed image starting overscaled and settling */}
        <div
          id="hero-bleed-image"
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="Monolith Studio Acoustic Lacquer Mastering Console"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </div>

        {/* LAYER 2: Duotone wash blending amber (#E8913C) and teal (#2E6B72) at mix-blend-mode overlay */}
        <div
          id="hero-duotone-wash"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #2E6B72 0%, #E8913C 100%)',
            mixBlendMode: 'overlay',
            opacity: duotoneOpacity,
          }}
        />

        {/* LAYER 3: Radial veil darkening the edges */}
        <div
          id="hero-radial-veil"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,12,14,0) 30%, rgba(10,12,14,0.65) 70%, #0A0C0E 96%)',
          }}
        />

        {/* LAYER 4: TWO solid panels each a little over half the width, meeting in center and parting outward */}
        {/* Left solid panel */}
        <div
          id="hero-panel-left"
          className="absolute top-0 bottom-0 left-0 w-[50.5vw] bg-[#0A0C0E] will-change-transform z-10"
          style={{
            transform: `translateX(-${panelTranslate}%)`,
          }}
        />

        {/* Right solid panel */}
        <div
          id="hero-panel-right"
          className="absolute top-0 bottom-0 right-0 w-[50.5vw] bg-[#0A0C0E] will-change-transform z-10"
          style={{
            transform: `translateX(${panelTranslate}%)`,
          }}
        />

        {/* LAYER 5: Two accent dots traveling to opposite corners */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          {/* Amber dot traveling to top-left */}
          <div
            id="hero-accent-dot-amber"
            className="w-2 h-2 rounded-full bg-[#E8913C] will-change-transform absolute"
            style={{
              transform: `translate(${amberDotX}vw, ${amberDotY}vh)`,
            }}
          />

          {/* Teal dot traveling to bottom-right */}
          <div
            id="hero-accent-dot-teal"
            className="w-2 h-2 rounded-full bg-[#2E6B72] will-change-transform absolute"
            style={{
              transform: `translate(${tealDotX}vw, ${tealDotY}vh)`,
            }}
          />
        </div>

        {/* LAYER 6: Wordmark on top, split into two spans, growing while tracking tightens and halves separate */}
        <div
          id="hero-wordmark-container"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
        >
          {/* Top Artist Super-Header */}
          <div
            className="flex items-center space-x-2.5 mb-3 sm:mb-4 will-change-transform"
            style={{
              opacity: Math.max(0, 1 - progress * 2.2),
              transform: `translateY(${progress * -20}px)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-pulse" />
            <span className="text-[11px] sm:text-[13px] font-mono tracking-[0.25em] text-[#E8913C] uppercase font-semibold">
              ANIRUDH RAVICHANDER
            </span>
          </div>

          <div
            className="font-display font-black text-[#EDE7DC] flex items-center justify-center whitespace-nowrap will-change-transform"
            style={{
              fontSize: 'clamp(44px, 13vw, 172px)',
              lineHeight: 0.9,
              letterSpacing: `${letterSpacing}em`,
              transform: `scale(${titleScale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* First span: travels left */}
            <span
              id="hero-wordmark-part-left"
              className="inline-block will-change-transform bg-gradient-to-b from-[#FFF] via-[#EDE7DC] to-[#9EA5A8] bg-clip-text text-transparent"
              style={{
                transform: `translateX(-${halfSpanTranslatePercent}%)`,
              }}
            >
              ANI
            </span>

            {/* Second span: travels right, sits seamlessly against ANI when progress is 0 */}
            <span
              id="hero-wordmark-part-right"
              className="inline-block will-change-transform bg-gradient-to-b from-[#FFF] via-[#EDE7DC] to-[#9EA5A8] bg-clip-text text-transparent"
              style={{
                transform: `translateX(${halfSpanTranslatePercent}%)`,
              }}
            >
              RUDH
            </span>
          </div>

          {/* Subtitle badge centered below wordmark */}
          <div
            id="hero-wordmark-subtitle"
            className="mt-6 sm:mt-8 will-change-transform"
            style={{
              opacity: Math.max(0, 1 - progress * 2.2),
              transform: `translateY(${progress * -30}px)`,
            }}
          >
            <div className="flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[rgba(237,231,220,0.18)] bg-[#0A0C0E]/75 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#EDE7DC]">
                ROCKSTAR ARCHIVAL VINYL &bull; XV WORLD TOUR
              </span>
              <span className="text-[9px] font-mono text-[#2E6B72] uppercase tracking-[0.15em] border-l border-[rgba(237,231,220,0.15)] pl-2.5 hidden sm:inline-block">
                EST. 2011
              </span>
            </div>
          </div>
        </div>

        {/* LAYER 7: Corner metadata pins to top and bottom edges - positioned properly below navbar */}
        {/* Top-Left Metadata */}
        <div
          id="hero-meta-top-left"
          className="absolute top-20 sm:top-24 left-6 sm:left-10 z-30 hidden sm:flex flex-col space-y-1 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#9EA5A8]">
            [ ARTIST ARCHIVE / 2026 ]
          </span>
          <span className="text-[11px] font-sans tracking-[0.08em] text-[#EDE7DC]">
            ANIRUDH RAVICHANDER &bull; MASTER DISCOGRAPHY
          </span>
        </div>

        {/* Top-Right Metadata */}
        <div
          id="hero-meta-top-right"
          className="absolute top-20 sm:top-24 right-6 sm:right-10 z-30 hidden sm:flex flex-col items-end space-y-1 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#E8913C]">
            XV NORTH AMERICA &amp; WORLD TOUR
          </span>
          <span className="text-[11px] font-sans tracking-[0.08em] text-[#EDE7DC]">
            25,000,000+ MONTHLY LISTENERS
          </span>
        </div>

        {/* Bottom-Left Metadata / Scroll Prompt */}
        <div
          id="hero-meta-bottom-left"
          className="absolute bottom-8 left-6 sm:left-10 z-30 flex items-center space-x-3 pointer-events-none"
        >
          <div className="w-[1px] h-7 bg-[rgba(237,231,220,0.2)] relative overflow-hidden">
            <div
              className="w-full h-full bg-[#E8913C] transition-transform duration-75"
              style={{ transform: `translateY(${progress * 100 - 100}%)` }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
              {progress > 0.85 ? 'STAGE UNCOVERED' : 'SCROLL TO ENTER PORTAL'}
            </span>
            <span className="text-[9.5px] font-mono text-[#6C7378]">
              LATHE CUT {(progress * 100).toFixed(0).padStart(3, '0')}%
            </span>
          </div>
        </div>

        {/* Bottom-Right Metadata */}
        <div
          id="hero-meta-bottom-right"
          className="absolute bottom-8 right-6 sm:right-10 z-30 flex flex-col items-end space-y-1 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#9EA5A8]">
            180G DUAL-SIDED COLLECTOR CUT
          </span>
          <span className="text-[11px] font-sans tracking-[0.08em] text-[#EDE7DC]">
            SIDE A: MASS &bull; SIDE B: MELODY
          </span>
        </div>
      </div>
    </section>
  );
};
