import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, Sparkles, Radio } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is DEAD AIR ($DEADAIR)?',
    answer:
      'DEAD AIR is an original fictional-world community meme coin concept on Solana. Inspired by late-night noir radio broadcasts and analog signal mysteries, the project tells the story of three rooftop radio operators—Switch, Patch, and Echo—who intercept impossible transmissions from the future. It blends immersive episodic storytelling, original character artwork, and interactive browser audio mechanics.',
  },
  {
    id: 'faq-2',
    question: 'Is there a token live right now?',
    answer:
      'No. DEAD AIR is strictly in PRE-LAUNCH. There is currently NO contract deployed, NO live liquidity pool, and NO presale. Any token, Telegram bot, or direct wallet claiming to sell $DEADAIR before the official announcement on this website and our verified X channel is a scam.',
  },
  {
    id: 'faq-3',
    question: 'What does the "Tune the Signal" mini-game do?',
    answer:
      'The "Tune the Signal" mini-game is a free browser puzzle built to let visitors experience the fictional world. By adjusting the frequency dial using range controls or arrow keys, players can zero in on secret stations (such as 104.7 MHz or 88.3 MHz) to decrypt classified story logs. The game requires zero wallet connection, zero login, zero token staking, and awards no financial prizes.',
  },
  {
    id: 'faq-4',
    question: 'How will the official mint address and trading links be verified?',
    answer:
      'When the launch decision is executed (Phase 03 of our Roadmap), the verified mint address will simultaneously appear on the official Frequency Card on this website and be pinned on our official X handle (@deadair_radio). A copyable mint button and verified DEX chart links (Dexscreener/PumpSwap/Jupiter) will only activate once on-chain liquidity routes are independently confirmed.',
  },
  {
    id: 'faq-5',
    question: 'Who is the crew (fictional story vs. real team)?',
    answer:
      'Switch (the host), Patch (the engineer), and Echo (the payphone caller) are original fictional characters created for the narrative universe of Dead Air. They do not represent real financial advisers or real persons. The actual developers and creative directors operate behind the project with strict adherence to safety, fair launch principles, and community transparency.',
  },
  {
    id: 'faq-6',
    question: 'What safety rules should community members follow?',
    answer:
      'Never share your private keys, seed phrases, or wallet credentials with anyone. Team members will never send direct messages (DMs) asking for funds, offering private seed allocations, or requesting wallet approvals. Always compare the mint address character-by-character with the official website before executing any decentralized swap on Solana.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-bold mb-2">
            // FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Transmission FAQ
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Clear, honest answers regarding our fictional world, mini-game, pre-launch status, and
            safety protocols.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-950 border-cyan-800/80 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif]">
                    {faq.question}
                  </span>
                  <span
                    className={`p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-950 text-cyan-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed font-['Inter',sans-serif] border-t border-slate-900 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
