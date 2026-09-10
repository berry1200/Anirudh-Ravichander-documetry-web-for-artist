import React, { useState, useMemo } from 'react';
import { SUNG_BY_ANIRUDH, YOUTUBE_MUSIC_ARTIST_URL } from '../data/catalogue';
import { SungSong } from '../types';
import {
  Play,
  ExternalLink,
  Search,
  Music,
  Radio,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Disc3,
  Minimize2,
  Maximize2
} from 'lucide-react';

export const YouTubeMusicSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePlayingSong, setActivePlayingSong] = useState<SungSong | null>(null);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter songs based on search query and category
  const filteredSongs = useMemo(() => {
    return SUNG_BY_ANIRUDH.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.singers.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.lyricsHighlight.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'All') return matchesSearch;
      return matchesSearch && song.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { label: 'All Songs', value: 'All', count: SUNG_BY_ANIRUDH.length },
    { label: 'Latest (2024)', value: 'Latest', count: SUNG_BY_ANIRUDH.filter((s) => s.category === 'Latest').length },
    { label: 'Mass Anthems', value: 'Mass', count: SUNG_BY_ANIRUDH.filter((s) => s.category === 'Mass').length },
    { label: 'Romance & Melody', value: 'Romance', count: SUNG_BY_ANIRUDH.filter((s) => s.category === 'Romance').length },
    { label: 'Dance & Kuthu', value: 'Dance', count: SUNG_BY_ANIRUDH.filter((s) => s.category === 'Dance').length },
    { label: 'Viral Classics', value: 'Classics', count: SUNG_BY_ANIRUDH.filter((s) => s.category === 'Classics').length },
  ];

  const handleOpenSearchInYouTubeMusic = () => {
    const query = searchQuery.trim() ? `${searchQuery} Anirudh Ravichander` : 'Anirudh Ravichander';
    const url = `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNextSong = () => {
    if (!activePlayingSong) return;
    const currentIndex = filteredSongs.findIndex((s) => s.id === activePlayingSong.id);
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setActivePlayingSong(filteredSongs[nextIndex]);
  };

  const handlePrevSong = () => {
    if (!activePlayingSong) return;
    const currentIndex = filteredSongs.findIndex((s) => s.id === activePlayingSong.id);
    const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setActivePlayingSong(filteredSongs[prevIndex]);
  };

  return (
    <section
      id="youtube-music"
      className="py-24 sm:py-32 px-4 sm:px-8 border-t border-[rgba(237,231,220,0.12)] bg-[#07090B] relative isolate overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#FF0000]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#E8913C]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[rgba(237,231,220,0.14)] gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#FF0000]/30 bg-[#FF0000]/10 text-[#FF4E4E] text-[10px] font-mono uppercase tracking-[0.16em] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
              <span>MUSIC.YOUTUBE.COM &bull; VOCAL DISCOGRAPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#EDE7DC]">
              SONGS SUNG BY <span className="text-[#FF4E4E]">ANIRUDH</span>
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-[#9EA5A8] leading-relaxed">
              Explore the unmistakable high-octane voice that defined Indian cinema anthems. Stream directly on{' '}
              <span className="text-[#EDE7DC] font-medium">YouTube Music</span> or play the verified master tracks right here on the web.
            </p>
          </div>

          {/* YouTube Music Direct Link CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={YOUTUBE_MUSIC_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="yt-music-artist-portal-btn"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 shadow-lg shadow-[#FF0000]/20 hover:scale-[1.02] cursor-pointer"
            >
              <Radio className="w-4 h-4 text-white" />
              <span>OPEN ON YOUTUBE MUSIC</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              type="button"
              id="yt-view-mode-toggle"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-[rgba(237,231,220,0.2)] bg-[#101317] hover:border-[#EDE7DC] text-[#EDE7DC] font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer"
            >
              <span>{viewMode === 'grid' ? 'LIST VIEW' : 'GRID VIEW'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Search & Filter Toolbar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C7378]" />
            <input
              type="text"
              id="yt-music-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs sung by Anirudh (Hukum, Naa Ready, Fear Song, Chaleya...)"
              className="w-full bg-[#101317] border border-[rgba(237,231,220,0.18)] focus:border-[#FF4E4E] focus:outline-none rounded-full py-2.5 pl-11 pr-28 text-[13px] text-[#EDE7DC] placeholder-[#6C7378] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 top-1/2 -translate-y-1/2 text-[#6C7378] hover:text-[#EDE7DC] text-xs p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              id="yt-search-external-trigger"
              onClick={handleOpenSearchInYouTubeMusic}
              title="Search this query on music.youtube.com"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000] text-[#FF4E4E] hover:text-white text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
            >
              SEARCH YT
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                id={`filter-cat-${cat.value.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#EDE7DC] text-[#0A0C0E] font-bold shadow-md'
                    : 'bg-[#101317] text-[#9EA5A8] border border-[rgba(237,231,220,0.12)] hover:border-[rgba(237,231,220,0.3)] hover:text-[#EDE7DC]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Songs Count & Active Status */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#6C7378] border-b border-[rgba(237,231,220,0.08)] pb-3">
          <div className="flex items-center space-x-2">
            <Music className="w-3.5 h-3.5 text-[#FF4E4E]" />
            <span>SHOWING {filteredSongs.length} SONGS VOCALIZED BY ANIRUDH</span>
          </div>
          <span className="hidden sm:inline text-[#E8913C]">TAP &apos;PLAY ON WEB&apos; FOR INSTANT IN-APP AUDITION</span>
        </div>

        {/* Songs Layout: GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSongs.map((song, index) => {
              const isPlaying = activePlayingSong?.id === song.id;
              return (
                <div
                  key={song.id}
                  id={`song-card-${song.id}`}
                  className={`group relative rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between bg-[#101317] ${
                    isPlaying
                      ? 'border-[#FF4E4E] shadow-[0_0_30px_rgba(255,0,0,0.25)] ring-1 ring-[#FF4E4E]'
                      : 'border-[rgba(237,231,220,0.12)] hover:border-[rgba(237,231,220,0.35)] hover:shadow-xl'
                  }`}
                >
                  {/* Card Media Preview Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0A0C0E]">
                    <img
                      src={song.thumbnail}
                      alt={`${song.title} thumbnail`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101317] via-black/30 to-transparent" />

                    {/* Movie Pill */}
                    <div className="absolute top-2.5 left-2.5 bg-[#0A0C0E]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[rgba(237,231,220,0.18)] flex items-center space-x-1.5">
                      <span className="text-[9.5px] font-mono text-[#EDE7DC] font-semibold uppercase">
                        {song.movie} &bull; {song.year}
                      </span>
                    </div>

                    {/* Duration / Stream Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-[#0A0C0E]/85 backdrop-blur-md px-2 py-1 rounded border border-[rgba(237,231,220,0.18)] text-[9.5px] font-mono text-[#E8913C]">
                      {song.duration}
                    </div>

                    {/* Center Hover Play Button */}
                    <button
                      type="button"
                      id={`play-overlay-${song.id}`}
                      onClick={() => {
                        setActivePlayingSong(song);
                        setIsPlayerMinimized(false);
                      }}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 shadow-2xl transition-all duration-200 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rank & Genre */}
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                        <span className="text-[#FF4E4E] font-bold">#{index + 1} SUNG HIT</span>
                        <span className="text-[#6C7378]">{song.genre}</span>
                      </div>

                      {/* Song Title */}
                      <h3 className="text-[17px] font-display font-bold text-[#EDE7DC] group-hover:text-white transition-colors line-clamp-1">
                        {song.title}
                      </h3>

                      {/* Singer Credits */}
                      <div className="mt-1.5 inline-flex items-center space-x-1.5 text-[11.5px] text-[#9EA5A8]">
                        <span className="px-1.5 py-0.5 rounded bg-[#FF0000]/15 text-[#FF4E4E] font-mono text-[9.5px] uppercase font-semibold">
                          VOCALS
                        </span>
                        <span className="truncate">{song.singers}</span>
                      </div>

                      {/* Iconic Lyrics Highlight */}
                      <p className="mt-2.5 text-[11.5px] italic text-[#6C7378] line-clamp-2 leading-relaxed border-l-2 border-[#FF4E4E]/40 pl-2">
                        {song.lyricsHighlight}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-[rgba(237,231,220,0.1)] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        id={`btn-play-web-${song.id}`}
                        onClick={() => {
                          setActivePlayingSong(song);
                          setIsPlayerMinimized(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-[#EDE7DC] hover:bg-white text-[#0A0C0E] text-[11px] font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isPlaying ? 'PLAYING NOW' : 'PLAY ON WEB'}</span>
                      </button>

                      <a
                        href={song.youtubeMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`btn-open-ytm-${song.id}`}
                        title="Listen on music.youtube.com"
                        className="inline-flex items-center justify-center space-x-1 py-2 px-3 rounded-lg border border-[#FF0000]/40 bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF4E4E] hover:text-white text-[11px] font-mono uppercase font-semibold tracking-wider transition-all duration-150 cursor-pointer"
                      >
                        <span>YT MUSIC</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Songs Layout: LIST VIEW */}
        {viewMode === 'list' && (
          <div className="mt-6 border border-[rgba(237,231,220,0.12)] rounded-xl overflow-hidden bg-[#101317]">
            <div className="divide-y divide-[rgba(237,231,220,0.08)]">
              {filteredSongs.map((song, index) => {
                const isPlaying = activePlayingSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    id={`song-row-${song.id}`}
                    className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#15191E] transition-colors ${
                      isPlaying ? 'bg-[#FF0000]/10 border-l-4 border-[#FF4E4E]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      {/* Thumbnail with direct play click */}
                      <div
                        onClick={() => {
                          setActivePlayingSong(song);
                          setIsPlayerMinimized(false);
                        }}
                        className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-black group cursor-pointer"
                      >
                        <img
                          src={song.thumbnail}
                          alt={song.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 fill-white text-white" />
                        </div>
                      </div>

                      {/* Song info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[11px] text-[#FF4E4E] font-bold">#{index + 1}</span>
                          <span className="text-[14px] sm:text-[15px] font-display font-bold text-[#EDE7DC] truncate">
                            {song.title}
                          </span>
                        </div>
                        <div className="text-[11.5px] text-[#9EA5A8] flex items-center space-x-2 truncate">
                          <span className="text-[#E8913C]">{song.movie} ({song.year})</span>
                          <span>&bull;</span>
                          <span className="truncate">Vocals: {song.singers}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between sm:justify-end space-x-3">
                      <div className="text-right hidden md:block">
                        <div className="text-[10.5px] font-mono text-[#EDE7DC]">{song.streams}</div>
                        <div className="text-[10px] font-mono text-[#6C7378]">{song.genre} &bull; {song.duration}</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          id={`btn-row-play-${song.id}`}
                          onClick={() => {
                            setActivePlayingSong(song);
                            setIsPlayerMinimized(false);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#EDE7DC] hover:bg-white text-[#0A0C0E] text-[10.5px] font-mono uppercase font-bold transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>PLAY</span>
                        </button>

                        <a
                          href={song.youtubeMusicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`btn-row-ytm-${song.id}`}
                          className="px-3 py-1.5 rounded-full border border-[#FF0000]/40 bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF4E4E] hover:text-white text-[10.5px] font-mono uppercase font-medium transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <span>YT MUSIC</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredSongs.length === 0 && (
          <div className="mt-8 p-12 text-center rounded-xl border border-[rgba(237,231,220,0.1)] bg-[#101317]">
            <Radio className="w-10 h-10 text-[#6C7378] mx-auto mb-3" />
            <h4 className="text-lg font-display font-bold text-[#EDE7DC]">No songs matched your query</h4>
            <p className="mt-1 text-sm text-[#9EA5A8]">
              Try searching for &quot;Hukum&quot;, &quot;Leo&quot;, &quot;Devara&quot;, &quot;Arabic Kuthu&quot;, or search directly on YouTube Music.
            </p>
            <button
              type="button"
              onClick={handleOpenSearchInYouTubeMusic}
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FF0000] text-white text-xs font-mono font-bold uppercase tracking-wider"
            >
              <span>SEARCH ON MUSIC.YOUTUBE.COM</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* YouTube Music Direct Search Banner at bottom */}
        <div className="mt-12 rounded-2xl border border-[rgba(237,231,220,0.14)] bg-gradient-to-r from-[#12161A] via-[#1A1215] to-[#12161A] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 flex items-center justify-center flex-shrink-0">
              <Radio className="w-6 h-6 text-[#FF4E4E]" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-[#EDE7DC]">
                Want to browse Anirudh&apos;s complete 700+ song catalogue?
              </h4>
              <p className="text-xs sm:text-sm text-[#9EA5A8]">
                Access official mixes, original sound tracks, singles, and live concert audio on YouTube Music.
              </p>
            </div>
          </div>

          <a
            href="https://music.youtube.com/search?q=Anirudh+Ravichander+Songs"
            target="_blank"
            rel="noopener noreferrer"
            id="banner-yt-search-all-btn"
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#E00000] text-white font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] transition-all duration-150 shadow-lg cursor-pointer flex-shrink-0"
          >
            <span>LAUNCH MUSIC.YOUTUBE.COM</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* DOCKED / FLOATING WEB YOUTUBE MUSIC PLAYER */}
      {activePlayingSong && (
        <div
          id="yt-docked-player"
          className={`fixed z-50 transition-all duration-300 ${
            isPlayerMinimized
              ? 'bottom-4 right-4 w-72 sm:w-80 rounded-xl shadow-2xl border border-[#FF4E4E]/50 bg-[#0A0C0E]/95 backdrop-blur-xl p-3'
              : 'bottom-4 right-4 left-4 sm:left-auto sm:w-[460px] md:w-[520px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-[#FF4E4E]/60 bg-[#0A0C0E]/95 backdrop-blur-2xl p-4'
          }`}
        >
          {/* Player Header */}
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[rgba(237,231,220,0.12)]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#FF4E4E] font-bold">
                NOW STREAMING &bull; YOUTUBE MUSIC
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                id="btn-minimize-player"
                onClick={() => setIsPlayerMinimized(!isPlayerMinimized)}
                className="p-1 text-[#9EA5A8] hover:text-[#EDE7DC] transition-colors rounded hover:bg-white/5 cursor-pointer"
                title={isPlayerMinimized ? 'Expand player' : 'Minimize player'}
              >
                {isPlayerMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                id="btn-close-player"
                onClick={() => setActivePlayingSong(null)}
                className="p-1 text-[#9EA5A8] hover:text-[#FF4E4E] transition-colors rounded hover:bg-white/5 cursor-pointer"
                title="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded YouTube Player View (Expanded mode) */}
          {!isPlayerMinimized && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black mb-3 border border-[rgba(237,231,220,0.15)] shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activePlayingSong.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activePlayingSong.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Track Info & Quick Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] sm:text-[14px] font-display font-bold text-[#EDE7DC] truncate">
                {activePlayingSong.title}
              </h4>
              <p className="text-[11px] text-[#9EA5A8] truncate">
                {activePlayingSong.movie} &bull; Vocals: {activePlayingSong.singers}
              </p>
            </div>

            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <button
                type="button"
                id="btn-prev-player"
                onClick={handlePrevSong}
                className="p-1.5 rounded-full border border-[rgba(237,231,220,0.2)] text-[#9EA5A8] hover:text-white hover:border-white transition-colors cursor-pointer"
                title="Previous track"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                id="btn-next-player"
                onClick={handleNextSong}
                className="p-1.5 rounded-full border border-[rgba(237,231,220,0.2)] text-[#9EA5A8] hover:text-white hover:border-white transition-colors cursor-pointer"
                title="Next track"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={activePlayingSong.youtubeMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-player-open-ytm"
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-[#FF0000] text-white font-mono text-[10px] font-bold uppercase transition-colors hover:bg-[#D00000] cursor-pointer"
                title="Open in YouTube Music app"
              >
                <span>OPEN YT</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
