import React, { useState } from 'react';
import { ArrowUpRight, Check, Disc3 } from 'lucide-react';

export const CloseSection: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  return (
    <footer
      id="close"
      className="relative w-full bg-[#0A0C0E] pt-28 overflow-hidden select-none"
      aria-label="Anirudh Archival Colophon and Tour Headquarters"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Top Split: Short headline & fine-print on one side, two buttons at opposite edge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-20 border-b border-[rgba(237,231,220,0.13)]">
          {/* Left Column: Short Headline & Fine-print Line */}
          <div className="max-w-xl">
            <div className="flex items-center space-x-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <span className="text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8]">
                ARCHIVAL MASTERS &bull; XV PRODUCTION
              </span>
            </div>

            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#EDE7DC] tracking-[-0.025em] leading-[1.15]">
              Stadium Frequencies <br />
              <span className="chrome-text">Carved Into Carbon.</span>
            </h2>

            <p className="mt-5 text-[13.5px] leading-[1.7] text-[#9EA5A8]">
              All limited editions pressed on 180-gram heavy chrome foil vinyl with bespoke lacquer cuts. Authorized directly by Anirudh Ravichander Archives and Maestro Productions for the XV World Tour.
            </p>
          </div>

          {/* Right Column: Two buttons at the opposite edge */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
            <button
              type="button"
              id="close-subscription-btn"
              onClick={() => setSubscribed(!subscribed)}
              className="inline-flex items-center space-x-2 rounded-full border border-[rgba(237,231,220,0.28)] hover:border-[#E8913C] px-6 py-3 text-[10.5px] uppercase tracking-[0.15em] text-[#EDE7DC] hover:text-[#E8913C] transition-all duration-200 cursor-pointer bg-[#101317]"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#E8913C]" />
                  <span>DISPATCH NOTIFICATION QUEUED</span>
                </>
              ) : (
                <>
                  <Disc3 className="w-3.5 h-3.5 text-[#E8913C]" />
                  <span>PRE-ORDER MASTERPIECE VINYL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button
              type="button"
              id="close-stockist-btn"
              onClick={() => setInquirySent(!inquirySent)}
              className="inline-flex items-center space-x-2 rounded-full border border-[rgba(237,231,220,0.18)] hover:border-[rgba(237,231,220,0.4)] px-6 py-3 text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8] hover:text-[#EDE7DC] transition-all duration-200 cursor-pointer bg-[#101317]"
            >
              {inquirySent ? (
                <span>DIRECT INQUIRY: XVTOUR@ANIRUDHMUSIC.COM</span>
              ) : (
                <span>TOUR &amp; ORCHESTRAL INQUIRIES</span>
              )}
            </button>
          </div>
        </div>

        {/* Hairline Footer Strip */}
        <div
          id="footer-metadata-strip"
          className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.12em] text-[#6C7378]"
        >
          <div className="flex items-center space-x-4">
            <span>&copy; 2026 ANIRUDH RAVICHANDER ARCHIVES</span>
            <span className="text-[rgba(237,231,220,0.2)]">&bull;</span>
            <span>XV NORTH AMERICA TOUR</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#9EA5A8]">CHENNAI &bull; LONDON &bull; TORONTO</span>
            <span className="text-[rgba(237,231,220,0.2)]">&bull;</span>
            <span>25M+ MONTHLY LISTENERS</span>
          </div>
        </div>
      </div>

      {/* Full-visibility Brand Display Wordmark with no cropping */}
      <div
        id="footer-brand-wordmark-wrapper"
        className="w-full select-none py-12 sm:py-16 px-4 flex flex-col items-center justify-center border-t border-[rgba(237,231,220,0.1)] bg-[#07080A]"
      >
        <div
          id="footer-brand-wordmark"
          className="font-display font-black text-[#EDE7DC] tracking-[-0.03em] leading-none whitespace-nowrap text-center chrome-text select-none drop-shadow-lg"
          style={{
            fontSize: 'clamp(42px, 12.5vw, 190px)',
          }}
        >
          ANIRUDH
        </div>
        <div className="flex items-center space-x-3 mt-4 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#9EA5A8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <span>ROCKSTAR ANIRUDH RAVICHANDER</span>
          <span className="text-[rgba(237,231,220,0.2)]">&bull;</span>
          <span className="text-[#2E6B72]">DIRECT-TO-DISC VINYL MASTERS</span>
        </div>
      </div>
    </footer>
  );
};
