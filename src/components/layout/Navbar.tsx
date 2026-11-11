import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { Volume2, VolumeX, Radio, Menu, X, Terminal } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import { DEFAULT_TOKEN_CONFIG } from '../../config/tokenConfig';

interface NavbarProps {
  onTuneClick?: () => void;
  activeSection?: string;
  isSimulatedLive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTuneClick,
  activeSection = 'hero',
  isSimulatedLive = false,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = audioSynth.toggleMute();
    setAudioEnabled(active);
    if (active) {
      audioSynth.playTransmissionBeep();
    }
  };

  const navLinks = [
    { label: 'On Air', href: '#hero' },
    { label: 'The Crew', href: '#crew' },
    { label: 'Transmissions', href: '#transmissions' },
    { label: 'Tune The Signal', href: '#tuner' },
    { label: 'The Frequency Card', href: '#token' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Media Kit', href: '#media-kit' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070a13]/95 backdrop-blur-md border-b border-cyan-950/60 shadow-2xl shadow-black/80 py-2.5'
          : 'bg-gradient-to-b from-[#070a13]/90 via-[#070a13]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 group"
            aria-label="DEAD AIR Home"
          >
            <Logo variant="wordmark" size={36} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-mono font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative hover:text-cyan-400 ${
                  activeSection === link.href.slice(1)
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-300'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status Pill */}
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                isSimulatedLive
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                  : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
              }`}
              title={
                isSimulatedLive
                  ? 'Simulated Live Mode: Mint & DEX links active'
                  : 'Pre-Launch: No live token or presale exists'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSimulatedLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'
                }`}
              />
              {isSimulatedLive ? 'LIVE ON SOLANA' : 'STATUS: PRE-LAUNCH'}
            </div>

            {/* Audio Ambiance Toggle */}
            <button
              type="button"
              onClick={handleAudioToggle}
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                audioEnabled
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title={audioEnabled ? 'Mute Radio Audio Engine' : 'Enable Radio Sound FX & Static'}
              aria-label={audioEnabled ? 'Mute radio sounds' : 'Enable radio sound FX and static'}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="hidden md:inline text-[11px] font-bold">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden md:inline text-[11px]">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Quick Tune CTA */}
            <a
              href="#tuner"
              onClick={onTuneClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tune</span> 104.7
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#070a13]/98 border-b border-cyan-900/60 px-4 pt-3 pb-6 shadow-2xl transition-all">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>STATION CALL: $DEADAIR</span>
            <span className="text-amber-400">PRE-LAUNCH // SOLANA</span>
          </div>
          <nav className="flex flex-col gap-2 font-mono text-sm uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-900 hover:text-cyan-400 text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-600 text-xs font-mono">→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
