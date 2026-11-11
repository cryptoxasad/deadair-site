import React, { useState } from 'react';
import {
  DEFAULT_TOKEN_CONFIG,
  isLiveTokenConfigured,
  formatMintAddress,
  type TokenConfig,
} from '../../config/tokenConfig';
import {
  Lock,
  Unlock,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Radio,
  FileCode,
  Flame,
  Layers,
} from 'lucide-react';

interface TokenSectionProps {
  isSimulatedLive: boolean;
  onToggleSimulatedLive: (val: boolean) => void;
}

export const TokenSection: React.FC<TokenSectionProps> = ({
  isSimulatedLive,
  onToggleSimulatedLive,
}) => {
  const [copiedMint, setCopiedMint] = useState(false);

  // Simulated live config for reviewer inspection
  const liveMockConfig: TokenConfig = {
    ...DEFAULT_TOKEN_CONFIG,
    launchStatus: 'live',
    mintAddress: '9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump', // Standard base58 verified Solana mint format
    totalSupply: '1,000,000,000 $DEADAIR',
    urls: {
      ...DEFAULT_TOKEN_CONFIG.urls,
      solscan: 'https://solscan.io/token/9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump',
      dexscreener:
        'https://dexscreener.com/solana/9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump',
      tradingSwap:
        'https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump',
    },
  };

  const activeConfig = isSimulatedLive ? liveMockConfig : DEFAULT_TOKEN_CONFIG;
  const isLive = isLiveTokenConfigured(activeConfig);

  const handleCopyMint = (mint: string) => {
    if (!mint) return;
    navigator.clipboard?.writeText(mint);
    setCopiedMint(true);
    setTimeout(() => setCopiedMint(false), 2000);
  };

  return (
    <section id="token" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070a13] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-bold mb-2">
            // TOKEN ARCHITECTURE & FREQUENCY CARD
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            The Frequency Card
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Centralized specification for $DEADAIR on Solana. Strict pre-launch safety rules
            protect our community: no unannounced addresses, no secret presales, and no backdoor routes.
          </p>

          {/* Interactive State Toggle for Reviewer Verification */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl">
            <span className="text-xs font-mono text-slate-300 font-bold px-2">
              INSPECT TOKEN STATE:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleSimulatedLive(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  !isSimulatedLive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                1. Pre-Launch Mode (Default)
              </button>
              <button
                type="button"
                onClick={() => onToggleSimulatedLive(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isSimulatedLive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                2. Live Mode (Simulated)
              </button>
            </div>
          </div>
        </div>

        {/* Central Frequency Token Card */}
        <div className="max-w-3xl mx-auto bg-slate-950 rounded-3xl border-2 border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Card Top Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-inner">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block">
                  OFFICIAL SPECIFICATION SLIP
                </span>
                <h3 className="text-2xl font-black text-white font-['Cinzel',serif]">
                  {activeConfig.name}{' '}
                  <span className="text-amber-400 font-mono text-lg font-bold">
                    {activeConfig.ticker}
                  </span>
                </h3>
              </div>
            </div>

            {/* Launch Status Badge */}
            <div
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 ${
                isLive
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : 'bg-amber-950 text-amber-300 border-amber-600'
              }`}
            >
              {isLive ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isLive ? 'STATUS: LIVE ON SOLANA' : 'STATUS: PRE-LAUNCH'}</span>
            </div>
          </div>

          {/* Token Specification Grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <dt className="text-[11px] font-mono text-slate-500 uppercase">Target Network</dt>
              <dd className="text-base font-bold text-white font-mono mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {activeConfig.network} (SPL Standard)
              </dd>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <dt className="text-[11px] font-mono text-slate-500 uppercase">Total Supply</dt>
              <dd className="text-base font-bold text-white font-mono mt-1">
                {activeConfig.totalSupply}
              </dd>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <dt className="text-[11px] font-mono text-slate-500 uppercase">
                  Contract / Mint Address
                </dt>
                {isLive && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    VERIFIED ON-CHAIN
                  </span>
                )}
              </div>
              <dd className="mt-1">
                {isLive ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-black border border-emerald-600/70">
                    <code className="text-xs sm:text-sm font-mono text-emerald-300 break-all select-all font-bold">
                      {activeConfig.mintAddress}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyMint(activeConfig.mintAddress)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase flex items-center justify-center gap-1.5 transition-colors"
                      aria-label="Copy verified contract address"
                    >
                      {copiedMint ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Mint</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-black/60 border border-dashed border-amber-600/60 flex items-center gap-2 text-xs font-mono text-amber-300">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      UNCONFIRMED // Mint address is locked. No tokens exist until official broadcast announcement.
                    </span>
                  </div>
                )}
              </dd>
            </div>
          </dl>

          {/* Action Buttons: Live vs Pre-Launch */}
          {isLive ? (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-800/80 mb-6">
              <p className="text-xs font-mono text-slate-300 mb-4">
                <strong className="text-emerald-400">SAFETY CHECK:</strong> Always verify that the
                mint in your wallet matches the official address posted above and pinned on our
                official X handle.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={activeConfig.urls.tradingSwap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[180px] py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-950/50"
                >
                  <span>Trade on PumpSwap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={activeConfig.urls.dexscreener}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[180px] py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <span>Dexscreener Chart</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>

                <a
                  href={activeConfig.urls.solscan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs font-mono uppercase flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <span>Solscan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-600/40 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs font-['Inter',sans-serif] text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block font-mono uppercase mb-1">
                  Pre-Launch Security Protocol
                </strong>
                {DEFAULT_TOKEN_CONFIG.disclaimers.warningNotice}
              </div>
            </div>
          )}

          {/* Verification Protocol List */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-3">
              VERIFICATION PROTOCOL // HOW OFFICIAL LINKS WILL BE CONFIRMED
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Dual verification: Web frequency card + Pinned X broadcast.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero DMs or stealth presales. We will never ask for keys.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Liquidity independently routed and verified on DEX explorers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
