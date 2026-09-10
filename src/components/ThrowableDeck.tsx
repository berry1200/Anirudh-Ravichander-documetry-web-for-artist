import React, { useState, useRef, useCallback } from 'react';
import { RELEASES, LATEST_10_SONGS } from '../data/catalogue';
import { Release, LatestSong } from '../types';
import { ArrowLeft, ArrowRight, Disc, Eye, X, RotateCw, Music2, Sparkles, Radio, ExternalLink } from 'lucide-react';

export const ThrowableDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [throwDirection, setThrowDirection] = useState<1 | -1>(1);
  const [inspectingRelease, setInspectingRelease] = useState<Release | null>(null);
  const [isSleeveFlipped, setIsSleeveFlipped] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<'latest' | 'curated'>('latest');
  const [activePreviewTrack, setActivePreviewTrack] = useState<string | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const currentRelease = RELEASES[currentIndex];

  const triggerThrow = useCallback(
    (direction: 1 | -1) => {
      if (isThrowing) return;
      setIsThrowing(true);
      setThrowDirection(direction);
      setIsSleeveFlipped(false); // Reset flip on new card

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RELEASES.length);
        setIsThrowing(false);
        setDragOffset({ x: 0, y: 0 });
      }, 290);
    },
    [isThrowing]
  );

  const prevCard = useCallback(() => {
    if (isThrowing) return;
    setIsSleeveFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + RELEASES.length) % RELEASES.length);
  }, [isThrowing]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      triggerThrow(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prevCard();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      setIsSleeveFlipped((f) => !f);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setInspectingRelease(currentRelease);
    }
  };

  // Pointer drag mechanics
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isThrowing) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if unsupported
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isThrowing) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.25;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isThrowing) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    setIsDragging(false);

    const deckWidth = deckRef.current?.offsetWidth || 380;
    const throwThreshold = deckWidth * 0.12;

    if (Math.abs(dragOffset.x) > throwThreshold) {
      triggerThrow(dragOffset.x > 0 ? 1 : -1);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <section
      id="releases"
      className="relative w-full min-h-screen bg-[#0A0C0E] border-b border-[rgba(237,231,220,0.13)] py-24 sm:py-28 px-4 sm:px-8 lg:px-16 flex flex-col justify-center overflow-hidden"
      aria-label="Catalogue Releases and Latest Songs"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-5 border-b border-[rgba(237,231,220,0.13)]">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#9EA5A8]">
                ARCHIVAL DISCOGRAPHY &bull; PHYSICAL &amp; LATEST RELEASES
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#EDE7DC] tracking-[-0.03em] flex items-center gap-3">
              <span className="chrome-text">The Master Sleeves</span>
              <span className="text-[12px] font-mono font-normal uppercase tracking-[0.14em] text-[#E8913C] border border-[#E8913C]/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
                180g Chrome
              </span>
            </h2>
          </div>
          <p className="text-[12px] font-mono text-[#6C7378] mt-3 md:mt-0 uppercase tracking-[0.12em]">
            DUAL-SIDED MASTER CUT &bull; 10 LATEST TRACKS
          </p>
        </div>

        {/* Main Grid: Left Side (Latest 10 Tracks & Specs) | Right Side (Throwable Sleeve Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Interactive Tabbed Reference Panel */}
          <div className="lg:col-span-6 flex flex-col">
            {/* View Selector Tabs */}
            <div className="flex items-center space-x-2 p-1 bg-[#101317] border border-[rgba(237,231,220,0.14)] rounded-full w-fit mb-6">
              <button
                type="button"
                id="tab-latest-10"
                onClick={() => setActiveSideTab('latest')}
                className={`px-4 py-1.5 rounded-full text-[10.5px] uppercase tracking-[0.14em] font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  activeSideTab === 'latest'
                    ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold shadow-sm'
                    : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>TOP 10 LATEST ORIGINAL HITS</span>
              </button>

              <button
                type="button"
                id="tab-curated-sleeve"
                onClick={() => setActiveSideTab('curated')}
                className={`px-4 py-1.5 rounded-full text-[10.5px] uppercase tracking-[0.14em] font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  activeSideTab === 'curated'
                    ? 'bg-[#E8913C] text-[#0A0C0E] font-semibold shadow-sm'
                    : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
                }`}
              >
                <Disc className="w-3 h-3" />
                <span>SLEEVE TRACKLIST</span>
              </button>
            </div>

            {/* TAB CONTENT 1: THE LATEST #10 SONGS (Original Blockbusters) */}
            {activeSideTab === 'latest' ? (
              <div
                id="latest-10-songs-panel"
                className="bg-[#101317]/80 border border-[rgba(237,231,220,0.16)] rounded-sm p-5 sm:p-6 backdrop-blur-sm chrome-card-sheen"
              >
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[rgba(237,231,220,0.12)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#E8913C]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#EDE7DC] font-semibold">
                      10 ORIGINAL CHARTBUSTERS &bull; CERTIFIED HITS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9EA5A8] uppercase tracking-[0.1em]">
                    ANIRUDH OFFICIAL &bull; SPOTIFY NO. 1
                  </span>
                </div>

                <p className="text-[12.5px] text-[#9EA5A8] leading-relaxed mb-4">
                  The ten most recent and globally celebrated original compositions by Anirudh Ravichander spanning <em>Devara: Part 1</em>, <em>Vettaiyan</em>, <em>Coolie</em>, <em>Love Insurance Kompany</em>, <em>Jailer</em>, <em>Leo</em>, and <em>Jawan</em>:
                </p>

                {/* 10 Songs List */}
                <div className="divide-y divide-[rgba(237,231,220,0.08)] max-h-[360px] overflow-y-auto pr-1">
                  {LATEST_10_SONGS.map((song) => {
                    const isSelected = activePreviewTrack === song.title;
                    return (
                      <div
                        key={song.rank}
                        id={`latest-track-${song.rank}`}
                        onClick={() => {
                          setActivePreviewTrack(isSelected ? null : song.title);
                        }}
                        className={`py-2.5 flex items-center justify-between group cursor-pointer px-2.5 rounded transition-colors ${
                          isSelected ? 'bg-[#E8913C]/10 border border-[#E8913C]/30' : 'hover:bg-[#0A0C0E]/70'
                        }`}
                      >
                        <div className="flex items-center space-x-3 truncate mr-2">
                          <span className={`font-mono text-[11px] w-5 text-right font-medium ${isSelected ? 'text-[#E8913C]' : 'text-[#6C7378]'}`}>
                            #{song.rank}
                          </span>
                          <div className="truncate">
                            <span className={`text-[13px] font-display font-medium block truncate ${isSelected ? 'text-[#FFF]' : 'text-[#EDE7DC] group-hover:text-[#FFF]'}`}>
                              {song.title}
                            </span>
                            <span className="text-[11px] text-[#6C7378] block">
                              From <span className="text-[#9EA5A8]">{song.movie}</span> ({song.year}) &bull; {song.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="font-mono text-[11px] text-[#6C7378]">
                            {song.duration}
                          </span>
                          <a
                            href={`https://music.youtube.com/search?q=${encodeURIComponent(song.title + ' ' + song.movie + ' Anirudh')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Search & stream on YouTube Music"
                            className="px-2 py-0.5 rounded-full border border-[#FF0000]/40 bg-[#FF0000]/10 text-[#FF4E4E] hover:bg-[#FF0000] hover:text-white transition-colors text-[9.5px] font-mono uppercase tracking-wider flex items-center space-x-1"
                          >
                            <span>YT MUSIC</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(237,231,220,0.12)] flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono text-[#6C7378]">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
                    <span className="text-[#EDE7DC]">STREAM ON MUSIC.YOUTUBE.COM</span>
                  </div>
                  <a
                    href="https://music.youtube.com/search?q=Anirudh+Ravichander"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF4E4E] hover:underline flex items-center space-x-1"
                  >
                    <span>EXPLORE ANIRUDH ON YT MUSIC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              /* TAB CONTENT 2: ACTIVE SLEEVE DETAILS & DUAL-SIDED TRACKLIST */
              <div
                id="curated-sleeve-panel"
                className="bg-[#101317]/80 border border-[rgba(237,231,220,0.16)] rounded-sm p-5 sm:p-6 backdrop-blur-sm chrome-card-sheen"
              >
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[rgba(237,231,220,0.12)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#2E6B72]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#EDE7DC] font-semibold">
                      {currentRelease.code} &bull; {currentRelease.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9EA5A8] uppercase tracking-[0.1em]">
                    {currentRelease.year}
                  </span>
                </div>

                <p className="text-[12.5px] text-[#9EA5A8] leading-relaxed mb-4">
                  {currentRelease.description}
                </p>

                {/* Side A & Side B Split Overview */}
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#E8913C] block mb-1.5 font-semibold">
                      SIDE A &bull; CINEMATIC BLOCKBUSTERS &amp; MASS ANTHEMS
                    </span>
                    <div className="divide-y divide-[rgba(237,231,220,0.06)] bg-[#0A0C0E]/50 rounded p-2 border border-[rgba(237,231,220,0.08)]">
                      {currentRelease.tracks
                        .filter((t) => t.side === 'A')
                        .map((t, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between text-[12px]">
                            <div className="truncate mr-2">
                              <span className="text-[#EDE7DC] font-medium block truncate">{t.title}</span>
                              {t.movie && <span className="text-[10.5px] text-[#6C7378]">{t.movie} &bull; {t.genre}</span>}
                            </div>
                            <span className="font-mono text-[11px] text-[#6C7378] shrink-0">{t.duration}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#2E6B72] block mb-1.5 font-semibold">
                      SIDE B &bull; SOULFUL MELODIES &amp; SYNTH FUSIONS
                    </span>
                    <div className="divide-y divide-[rgba(237,231,220,0.06)] bg-[#0A0C0E]/50 rounded p-2 border border-[rgba(237,231,220,0.08)]">
                      {currentRelease.tracks
                        .filter((t) => t.side === 'B')
                        .map((t, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between text-[12px]">
                            <div className="truncate mr-2">
                              <span className="text-[#EDE7DC] font-medium block truncate">{t.title}</span>
                              {t.movie && <span className="text-[10.5px] text-[#6C7378]">{t.movie} &bull; {t.genre}</span>}
                            </div>
                            <span className="font-mono text-[11px] text-[#6C7378] shrink-0">{t.duration}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons Below Reference Panel */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="inspect-sleeve-btn"
                onClick={() => setInspectingRelease(currentRelease)}
                className="inline-flex items-center space-x-2 rounded-full border border-[rgba(237,231,220,0.3)] hover:border-[#E8913C] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#EDE7DC] hover:text-[#E8913C] transition-all duration-200 cursor-pointer bg-[#101317]"
              >
                <Eye className="w-3.5 h-3.5 text-[#E8913C]" />
                <span>INSPECT MATRIX &amp; DEAD-WAX</span>
              </button>

              <button
                type="button"
                id="flip-sleeve-btn"
                onClick={() => setIsSleeveFlipped(!isSleeveFlipped)}
                className="inline-flex items-center space-x-2 rounded-full border border-[rgba(237,231,220,0.2)] hover:border-[#2E6B72] px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#9EA5A8] hover:text-[#EDE7DC] transition-all duration-200 cursor-pointer bg-[#101317]"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#2E6B72]" />
                <span>{isSleeveFlipped ? 'SHOW FRONT ARTWORK' : 'FLIP SLEEVE (BACK)'}</span>
              </button>

              <a
                href="https://open.spotify.com/artist/4zCH9qm4R2DADamUHMCcr0"
                target="_blank"
                rel="noopener noreferrer"
                id="stream-spotify-btn"
                className="inline-flex items-center space-x-2 rounded-full border border-[rgba(237,231,220,0.2)] hover:border-[#1DB954] px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#9EA5A8] hover:text-[#EDE7DC] transition-all duration-200 cursor-pointer bg-[#101317]"
              >
                <Music2 className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>STREAM ON SPOTIFY</span>
                <ExternalLink className="w-3 h-3 text-[#6C7378]" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Physical Throwable Sleeve Deck (as shown in reference image) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* The Square Physical Sleeve Stack Container */}
            <div
              ref={deckRef}
              id="physical-sleeve-deck"
              tabIndex={0}
              role="region"
              aria-label="Physical throwable vinyl sleeve deck. Use arrow keys or drag to toss sleeves."
              onKeyDown={handleKeyDown}
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square select-none focus:outline-none focus:ring-1 focus:ring-[#E8913C]/40 rounded-sm cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'pan-y' }}
            >
              {/* Stacked Cards rendered from bottom to top */}
              {[3, 2, 1, 0].map((stackOffset) => {
                const cardIndex = (currentIndex + stackOffset) % RELEASES.length;
                const card = RELEASES[cardIndex];
                const isTop = stackOffset === 0;

                // Physical stacking transform calculations
                let translateX = 0;
                let translateY = 0;
                let rotate = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 30 - stackOffset * 8;

                if (!isTop) {
                  if (stackOffset === 1) {
                    translateX = 14;
                    translateY = 12;
                    rotate = 2.8;
                    scale = 0.95;
                    opacity = 0.9;
                  } else if (stackOffset === 2) {
                    translateX = -12;
                    translateY = 22;
                    rotate = -2.2;
                    scale = 0.91;
                    opacity = 0.72;
                  } else {
                    translateX = 8;
                    translateY = 32;
                    rotate = 1.4;
                    scale = 0.86;
                    opacity = 0.45;
                  }
                } else {
                  // Active top card
                  if (isThrowing) {
                    translateX = throwDirection * 580;
                    translateY = -35;
                    rotate = throwDirection * 34;
                    scale = 1.05;
                    opacity = 0;
                  } else if (isDragging) {
                    translateX = dragOffset.x;
                    translateY = dragOffset.y;
                    rotate = dragOffset.x * 0.065;
                    scale = 1.025;
                  }
                }

                return (
                  <div
                    key={card.id}
                    id={`sleeve-card-${card.code.toLowerCase()}`}
                    onPointerDown={isTop ? handlePointerDown : undefined}
                    onPointerMove={isTop ? handlePointerMove : undefined}
                    onPointerUp={isTop ? handlePointerUp : undefined}
                    onPointerCancel={isTop ? handlePointerUp : undefined}
                    className={`absolute inset-0 w-full h-full rounded-sm bg-[#101317] border border-[rgba(237,231,220,0.18)] overflow-hidden flex flex-col justify-between p-5 sm:p-6 ${
                      isTop ? 'deck-shadow-top chrome-card-sheen' : 'deck-shadow'
                    }`}
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                      transformOrigin: 'center bottom',
                      transition: isTop && isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.28s ease',
                      opacity,
                      zIndex,
                    }}
                  >
                    {/* Top Spine Bar of Sleeve */}
                    <div className="flex items-center justify-between border-b border-[rgba(237,231,220,0.14)] pb-3 z-10">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[#EDE7DC] font-semibold">
                          {card.code}
                        </span>
                        <span className="text-[rgba(237,231,220,0.3)]">&bull;</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#9EA5A8]">
                          {card.rpm}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            card.accentColor === 'amber' ? 'bg-[#E8913C]' : 'bg-[#2E6B72]'
                          }`}
                        />
                        <span className="text-[10px] font-mono text-[#6C7378]">
                          {card.year}
                        </span>
                      </div>
                    </div>

                    {/* Sleeve Center: Either Front Artwork OR Back Tracklist if Flipped */}
                    {isTop && isSleeveFlipped ? (
                      /* BACK COVER TRACKLIST VIEW */
                      <div className="relative my-3 flex-1 rounded overflow-hidden border border-[rgba(237,231,220,0.12)] bg-[#0A0C0E] p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-[rgba(237,231,220,0.1)] pb-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#E8913C]">
                              SIDE A: MASS
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#2E6B72]">
                              SIDE B: MELODY
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-[11px]">
                            {card.tracks.slice(0, 6).map((t, i) => (
                              <div key={i} className="flex justify-between items-center text-[#EDE7DC]">
                                <span className="truncate mr-2">
                                  <span className="text-[#E8913C] font-mono mr-1.5">{t.side}{i + 1}.</span>
                                  {t.title}
                                </span>
                                <span className="font-mono text-[10px] text-[#6C7378]">{t.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[rgba(237,231,220,0.1)] text-center">
                          <span className="text-[9px] font-mono text-[#6C7378] uppercase tracking-[0.12em]">
                            LATHE CUT RUNOUT: {card.runoutEtch}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* FRONT COVER ARTWORK VIEW (Matching User's Reference Image) */
                      <div className="relative my-3 flex-1 rounded overflow-hidden border border-[rgba(237,231,220,0.15)] bg-[#0A0C0E]">
                        <img
                          src={card.coverImage}
                          alt={`${card.title} cover`}
                          className="w-full h-full object-cover object-center filter contrast-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Dark gradient overlay for typography readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E]/95 via-[#0A0C0E]/30 to-transparent pointer-events-none" />

                        {/* Title and Artist etched into lower third */}
                        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex flex-col">
                          <span className="font-display font-bold text-[18px] sm:text-[21px] text-[#EDE7DC] leading-tight drop-shadow-sm">
                            {card.title}
                          </span>
                          <span className="text-[12px] text-[#9EA5A8] tracking-[0.06em] mt-0.5">
                            {card.artist}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Specifications Bar of Sleeve */}
                    <div className="pt-2.5 border-t border-[rgba(237,231,220,0.12)] flex items-center justify-between text-[9.5px] font-mono text-[#6C7378]">
                      <span className="truncate max-w-[200px]">{card.edition}</span>
                      <span className="text-[#EDE7DC] font-medium">{card.tracks.length} CUTS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drag & Toss Hint (Matching Reference Image) */}
            <div className="mt-8 flex flex-col items-center space-y-4 text-center">
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#6C7378] select-none">
                DRAG SLEEVE OR PRESS &larr; / &rarr; TO TOSS
              </p>

              {/* Progress Dots / Sleeve Switcher */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={prevCard}
                  aria-label="Previous sleeve"
                  className="p-1 text-[#9EA5A8] hover:text-[#EDE7DC] transition-colors cursor-pointer mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                {RELEASES.map((r, idx) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-label={`Jump to ${r.title}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsSleeveFlipped(false);
                    }}
                    className={`transition-all duration-200 cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 h-1.5 rounded-full bg-[#E8913C]'
                        : 'w-1.5 h-1.5 rounded-full bg-[rgba(237,231,220,0.25)] hover:bg-[#EDE7DC]'
                    }`}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => triggerThrow(1)}
                  aria-label="Next sleeve"
                  className="p-1 text-[#9EA5A8] hover:text-[#EDE7DC] transition-colors cursor-pointer ml-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleeve Inspection Sheet / Dialog */}
      {inspectingRelease && (
        <div
          id="sleeve-inspection-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0C0E]/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-2xl bg-[#101317] border border-[rgba(237,231,220,0.2)] rounded-sm p-6 sm:p-8 deck-shadow chrome-card-sheen max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setInspectingRelease(null)}
              aria-label="Close sleeve inspection"
              className="absolute top-5 right-5 text-[#9EA5A8] hover:text-[#EDE7DC] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8913C]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9EA5A8]">
                ARCHIVAL SPECIFICATION SHEET &bull; {inspectingRelease.code}
              </span>
            </div>

            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#EDE7DC]">
              {inspectingRelease.title}
            </h3>
            <p className="text-[#9EA5A8] text-sm mt-1 mb-4">
              By <span className="text-[#EDE7DC] font-medium">{inspectingRelease.artist}</span> ({inspectingRelease.year})
            </p>

            <p className="text-[#9EA5A8] text-[13px] leading-relaxed mb-6 border-l border-[rgba(237,231,220,0.14)] pl-3">
              {inspectingRelease.description}
            </p>

            {/* Runout groove inscription */}
            <div className="mb-6 p-3 bg-[#0A0C0E] border border-[rgba(237,231,220,0.12)] rounded text-xs">
              <span className="font-mono text-[10px] text-[#6C7378] block uppercase tracking-[0.12em]">
                DEAD-WAX RUNOUT GROOVE ETCHING:
              </span>
              <span className="font-mono text-[#EDE7DC] mt-1 block">
                {inspectingRelease.runoutEtch}
              </span>
            </div>

            {/* Dual-Sided Tracklist */}
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#E8913C] block mb-2 font-semibold">
                  SIDE A: CINEMATIC BLOCKBUSTERS &amp; MASS ANTHEMS
                </span>
                <div className="divide-y divide-[rgba(237,231,220,0.08)] bg-[#0A0C0E]/60 rounded p-3 border border-[rgba(237,231,220,0.1)]">
                  {inspectingRelease.tracks
                    .filter((t) => t.side === 'A')
                    .map((t, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-[13px]">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-[10px] text-[#E8913C]">A{idx + 1}</span>
                          <div>
                            <span className="text-[#EDE7DC] font-medium">{t.title}</span>
                            {t.movie && <span className="text-[#6C7378] text-[11px] block">From {t.movie} &bull; {t.genre}</span>}
                          </div>
                        </div>
                        <span className="font-mono text-[12px] text-[#6C7378]">{t.duration}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#2E6B72] block mb-2 font-semibold">
                  SIDE B: SOULFUL MELODIES &amp; SYNTH FUSIONS
                </span>
                <div className="divide-y divide-[rgba(237,231,220,0.08)] bg-[#0A0C0E]/60 rounded p-3 border border-[rgba(237,231,220,0.1)]">
                  {inspectingRelease.tracks
                    .filter((t) => t.side === 'B')
                    .map((t, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-[13px]">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-[10px] text-[#2E6B72]">B{idx + 1}</span>
                          <div>
                            <span className="text-[#EDE7DC] font-medium">{t.title}</span>
                            {t.movie && <span className="text-[#6C7378] text-[11px] block">From {t.movie} &bull; {t.genre}</span>}
                          </div>
                        </div>
                        <span className="font-mono text-[12px] text-[#6C7378]">{t.duration}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center pt-4 border-t border-[rgba(237,231,220,0.14)]">
              <span className="font-mono text-[11px] text-[#6C7378]">
                {inspectingRelease.format}
              </span>
              <button
                type="button"
                onClick={() => setInspectingRelease(null)}
                className="rounded-full border border-[rgba(237,231,220,0.25)] hover:border-[#E8913C] px-4 py-1.5 text-[10.5px] uppercase tracking-[0.12em] text-[#EDE7DC] hover:text-[#E8913C] cursor-pointer"
              >
                CLOSE SPECIFICATION
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
