import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: '10 LATEST TRACKS', href: '#releases' },
    { label: 'VINYL SLEEVES', href: '#releases' },
    { label: 'MANIFESTO', href: '#statement' },
    { label: 'COLLABORATORS', href: '#roster' },
    { label: 'TOUR DATES', href: '#dates' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] border-b border-[rgba(237,231,220,0.13)] transition-colors duration-300 ${
        scrolled ? 'bg-[#0A0C0E]/90 shadow-lg' : 'bg-[#0A0C0E]/75'
      } backdrop-blur-[16px]`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Display Header */}
        <a
          href="#"
          id="nav-brand-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-[15px] sm:text-[16px] tracking-[-0.02em] text-[#EDE7DC] group-hover:text-[#FFF] transition-colors">
                ANIRUDH RAVICHANDER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] transition-transform duration-200 group-hover:scale-125" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#9EA5A8]">
              ARCHIVE &bull; XV TOUR
            </span>
          </div>
        </a>

        {/* Desktop navigation links */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[10.5px] uppercase tracking-[0.14em] font-mono text-[#9EA5A8] hover:text-[#E8913C] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="#releases"
            id="nav-pill-button"
            onClick={(e) => handleClick(e, '#releases')}
            className="hidden sm:inline-flex items-center rounded-full border border-[rgba(237,231,220,0.22)] px-4 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#EDE7DC] hover:border-[#E8913C] hover:text-[#E8913C] transition-colors duration-200 cursor-pointer bg-[#101317]/50"
          >
            ORDER VINYL
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#EDE7DC] p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span
                className={`h-[1.5px] w-full bg-[#EDE7DC] transition-transform duration-200 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-[#EDE7DC] transition-opacity duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-[#EDE7DC] transition-transform duration-200 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="lg:hidden bg-[#0A0C0E]/98 border-b border-[rgba(237,231,220,0.15)] backdrop-blur-[16px] px-6 py-5 flex flex-col space-y-3.5"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[11.5px] uppercase tracking-[0.14em] font-mono text-[#EDE7DC] hover:text-[#E8913C] transition-colors py-1.5 border-b border-[rgba(237,231,220,0.06)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#releases"
            id="mobile-pill-button"
            onClick={(e) => handleClick(e, '#releases')}
            className="inline-flex w-fit items-center rounded-full border border-[rgba(237,231,220,0.25)] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] mt-2"
          >
            ORDER VINYL
          </a>
        </div>
      )}
    </header>
  );
};
