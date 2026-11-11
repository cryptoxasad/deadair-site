import React from 'react';
import { CheckCircle2, Clock, Sparkles, Radio, Layers, ShieldCheck } from 'lucide-react';

type RoadmapStatus = 'Available' | 'In progress' | 'Planned';

interface RoadmapPhase {
  phase: string;
  name: string;
  status: RoadmapStatus;
  description: string;
  deliverables: string[];
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'PHASE 01',
    name: 'Signal Found',
    status: 'Available',
    description:
      'Creation of the core Dead Air brand identity, pilot website, high-definition visual assets, and initial transmission lore.',
    deliverables: [
      'Original logo suite: 32px icon, horizontal wordmark, monochrome & social avatar',
      'Atmospheric noir website with rain textures, studio aesthetics, and audio synth engine',
      'The Crew lore: character portraits and stories for Switch, Patch, and Echo',
      'Transmission 001 featured teaser and 3 starter episode dispatches',
    ],
  },
  {
    phase: 'PHASE 02',
    name: 'Station Opens',
    status: 'In progress',
    description:
      'Community interactive rollout, playable browser radio tuner mini-game, and community gathering on social frequencies.',
    deliverables: [
      'Playable browser "Tune the Signal" mini-game with frequency feedback & secret logs',
      'Local progress storage and dispatch log export (.TXT & clipboard)',
      'Community prompt sharing and feedback integration',
      'Media kit distribution with vector logo downloads and wallpapers',
    ],
  },
  {
    phase: 'PHASE 03',
    name: 'Launch Decision',
    status: 'Planned',
    description:
      'Finalization of token specifications on Solana, contract security audit, and independent verification of liquidity routes before enabling live trading links.',
    deliverables: [
      'Confirmation of fair launch parameters on Solana without private allocations',
      'Independent verification of trading routes and pool liquidity',
      'Real-time switch from Pre-Launch to Live mode on official Frequency Card',
      'Public announcement across verified X and Telegram channels simultaneously',
    ],
  },
  {
    phase: 'PHASE 04',
    name: 'Late Night Broadcasts',
    status: 'Planned',
    description:
      'Ongoing episodic storytelling, community transmission submissions, voice-acted audio dispatches, and collaborative worldbuilding.',
    deliverables: [
      'Community-submitted transmission episodes and radio call-ins',
      'Expanded frequency tuner secrets and puzzle ARG layers',
      'Artist collaborations for physical cassette tapes and radio merch',
      'Decentralized radio station relay experiments',
    ],
  },
];

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-bold mb-2">
            // TRANSMISSION TIMELINE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Project Roadmap
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Honest, deliverable-driven progression. Every milestone reflects verified execution
            rather than speculative dates.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_PHASES.map((phase) => {
            let statusBadge = (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                {phase.status}
              </span>
            );

            if (phase.status === 'Available') {
              statusBadge = (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/70 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Available
                </span>
              );
            } else if (phase.status === 'In progress') {
              statusBadge = (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-600/70 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400 animate-spin" />
                  In Progress
                </span>
              );
            } else if (phase.status === 'Planned') {
              statusBadge = (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-500" />
                  Planned
                </span>
              );
            }

            return (
              <div
                key={phase.phase}
                className="flex flex-col bg-slate-950/90 rounded-2xl border border-slate-800/80 p-6 shadow-xl relative hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {phase.phase}
                  </span>
                  {statusBadge}
                </div>

                <h3 className="text-xl font-bold text-white font-['Cinzel',serif] mb-2">
                  {phase.name}
                </h3>
                <p className="text-xs text-slate-400 font-['Inter',sans-serif] leading-relaxed mb-6">
                  {phase.description}
                </p>

                <div className="mt-auto">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                    DELIVERABLES:
                  </span>
                  <ul className="space-y-2 text-xs font-['Inter',sans-serif] text-slate-300">
                    {phase.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
