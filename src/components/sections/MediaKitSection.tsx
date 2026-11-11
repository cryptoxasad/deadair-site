import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { ASSET_MANIFEST } from '../../assets/assetManifest';
import { Download, Copy, Check, Palette, FileText, Image, ExternalLink } from 'lucide-react';

const PALETTE = [
  { name: 'Midnight Void', hex: '#070a13', desc: 'Primary atmospheric background' },
  { name: 'Obsidian Steel', hex: '#0f172a', desc: 'Chassis & elevated card panels' },
  { name: 'Amber Broadcast', hex: '#f59e0b', desc: 'Studio lamp & warning indicators' },
  { name: 'Cyan Pulse', hex: '#06b6d4', desc: 'Carrier wave & electromagnetic accents' },
  { name: 'Signal Red', hex: '#ef4444', desc: 'Live ON-AIR light & tuner needle' },
];

export const MediaKitSection: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleDownloadSvg = (svgName: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = `${svgName}.svg`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const svgIconData = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" fill="#0d1424" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M10 24A14 14 0 0 1 38 24" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 3"/>
  <path d="M15 24A9 9 0 0 1 33 24" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="24" cy="28" r="10" stroke="#f59e0b" stroke-width="2.5" fill="#0a0f1d"/>
  <line x1="24" y1="19" x2="24" y2="21" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="19" y1="21" x2="20.5" y2="22.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="29" y1="21" x2="27.5" y2="22.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="24" y1="28" x2="27" y2="20" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
  <circle cx="24" cy="28" r="2" fill="#fbbf24"/>
  <path d="M24 4L25.2 8.5L29 9.5L25.5 11.5L25.8 15.5L23.5 12.5L19.5 13.5L22 10.5L20.5 7L23.8 8L24 4Z" fill="#fbbf24"/>
  <circle cx="24.5" cy="9.8" r="1.5" fill="#ffffff"/>
</svg>`;

  return (
    <section id="media-kit" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070a13] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-bold mb-2">
            // BRAND DESIGN SYSTEM
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Official Media Kit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Download vector brand marks, inspect high-contrast typography specifications, and grab
            official wallpapers and social banners.
          </p>
        </div>

        {/* Brand Marks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Logo 1: Horizontal Wordmark */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">
                PRIMARY HORIZONTAL WORDMARK
              </span>
              <div className="p-6 rounded-xl bg-black/60 border border-slate-900 flex items-center justify-center min-h-[100px]">
                <Logo variant="wordmark" size={40} />
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs font-mono text-slate-400">
              <span>Dark Background / Header</span>
              <button
                type="button"
                onClick={() => handleDownloadSvg('deadair_wordmark', svgIconData)}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> SVG
              </button>
            </div>
          </div>

          {/* Logo 2: 32px Icon & Monochrome */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">
                STANDALONE ICON (32PX OPTIMIZED) & MONO
              </span>
              <div className="p-6 rounded-xl bg-black/60 border border-slate-900 flex items-center justify-around min-h-[100px]">
                <div className="text-center">
                  <Logo variant="icon" size={44} />
                  <span className="block text-[10px] font-mono text-slate-500 mt-2">RGB Dial</span>
                </div>
                <div className="text-center">
                  <div className="text-slate-200">
                    <Logo variant="monochrome" size={44} />
                  </div>
                  <span className="block text-[10px] font-mono text-slate-500 mt-2">Monochrome</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs font-mono text-slate-400">
              <span>Favicon & App Icon</span>
              <button
                type="button"
                onClick={() => handleDownloadSvg('deadair_icon', svgIconData)}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> SVG
              </button>
            </div>
          </div>

          {/* Logo 3: Social Avatar Badge */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">
                OFFICIAL SOCIAL AVATAR / PFP
              </span>
              <div className="p-6 rounded-xl bg-black/60 border border-slate-900 flex items-center justify-center min-h-[100px]">
                <Logo variant="avatar" size={84} />
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs font-mono text-slate-400">
              <span>Square 1:1 Social Profile</span>
              <button
                type="button"
                onClick={() => handleDownloadSvg('deadair_avatar', svgIconData)}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> SVG
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette Swatches */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 mb-12">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400 font-bold">
            <Palette className="w-4 h-4" />
            <span>CORE CHROMATIC PALETTE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PALETTE.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => handleCopyHex(c.hex)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-left transition-all group cursor-pointer"
                aria-label={`Copy color ${c.name} hex code`}
              >
                <div
                  className="h-14 w-full rounded-lg mb-3 border border-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-200">{c.name}</span>
                  {copiedHex === c.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-0.5">{c.hex}</div>
                <div className="text-[10px] text-slate-500 mt-1">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* High-Res Official Header Banner Display */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                16:9 4K SOCIAL HEADER BANNER
              </span>
              <h3 className="text-xl font-bold text-white font-['Cinzel',serif] mt-0.5">
                The High-Voltage Transmission Mast
              </h3>
            </div>
            <a
              href={ASSET_MANIFEST.socialBanner.src}
              download="DEADAIR_SOCIAL_BANNER_4K.jpg"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 font-bold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Master JPG
            </a>
          </div>

          <div className="aspect-[3/1] w-full rounded-2xl overflow-hidden border border-slate-800 relative group">
            <img
              src={ASSET_MANIFEST.socialBanner.src}
              alt={ASSET_MANIFEST.socialBanner.alt}
              className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300">
              <span className="font-bold text-amber-400">DIMENSIONS:</span> 1920x1080 (Optimized for Twitter/X Header)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
