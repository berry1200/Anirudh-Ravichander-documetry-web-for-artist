import React, { useEffect, useRef, useState } from 'react';
import { VINYL_TEXTURE_IMAGE, ANIRUDH_PORTRAIT_IMG } from '../data/catalogue';

export const StatementFold: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setScrollYOffset(window.innerHeight - rect.top);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Drift and rotation calculation for floating disc off right edge
  const rotationDeg = (scrollYOffset * 0.08) % 360;
  const driftY = (scrollYOffset * 0.06) - 40;

  return (
    <section
      ref={containerRef}
      id="statement"
      className="relative min-h-screen w-full bg-[#0A0C0E] border-b border-[rgba(237,231,220,0.13)] flex items-center overflow-hidden py-24 px-6 sm:px-12 md:px-20"
      aria-label="Philosophy Statement"
    >
      {/* Outlined index numeral using -webkit-text-stroke with a transparent fill */}
      <div
        id="statement-numeral"
        className="font-display font-black text-[clamp(120px,20vw,280px)] leading-none stroke-numeral select-none absolute left-6 md:left-16 top-8 md:top-12 opacity-25 pointer-events-none"
        aria-hidden="true"
      >
        01
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 flex flex-col items-start pt-16 md:pt-0">
          {/* Small uppercase label */}
          <div
            id="statement-label"
            className={`flex items-center space-x-2.5 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#9EA5A8]">
              MANIFESTO / ACOUSTIC CARVINGS
            </span>
          </div>

          {/* Statement at clamp(24px, 3.6vw, 52px) over about 22ch with one phrase in amber */}
          <h2
            id="statement-text"
            className={`font-display font-semibold text-[#EDE7DC] leading-[1.22] tracking-[-0.025em] transition-all duration-1000 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontSize: 'clamp(24px, 3.6vw, 52px)',
              maxWidth: '22ch',
            }}
          >
            We press raw stadium energy into physical lacquer for sound that{' '}
            <span className="text-[#E8913C] transition-colors duration-300">
              outlives fifty thousand voices.
            </span>
          </h2>

          <div
            className={`mt-10 flex flex-wrap gap-8 text-[#9EA5A8] text-[13px] leading-[1.65] max-w-xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="border-l border-[rgba(237,231,220,0.13)] pl-4">
              From the 2011 global viral spark to monumental cinematic scores across <em>Leo</em>, <em>Jawan</em>, <em>Jailer</em>, and the 2026 <em>DC</em> suites. Mastered directly to heavy 180g chrome vinyl with uncompressed dynamic headroom.
            </p>
          </div>
        </div>
      </div>

      {/* Circular image floating off the right edge at reduced opacity that drifts and rotates on scroll */}
      <div
        id="statement-floating-disc"
        className="absolute -right-24 sm:-right-28 md:-right-36 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[580px] md:h-[580px] rounded-full overflow-hidden border border-[rgba(237,231,220,0.16)] pointer-events-none opacity-30 sm:opacity-35 will-change-transform z-0"
        style={{
          transform: `translateY(calc(-50% + ${driftY}px)) rotate(${rotationDeg}deg)`,
        }}
      >
        <img
          src={VINYL_TEXTURE_IMAGE}
          alt="Concentric vinyl groove lathe cut"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Center label with Anirudh artist portrait */}
        <div className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#E8913C]/40 bg-[#0A0C0E] overflow-hidden shadow-inner flex items-center justify-center">
          <img
            src={ANIRUDH_PORTRAIT_IMG}
            alt="Anirudh Ravichander Spindle Center"
            className="w-full h-full object-cover filter contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute w-4 h-4 rounded-full border border-[rgba(237,231,220,0.5)] bg-[#0A0C0E] shadow-inner" />
        </div>
      </div>
    </section>
  );
};
