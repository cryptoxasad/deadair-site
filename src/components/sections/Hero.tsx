import React from 'react';
import { ASSET_MANIFEST } from '../../assets/assetManifest';
import { Radio, Play, ChevronRight, AlertTriangle, ShieldCheck, Waves } from 'lucide-react';
import { DEFAULT_TOKEN_CONFIG } from '../../config/tokenConfig';

interface HeroProps {
  onWatchTeaser?: () => void;
  onTuneClick?: () => void;
  isSimulatedLive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onWatchTeaser,
  onTuneClick,
  isSimulatedLive = false,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070a13]"
    >
      {/* Background Cinematic Artwork with Vignette & Rain Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_MANIFEST.heroAntenna.src}
          alt={ASSET_MANIFEST.heroAntenna.alt}
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform motion-safe:animate-pulse duration-[8000ms]"
        />
        {/* Layered gradients for atmospheric noir lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/70 to-[#070a13]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/30 via-transparent to-[#070a13]/90" />
        {/* Subtle scanline overlay effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.7) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
            backgroundSize: '100% 4px, 6px 100%',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Live Broadcast / Pre-launch HUD Pill */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 backdrop-blur-md">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isSimulatedLive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isSimulatedLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-slate-200">
            {isSimulatedLive ? 'TRANSMITTING LIVE // SOLANA' : 'FREQUENCY DETECTED // PRE-LAUNCH'}
          </span>
          <span className="text-slate-600 font-mono">|</span>
          <span className="font-mono text-xs sm:text-sm text-cyan-400 font-bold">
            104.70 MHz FM
          </span>
        </div>

        {/* Slogan */}
        <p className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3 flex items-center justify-center gap-2">
          <span className="w-6 h-px bg-amber-500/60 inline-block" />
          {DEFAULT_TOKEN_CONFIG.slogan}
          <span className="w-6 h-px bg-amber-500/60 inline-block" />
        </p>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-['Cinzel',serif] max-w-4xl drop-shadow-lg leading-[1.08]">
          {DEFAULT_TOKEN_CONFIG.heroHeadline}
        </h1>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-['Inter',sans-serif] leading-relaxed mb-8 font-light">
          {DEFAULT_TOKEN_CONFIG.supportingLine}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <a
            href="#transmissions"
            onClick={onWatchTeaser}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm uppercase tracking-wider font-mono shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Transmission 001
          </a>

          <a
            href="#tuner"
            onClick={onTuneClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-sm uppercase tracking-wider font-mono shadow-lg shadow-black/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
          >
            <Radio className="w-4 h-4 text-amber-400" />
            Tune The Signal (Mini-Game)
          </a>
        </div>

        {/* Plain-English Overview Box */}
        <div className="w-full max-w-3xl text-left bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Waves className="w-3.5 h-3.5" />
              BRIEFING // WHAT IS DEAD AIR?
            </span>
            <span className="text-amber-400/90">TRANSMISSION 00:07</span>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            <strong className="text-white font-semibold">DEAD AIR ($DEADAIR)</strong> is an
            original fictional world and community meme coin on <span className="text-cyan-400 font-semibold">Solana</span>.
            Set in a rainy, neon-streaked metropolis, the story centers around a rogue midnight radio crew
            who intercept transmissions from a ghost station broadcasting from the future.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-amber-400 font-bold">01.</span>
              <span>Character-driven lore with original art & sound stories.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-cyan-400 font-bold">02.</span>
              <span>Interactive signal tuner mini-game with secret logs.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-emerald-400 font-bold">03.</span>
              <span>100% pre-launch transparency: no secret presale, no insider allocations.</span>
            </div>
          </div>
        </div>

        {/* Quick jump anchor row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a href="#crew" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span>The Crew</span>
            <ChevronRight className="w-3 h-3 text-cyan-500" />
          </a>
          <span className="text-slate-700">•</span>
          <a href="#transmissions" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span>Episodes & Gallery</span>
            <ChevronRight className="w-3 h-3 text-cyan-500" />
          </a>
          <span className="text-slate-700">•</span>
          <a href="#roadmap" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span>Project Roadmap</span>
            <ChevronRight className="w-3 h-3 text-cyan-500" />
          </a>
          <span className="text-slate-700">•</span>
          <a href="#token" className="hover:text-amber-300 transition-colors flex items-center gap-1">
            <span>Token Status</span>
            <ChevronRight className="w-3 h-3 text-amber-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
