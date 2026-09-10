import React, { useState } from 'react';
import { ARTISTS, TOUR_DATES } from '../data/catalogue';
import { ArrowUpRight, Ticket } from 'lucide-react';

export const RosterAndDates: React.FC = () => {
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  return (
    <section
      id="roster"
      className="relative w-full bg-[#0A0C0E] border-b border-[rgba(237,231,220,0.13)] py-28 px-6 sm:px-12 lg:px-20"
      aria-label="Collaborators and XV Tour Dates"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* ================= SECTION A: COLLABORATORS ROSTER ================= */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[rgba(237,231,220,0.13)]">
            <div>
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
                <span className="text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8]">
                  CORE SOUND COLLABORATORS
                </span>
              </div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#EDE7DC] tracking-[-0.025em]">
                Artist Collaborators
              </h2>
            </div>
            <p className="text-[12px] font-mono text-[#6C7378] mt-3 sm:mt-0 uppercase tracking-[0.12em]">
              FEATURING ICONIC VOCALISTS &bull; LIVE CONCERT GUESTS
            </p>
          </div>

          {/* Hairline-ruled rows carrying a small uppercase accent label, a display-face name and a right-aligned count */}
          <div className="divide-y divide-[rgba(237,231,220,0.13)] border-t border-[rgba(237,231,220,0.13)]">
            {ARTISTS.map((artist, index) => {
              const isSelected = selectedArtistId === artist.id;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={artist.id}
                  id={`roster-row-${artist.id}`}
                  onClick={() => setSelectedArtistId(isSelected ? null : artist.id)}
                  className="group py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-[#101317]/60 px-2 sm:px-4 -mx-2 sm:-mx-4"
                >
                  {/* Left: Small uppercase accent label + Display name */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 mb-2 sm:mb-0">
                    <span
                      className={`text-[10.5px] font-mono uppercase tracking-[0.15em] transition-colors duration-200 ${
                        isEven ? 'text-[#E8913C]' : 'text-[#2E6B72]'
                      }`}
                    >
                      [{artist.code}]
                    </span>
                    <span className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-[#EDE7DC] tracking-[-0.02em] group-hover:text-[#EDE7DC] mt-1 sm:mt-0 transition-transform duration-200 group-hover:translate-x-1 inline-block">
                      {artist.name}
                    </span>
                  </div>

                  {/* Discipline description and Right-aligned count */}
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-8">
                    <span className="text-[12px] text-[#6C7378] tracking-[0.04em] hidden md:inline-block">
                      {artist.discipline}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[12px] text-[#9EA5A8] tracking-[0.1em]">
                        {artist.releasesCount.toString().padStart(2, '0')} TRACKS
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#6C7378] group-hover:text-[#E8913C] transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION B: DATES TABLE (XV WORLD TOUR) ================= */}
        <div id="dates">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[rgba(237,231,220,0.13)]">
            <div>
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span className="text-[10.5px] uppercase tracking-[0.15em] text-[#9EA5A8]">
                  XV WORLD TOUR &bull; LIVE ARENAS &amp; STADIUMS
                </span>
              </div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#EDE7DC] tracking-[-0.025em]">
                Tour Dates
              </h2>
            </div>
            <p className="text-[12px] font-mono text-[#6C7378] mt-3 sm:mt-0 uppercase tracking-[0.12em]">
              NORTH AMERICA &bull; EUROPE &bull; ASIA &bull; 2025–2026
            </p>
          </div>

          {/* Table Container */}
          <div className="w-full border-t border-[rgba(237,231,220,0.13)]">
            {/* Desktop Table Header */}
            <div className="hidden md:grid md:grid-cols-12 py-3.5 border-b border-[rgba(237,231,220,0.13)] text-[10.5px] font-mono uppercase tracking-[0.15em] text-[#6C7378]">
              <div className="col-span-2">DATE</div>
              <div className="col-span-3">HEADLINER</div>
              <div className="col-span-3">VENUE / CITY</div>
              <div className="col-span-3">PROGRAM / PRODUCTION</div>
              <div className="col-span-1 text-right">STATUS</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[rgba(237,231,220,0.13)]">
              {TOUR_DATES.map((item) => (
                <div
                  key={item.id}
                  id={`tour-row-${item.id}`}
                  className="py-5 sm:py-6 transition-colors hover:bg-[#101317]/50"
                >
                  {/* Desktop View */}
                  <div className="hidden md:grid md:grid-cols-12 items-center text-[13.5px]">
                    <div className="col-span-2 font-display font-semibold text-[17px] text-[#EDE7DC] tracking-[-0.02em]">
                      {item.date}
                    </div>
                    <div className="col-span-3 text-[#EDE7DC] font-medium">
                      {item.artist}
                    </div>
                    <div className="col-span-3 text-[#9EA5A8]">
                      {item.venue} <span className="text-[#6C7378]">• {item.city}</span>
                    </div>
                    <div className="col-span-3 text-[#9EA5A8] text-[12.5px] truncate pr-4">
                      {item.program}
                    </div>
                    <div className="col-span-1 text-right">
                      <span
                        className={`font-mono text-[10.5px] uppercase tracking-[0.12em] inline-flex items-center gap-1 ${
                          item.status === 'TICKETS'
                            ? 'text-[#E8913C]'
                            : item.status === 'LIMITED'
                            ? 'text-[#EDE7DC]'
                            : item.status === 'SOLD OUT'
                            ? 'text-[#6C7378]'
                            : 'text-[#2E6B72]'
                        }`}
                      >
                        {item.status === 'TICKETS' && <Ticket className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="grid grid-cols-2 gap-4 md:hidden">
                    <div>
                      <div className="font-display font-semibold text-lg text-[#EDE7DC] tracking-[-0.02em]">
                        {item.date}
                      </div>
                      <div className="text-[13px] text-[#EDE7DC] font-medium mt-1">
                        {item.artist}
                      </div>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.12em] mt-2 inline-block ${
                          item.status === 'TICKETS'
                            ? 'text-[#E8913C]'
                            : item.status === 'LIMITED'
                            ? 'text-[#EDE7DC]'
                            : item.status === 'SOLD OUT'
                            ? 'text-[#6C7378]'
                            : 'text-[#2E6B72]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-[12.5px] text-[#9EA5A8]">
                        {item.venue}
                      </div>
                      <div className="text-[11px] text-[#6C7378]">
                        {item.city}
                      </div>
                      <div className="text-[11.5px] text-[#6C7378] mt-2 line-clamp-2">
                        {item.program}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
