import React from 'react';
import { Logo } from '../brand/Logo';
import { DEFAULT_TOKEN_CONFIG } from '../../config/tokenConfig';
import { ArrowUp, Radio, Shield, Twitter, Send, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasTwitter = Boolean(DEFAULT_TOKEN_CONFIG.urls.twitter);
  const hasTelegram = Boolean(DEFAULT_TOKEN_CONFIG.urls.telegram);
  const hasDiscord = Boolean(DEFAULT_TOKEN_CONFIG.urls.discord);

  return (
    <footer className="bg-[#05070d] border-t border-slate-900 text-slate-400 font-['Inter',sans-serif] text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <a href="#hero" className="inline-block" aria-label="DEAD AIR Home">
              <Logo variant="wordmark" size={36} />
            </a>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-light">
              “At 00:07, a midnight radio crew picked up a transmission from a station that doesn’t
              exist.” A fictional noir world and community meme coin project on Solana.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {hasTwitter && (
                <a
                  href={DEFAULT_TOKEN_CONFIG.urls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-800 transition-colors"
                  aria-label="Official Dead Air X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {hasTelegram && (
                <a
                  href={DEFAULT_TOKEN_CONFIG.urls.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-800 transition-colors"
                  aria-label="Official Dead Air Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {hasDiscord && (
                <a
                  href={DEFAULT_TOKEN_CONFIG.urls.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-800 transition-colors"
                  aria-label="Official Dead Air Discord"
                >
                  <Disc className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Station Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  On Air (Home)
                </a>
              </li>
              <li>
                <a href="#crew" className="hover:text-cyan-400 transition-colors">
                  The Crew (Characters)
                </a>
              </li>
              <li>
                <a href="#transmissions" className="hover:text-cyan-400 transition-colors">
                  Transmissions & Gallery
                </a>
              </li>
              <li>
                <a href="#tuner" className="hover:text-cyan-400 transition-colors">
                  Tune The Signal (Game)
                </a>
              </li>
              <li>
                <a href="#token" className="hover:text-amber-400 transition-colors">
                  The Frequency Card (Token)
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-cyan-400 transition-colors">
                  Roadmap & Phases
                </a>
              </li>
              <li>
                <a href="#media-kit" className="hover:text-cyan-400 transition-colors">
                  Media Kit & Assets
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Safety Overview */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Network & Safety
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 font-mono text-cyan-400">
                <Radio className="w-3.5 h-3.5" />
                <span>Solana SPL Standard</span>
              </li>
              <li>Status: Pre-Launch (Unconfirmed Mint)</li>
              <li>Zero Private Presales or Seed Rounds</li>
              <li>Interactive Lore is Fictional Art</li>
              <li>Never share your private keys</li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-slate-500 font-mono">
          <div className="max-w-2xl text-center md:text-left leading-relaxed">
            <p className="mb-2">
              <strong className="text-slate-400">DISCLAIMER:</strong> DEAD AIR ($DEADAIR) is a
              fictional narrative community meme coin concept. All radio broadcasts, character logs,
              and frequency transcripts are creative works of fiction. Nothing on this website
              constitutes financial, investment, or legal advice. Cryptocurrency trading involves
              substantial risk. Always independently verify the contract address on official
              channels before trading.
            </p>
            <p>© 2026 DEAD AIR ($DEADAIR) // Broadcast Frequency 104.70 MHz. All rights reserved.</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 shrink-0"
            aria-label="Scroll back to top of page"
          >
            <span>Top of Mast</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
