import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  BEST_OF_ANIRUDH_IMG,
  ANIRUDH_LIVE_1_IMG,
  ANIRUDH_LIVE_2_IMG,
  ANIRUDH_PORTRAIT_IMG,
  VINYL_TEXTURE_IMAGE,
} from '../data/catalogue';
import { Sparkles, Disc3, ShieldCheck } from 'lucide-react';

export const PortalHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStageLook, setActiveStageLook] = useState<'auto' | 'bestof' | 'live1' | 'live2'>('auto');

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
  // 1. Title scale from 1 to 1.38, letter spacing tightening from 0.02em to -0.035em
  const titleScale = 1 + progress * 0.38;
  const letterSpacing = 0.02 - progress * 0.055; // tightening
  const halfSpanTranslatePercent = progress * 48; // roughly half span width outward

  // 2. Background image settles from 1.15 overscale down to 1.0
  const imageScale = 1.15 - progress * 0.15;

  // 3. Stage image cross-fade: live1 into live2
  const live2Opacity = activeStageLook === 'live2' ? 1 : activeStageLook === 'live1' ? 0 : Math.max(0, Math.min(1, (progress - 0.45) / 0.4));

  // 4. Center showcase sleeve emergence (starts at progress 0.15, fully visible 0.35-0.85)
  const showcaseOpacity = Math.max(0, Math.min(1, (progress - 0.1) / 0.25));
  const showcaseScale = 0.7 + Math.min(progress, 0.75) * 0.4;
  const vinylSlideOut = Math.max(0, Math.min(42, (progress - 0.32) * 110)); // vinyl disc slides out to the right
  const vinylRotation = progress * 720; // 2 full revolutions over the scroll

  // 5. Duotone overlay raises from 0 to 0.28 opacity
  const duotoneOpacity = progress * 0.28;

  // 6. Solid parting panels translate outward past their width
  const panelTranslate = progress * 103;

  // 7. Center accent dots travel toward opposite corners
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
        
        {/* LAYER 1: Dynamic Concert Stage Backgrounds */}
        <div
          id="hero-bleed-image"
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Base Live Stage 1 (Anirudh with mic in concert) */}
          <img
            src={activeStageLook === 'bestof' ? BEST_OF_ANIRUDH_IMG : ANIRUDH_LIVE_1_IMG}
            alt="Anirudh Ravichander live on stage"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Cross-fade Live Stage 2 (Anirudh concert energy) */}
          {activeStageLook !== 'bestof' && (
            <img
              src={ANIRUDH_LIVE_2_IMG}
              alt="Anirudh Ravichander live concert stadium energy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 filter brightness-95 contrast-110"
              style={{ opacity: live2Opacity }}
              referrerPolicy="no-referrer"
              loading="eager"
            />
          )}
        </div>

        {/* LAYER 2: Atmospheric concert stage gradient lighting */}
        <div
          id="hero-duotone-wash"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(232,145,60,0.22) 0%, rgba(46,107,114,0.18) 50%, rgba(10,12,14,0.7) 100%)',
            mixBlendMode: 'screen',
            opacity: Math.max(0.2, duotoneOpacity),
          }}
        />

        {/* LAYER 3: Radial veil darkening the outer perimeter */}
        <div
          id="hero-radial-veil"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,12,14,0.1) 25%, rgba(10,12,14,0.65) 65%, #0A0C0E 98%)',
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

        {/* LAYER 5: Accent dots traveling to opposite corners */}
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

        {/* LAYER 5.5: THE PORTAL EMERGENCE SHOWCASE (Reference images brought to life on scroll) */}
        <div
          id="hero-scroll-showcase"
          className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none"
          style={{
            opacity: showcaseOpacity,
            transform: `scale(${showcaseScale}) translateY(${(1 - progress) * 20}px)`,
          }}
        >
          {/* Physical 3D Vinyl Gatefold Sleeve + Sliding Disc */}
          <div className="relative flex items-center justify-center pointer-events-auto group cursor-pointer max-w-[320px] sm:max-w-[400px] md:max-w-[460px] aspect-square w-full mx-4">
            
            {/* The Vinyl Disc sliding out from behind the sleeve */}
            <div
              id="hero-sliding-disc"
              className="absolute w-[88%] aspect-square rounded-full shadow-2xl transition-transform duration-75 flex items-center justify-center overflow-hidden"
              style={{
                transform: `translateX(${vinylSlideOut}%) rotate(${vinylRotation}deg)`,
                background: 'radial-gradient(circle at 35% 35%, #2a2e33 0%, #15181b 40%, #0c0e10 70%, #000 100%)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.85), inset 0 0 0 2px rgba(237,231,220,0.15)',
              }}
            >
              {/* Concentric Vinyl Grooves */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen bg-cover bg-center rounded-full pointer-events-none"
                style={{ backgroundImage: `url(${VINYL_TEXTURE_IMAGE})` }}
              />
              <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
              
              {/* Center Record Label with Anirudh's Portrait */}
              <div className="relative w-[34%] aspect-square rounded-full border-2 border-[#E8913C]/60 overflow-hidden shadow-inner flex items-center justify-center bg-[#0A0C0E]">
                <img
                  src={ANIRUDH_PORTRAIT_IMG}
                  alt="Anirudh Ravichander Spindle Label"
                  className="w-full h-full object-cover filter contrast-125"
                  referrerPolicy="no-referrer"
                />
                {/* Spindle hole */}
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.4)] shadow-inner" />
              </div>
            </div>

            {/* The Front Physical Sleeve: "Best of Anirudh Ravichander" */}
            <div
              id="hero-front-sleeve"
              className="relative w-full aspect-square bg-[#101317] rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border border-[rgba(237,231,220,0.22)] overflow-hidden isolate transition-transform duration-300 group-hover:scale-[1.02]"
            >
              {/* Reference Image: Best of Anirudh Ravichander Sony Music Cover */}
              <img
                src={BEST_OF_ANIRUDH_IMG}
                alt="Best of Anirudh Ravichander Official Cover"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Sleeve Sheen and Metallic Foil Stamp */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
              
              {/* Holographic Archival Foil Badge */}
              <div className="absolute top-3 left-3 bg-[#0A0C0E]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[rgba(237,231,220,0.25)] flex items-center space-x-1.5 pointer-events-none">
                <ShieldCheck className="w-3 h-3 text-[#E8913C]" />
                <span className="text-[9px] font-mono tracking-[0.18em] text-[#EDE7DC] uppercase font-semibold">
                  OFFICIAL SONY MASTER
                </span>
              </div>

              {/* Bottom Spine Indicator */}
              <div className="absolute bottom-3 inset-x-3 bg-[#0A0C0E]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[rgba(237,231,220,0.18)] flex items-center justify-between text-[9px] font-mono text-[#9EA5A8] pointer-events-none">
                <span className="text-[#EDE7DC] font-medium">BEST OF ANIRUDH</span>
                <span className="text-[#E8913C]">180G CHROME PRESS</span>
              </div>
            </div>

          </div>
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
              className="inline-block will-change-transform bg-gradient-to-b from-[#FFF] via-[#EDE7DC] to-[#9EA5A8] bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                transform: `translateX(-${halfSpanTranslatePercent}%)`,
              }}
            >
              ANI
            </span>

            {/* Second span: travels right, sits seamlessly against ANI when progress is 0 */}
            <span
              id="hero-wordmark-part-right"
              className="inline-block will-change-transform bg-gradient-to-b from-[#FFF] via-[#EDE7DC] to-[#9EA5A8] bg-clip-text text-transparent drop-shadow-2xl"
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

        {/* LAYER 7: Stage Angle Quick Selector (Interactive Look Controls) */}
        <div
          id="stage-look-switcher"
          className="absolute top-20 sm:top-24 inset-x-0 z-35 flex justify-center pointer-events-auto px-4"
          style={{
            opacity: progress > 0.25 ? 1 : Math.max(0, (progress - 0.1) * 6),
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="inline-flex items-center space-x-1.5 p-1 rounded-full border border-[rgba(237,231,220,0.18)] bg-[#0A0C0E]/85 backdrop-blur-md shadow-2xl">
            <button
              type="button"
              id="look-auto"
              onClick={() => setActiveStageLook('auto')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                activeStageLook === 'auto'
                  ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold'
                  : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
              }`}
            >
              SCROLL MOTION
            </button>
            <button
              type="button"
              id="look-bestof"
              onClick={() => setActiveStageLook('bestof')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                activeStageLook === 'bestof'
                  ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold'
                  : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
              }`}
            >
              BEST OF ARTWORK
            </button>
            <button
              type="button"
              id="look-live1"
              onClick={() => setActiveStageLook('live1')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                activeStageLook === 'live1'
                  ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold'
                  : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
              }`}
            >
              LIVE PERFORMANCE 1
            </button>
            <button
              type="button"
              id="look-live2"
              onClick={() => setActiveStageLook('live2')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                activeStageLook === 'live2'
                  ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold'
                  : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
              }`}
            >
              LIVE PERFORMANCE 2
            </button>
          </div>
        </div>

        {/* LAYER 8: Corner metadata pins to top and bottom edges - positioned properly below navbar */}
        {/* Top-Left Metadata */}
        <div
          id="hero-meta-top-left"
          className="absolute top-20 sm:top-24 left-6 sm:left-10 z-30 hidden lg:flex flex-col space-y-1 pointer-events-none"
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
          className="absolute top-20 sm:top-24 right-6 sm:right-10 z-30 hidden lg:flex flex-col items-end space-y-1 pointer-events-none"
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

