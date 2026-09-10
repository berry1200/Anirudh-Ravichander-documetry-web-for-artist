import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { ThrowableDeck } from './components/ThrowableDeck';
import { RosterAndDates } from './components/RosterAndDates';
import { CloseSection } from './components/CloseSection';

export default function App() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (motionQuery.matches) {
      document.documentElement.classList.add('motion-permitted');
    } else {
      document.documentElement.classList.add('reduced-motion');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('motion-permitted');
        document.documentElement.classList.remove('reduced-motion');
      } else {
        document.documentElement.classList.add('reduced-motion');
        document.documentElement.classList.remove('motion-permitted');
      }
    };

    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C0E] text-[#EDE7DC] font-sans selection:bg-[#E8913C] selection:text-[#0A0C0E]">
      {/* 1. Navigation */}
      <Navigation onNavigate={handleNavigate} />

      <main>
        {/* 2. Portal Hero */}
        <PortalHero />

        {/* 3. Statement Fold */}
        <StatementFold />

        {/* 4. Releases with Throwable Deck */}
        <ThrowableDeck />

        {/* 5. Roster and Dates */}
        <RosterAndDates />
      </main>

      {/* 6. Close Section */}
      <CloseSection />
    </div>
  );
}
