import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { TheCrew } from './components/sections/TheCrew';
import { Transmissions } from './components/sections/Transmissions';
import { TuneTheSignal } from './components/sections/TuneTheSignal';
import { TokenSection } from './components/sections/TokenSection';
import { Roadmap } from './components/sections/Roadmap';
import { MediaKitSection } from './components/sections/MediaKitSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSimulatedLive, setIsSimulatedLive] = useState(() => {
    // Check URL query param e.g. ?status=live
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('status') === 'live';
    }
    return false;
  });

  // Scrollspy observer for active nav highlight
  useEffect(() => {
    const sectionIds = [
      'hero',
      'crew',
      'transmissions',
      'tuner',
      'token',
      'roadmap',
      'media-kit',
      'faq',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTuner = () => {
    const el = document.getElementById('tuner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTeaser = () => {
    const el = document.getElementById('transmissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-['Inter',sans-serif] selection:bg-cyan-500 selection:text-black">
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-amber-500 text-black font-bold font-mono text-xs rounded-lg shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Persistent Navigation */}
      <Navbar
        onTuneClick={handleScrollToTuner}
        activeSection={activeSection}
        isSimulatedLive={isSimulatedLive}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 1. HOME / ON AIR */}
        <Hero
          onWatchTeaser={handleScrollToTeaser}
          onTuneClick={handleScrollToTuner}
          isSimulatedLive={isSimulatedLive}
        />

        {/* 2. THE CREW / WHO WE ARE */}
        <TheCrew />

        {/* 3. TRANSMISSIONS / WHAT WE DO */}
        <Transmissions />

        {/* 4. TUNE THE SIGNAL (MINI-GAME) */}
        <TuneTheSignal />

        {/* 6. TOKEN / THE FREQUENCY CARD */}
        <TokenSection
          isSimulatedLive={isSimulatedLive}
          onToggleSimulatedLive={setIsSimulatedLive}
        />

        {/* 5. ROADMAP */}
        <Roadmap />

        {/* 7. MEDIA KIT */}
        <MediaKitSection />

        {/* 8. FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
