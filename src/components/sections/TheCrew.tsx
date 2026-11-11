import React, { useState } from 'react';
import { ASSET_MANIFEST } from '../../assets/assetManifest';
import { Mic, Wrench, PhoneCall, Volume2, Info, Quote } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface Character {
  id: string;
  name: string;
  callsign: string;
  role: string;
  icon: React.ElementType;
  oneLineJoke: string;
  shortStory: string;
  quote: string;
  portrait: string;
  alt: string;
  accentColor: string;
  badge: string;
}

const CHARACTERS: Character[] = [
  {
    id: 'switch',
    name: 'Switch',
    callsign: 'VOICE OF THE VOID',
    role: 'Midnight Radio Host & Reluctant Anchor',
    icon: Mic,
    oneLineJoke: 'Reads strange unverified distress signals live and insists everything is 100% under control.',
    shortStory:
      'Switch got the midnight shift because nobody else wanted to talk between 12:00 AM and 05:00 AM. When the clock struck 00:07 and an unknown carrier wave hijacked the studio console, Switch didn’t cut the power—they just opened the mic. Smooth, calm under pressure, and secretly convinced the ghost broadcast is transmitting encrypted Solana ledger data from the next bull run.',
    quote: '“To all our late-night listeners out there: the red light is on, the coffee is cold, and if you hear whispers coming from your toaster, please adjust your antenna.”',
    portrait: ASSET_MANIFEST.charSwitch.src,
    alt: ASSET_MANIFEST.charSwitch.alt,
    accentColor: 'border-cyan-500/40 text-cyan-400',
    badge: 'STUDIO 3B HOST',
  },
  {
    id: 'patch',
    name: 'Patch',
    callsign: 'HARDWARE ALCHEMIST',
    role: 'Chief Broadcast Engineer & Solder Addict',
    icon: Wrench,
    oneLineJoke: 'Can tune a rusty copper wire to pick up lunar satellite feeds, but has broken five station coffee machines.',
    shortStory:
      'Patch doesn’t believe in user manuals or standard safety limits. Every piece of equipment in the booth has been rewired at least three times with electrical tape, silver solder, and spare vacuum tubes salvaged from an abandoned navy radar station. Whenever the mysterious 00:07 signal pulses, Patch’s oscilloscopes dance in perfect Fibonacci coils.',
    quote: '“I told Switch that’s not an audio artifact, that’s an electromagnetic handshake. Now if you’ll excuse me, the espresso pot is sparking again.”',
    portrait: ASSET_MANIFEST.charPatch.src,
    alt: ASSET_MANIFEST.charPatch.alt,
    accentColor: 'border-amber-500/40 text-amber-400',
    badge: 'CHIEF ENGINEER',
  },
  {
    id: 'echo',
    name: 'Echo',
    callsign: 'THE UNKNOWN CALLER',
    role: 'Regular Midnight Phone Caller & Oracle',
    icon: PhoneCall,
    oneLineJoke: 'Always calls from a rainy payphone booth and knows the exact frequency of the next transmission before it airs.',
    shortStory:
      'Nobody has ever seen Echo’s face without a brimmed fedora or a trench coat soaked in city rain. Exactly thirty seconds before the station picks up an unearthly frequency, phone line 4B lights up with a steady hum. Echo speaks in cryptic one-liners, hints at upcoming market liquidity, and hangs up the instant the transmission finishes.',
    quote: '“You think you’re holding a meme coin. But really, you’re holding a frequency. Don’t drop the receiver when the static clears.”',
    portrait: ASSET_MANIFEST.charEcho.src,
    alt: ASSET_MANIFEST.charEcho.alt,
    accentColor: 'border-purple-500/40 text-purple-400',
    badge: 'PAYPHONE 4B',
  },
];

export const TheCrew: React.FC = () => {
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>('switch');

  const handlePlayVoice = (charId: string) => {
    setActiveQuoteId(charId);
    audioSynth.playTransmissionBeep();
  };

  return (
    <section id="crew" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-bold mb-2">
            // PERSONNEL LOGS & LORE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Meet The Midnight Crew
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Three distinct personalities running a rogue pirate station on a rainy rooftop.
            United by curiosity, insomnia, and an electromagnetic mystery that refuses to die down.
          </p>

          {/* Fiction vs Reality Distinction Card */}
          <div className="mt-6 inline-flex items-start gap-3 text-left p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-slate-300 font-mono">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 uppercase block mb-1">
                Transparency & Identity Disclosure
              </strong>
              Switch, Patch, and Echo are fictional characters created specifically for the DEAD AIR
              storyline and community lore. They do not represent real financial advisors, and the
              station’s technical logs are interactive narrative art. The real founding team operates
              transparently through official verified social channels.
            </div>
          </div>
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHARACTERS.map((char) => {
            const Icon = char.icon;
            const isSelected = activeQuoteId === char.id;

            return (
              <article
                key={char.id}
                className={`flex flex-col bg-slate-950/90 rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl ${
                  isSelected
                    ? `${char.accentColor} shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50`
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Character Portrait Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900 group">
                  <img
                    src={char.portrait}
                    alt={char.alt}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle dark gradient at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Character Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono font-bold tracking-wider text-slate-300">
                    {char.badge}
                  </div>

                  {/* Callsign Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider text-white px-2 py-1 rounded bg-black/70 backdrop-blur-md">
                      {char.callsign}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Name and Role */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white font-['Cinzel',serif] mb-1">
                        {char.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">
                        {char.role}
                      </p>
                    </div>

                    {/* One-Line Joke */}
                    <div className="mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-amber-300/90 leading-relaxed">
                      <span className="text-amber-500 font-bold mr-1.5">INTEL:</span>
                      {char.oneLineJoke}
                    </div>

                    {/* Narrative Short Story */}
                    <p className="text-xs sm:text-sm text-slate-300 font-['Inter',sans-serif] leading-relaxed mb-6">
                      {char.shortStory}
                    </p>
                  </div>

                  {/* Audio Quote & Playback */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Quote className="w-3 h-3 text-cyan-400" />
                        Signature Transmission
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(char.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                        aria-label={`Play audio cue for ${char.name}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Cue Audio</span>
                      </button>
                    </div>
                    <blockquote className="text-xs italic text-slate-400 pl-3 border-l-2 border-cyan-500/50">
                      {char.quote}
                    </blockquote>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
