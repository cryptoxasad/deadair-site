import React, { useState, useEffect, useRef } from 'react';
import { ASSET_MANIFEST, type AssetEntry } from '../../assets/assetManifest';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Share2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Radio,
  Check,
  Sparkles,
} from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface Episode {
  id: string;
  number: string;
  title: string;
  timestamp: string;
  frequency: string;
  image: string;
  alt: string;
  story: string;
  communityPrompt: string;
  shareUrl: string;
}

const STARTER_EPISODES: Episode[] = [
  {
    id: 'ep-001',
    number: '001',
    title: 'The Signal at 00:07',
    timestamp: '00:07:14 UTC',
    frequency: '104.70 MHz',
    image: ASSET_MANIFEST.studioInterior.src,
    alt: ASSET_MANIFEST.studioInterior.alt,
    story:
      'Switch was queuing the late-night ambient tape when the studio VU meters abruptly slammed into the red. Patch shouted from the hardware bench that the rooftop antenna had been disconnected for routine repairs—yet a clean, high-bandwidth carrier wave was saturating the booth. Then the speaker hummed with a pulse that matched the exact timestamp of Solana block zero.',
    communityPrompt:
      'Did you notice the clock freeze? What frequency does your receiver tune to after midnight? Share with #DeadAir007.',
    shareUrl: 'https://deadair.radio/transmissions/001',
  },
  {
    id: 'ep-002',
    number: '002',
    title: 'The Call From Tomorrow',
    timestamp: '01:14:02 UTC',
    frequency: '88.30 MHz',
    image: ASSET_MANIFEST.subwayTunnel.src,
    alt: ASSET_MANIFEST.subwayTunnel.alt,
    story:
      'Down in the 14th St subway station, the last train had already left. An old transistor radio sitting on a wooden bench began humming softly on 88.3 MHz. Seconds later, the payphone beside it began ringing. Echo picked up and read the next three messages Switch would say on the air—fifteen minutes before Switch even said them.',
    communityPrompt:
      'If a telephone rang on an empty platform at 1:14 AM and told you tomorrow’s chart, would you stay on the line?',
    shareUrl: 'https://deadair.radio/transmissions/002',
  },
  {
    id: 'ep-003',
    number: '003',
    title: 'Channel Zero',
    timestamp: '03:33:00 UTC',
    frequency: '100.70 MHz',
    image: ASSET_MANIFEST.socialBanner.src,
    alt: ASSET_MANIFEST.socialBanner.alt,
    story:
      'Patch hooked up an analog broadcast oscilloscope to a copper wire hung over the rainy fire escape. The waveform didn’t look like sound; it looked like geometry. A continuous pulse of electrical interference bathed the skyline, illuminating the city in cyan lightning that only pirate radio receivers could detect.',
    communityPrompt:
      'Tune into Channel Zero. Report what flickers in the static between 3:00 and 4:00 AM.',
    shareUrl: 'https://deadair.radio/transmissions/003',
  },
];

const GALLERY_ITEMS: AssetEntry[] = [
  ASSET_MANIFEST.heroAntenna,
  ASSET_MANIFEST.studioInterior,
  ASSET_MANIFEST.charSwitch,
  ASSET_MANIFEST.charPatch,
  ASSET_MANIFEST.charEcho,
  ASSET_MANIFEST.subwayTunnel,
  ASSET_MANIFEST.socialBanner,
];

export const Transmissions: React.FC = () => {
  // Teaser state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [copiedEpId, setCopiedEpId] = useState<string | null>(null);

  // Gallery Modal Lightbox state
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const duration = 14; // 14-second teaser
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Teaser playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now - currentTime * 1000;
      const elapsed = (now - startTimeRef.current) / 1000;

      if (elapsed >= duration) {
        setCurrentTime(duration);
        setIsPlaying(false);
        startTimeRef.current = null;
        return;
      }

      setCurrentTime(elapsed);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, currentTime]);

  const handlePlayPause = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
      startTimeRef.current = null;
    }
    setIsPlaying(!isPlaying);
    audioSynth.playTransmissionBeep();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    startTimeRef.current = null;
  };

  const handleShareEpisode = (ep: Episode) => {
    navigator.clipboard?.writeText(`${ep.shareUrl} - ${ep.title} ($DEADAIR)`);
    setCopiedEpId(ep.id);
    setTimeout(() => setCopiedEpId(null), 2500);
  };

  // Keyboard navigation for gallery modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex]);

  // Teaser Beats calculation
  // Beat 1: 0 - 3.5s -> 00:07 appears
  // Beat 2: 3.5 - 7.0s -> Waveform sweeps
  // Beat 3: 7.0 - 10.5s -> Message arrives
  // Beat 4: 10.5 - 14.0s -> Logo & Slogan
  const currentBeat =
    currentTime < 3.5
      ? 1
      : currentTime < 7.0
      ? 2
      : currentTime < 10.5
      ? 3
      : 4;

  return (
    <section id="transmissions" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070a13] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-bold mb-2">
            // OFFICIAL BROADCASTS & ARCHIVE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Station Transmissions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            Every transmission is a timestamped fragment of the story. Watch the featured teaser,
            inspect the episode dispatches, and examine the official artwork gallery.
          </p>
        </div>

        {/* Featured Teaser Motion Player */}
        <div className="mb-20 max-w-4xl mx-auto bg-slate-950/90 rounded-2xl border border-cyan-900/60 overflow-hidden shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Radio className="w-4 h-4 animate-pulse" />
              TRANSMISSION TEASER 001 // THE 00:07 ANOMALY
            </span>
            <span className="text-amber-400">
              BEAT 0{currentBeat} / 04 // {currentTime.toFixed(1)}s / {duration}s
            </span>
          </div>

          {/* Player Viewport */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Background Image Poster */}
            <img
              src={ASSET_MANIFEST.studioInterior.src}
              alt="Teaser background showing studio booth"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isPlaying ? 'opacity-35 blur-[1px]' : 'opacity-70'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

            {/* CRT TV scanlines and curvature */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.15) 3px)',
              }}
            />

            {/* Beat 1: 00:07 Appears */}
            {currentBeat === 1 && (
              <div className="relative z-10 text-center animate-fade-in">
                <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2 font-bold animate-pulse">
                  // INTERCEPTED TIME CODE
                </div>
                <div className="text-6xl sm:text-8xl font-black font-mono tracking-widest text-amber-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                  00:07:00
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
                  CARRIER DETECTED // ZERO BROADCAST DRIFT
                </div>
              </div>
            )}

            {/* Beat 2: Waveform Moves */}
            {currentBeat === 2 && (
              <div className="relative z-10 w-full max-w-xl px-6 text-center animate-fade-in">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 font-bold">
                  // OSCILLOSCOPE WAVEFORM CAPTURE
                </div>
                {/* Simulated Oscilloscope Waveform */}
                <div className="h-28 w-full bg-slate-950/80 rounded-xl border border-cyan-500/50 p-2 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(6,182,212,0.3)]">
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-40">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                        style={{
                          height: `${Math.sin(i * 0.4 + currentTime * 6) * 40 + 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative z-10 font-mono text-xs text-cyan-300 font-bold tracking-wider">
                    RESONANCE LOCK: 104.700 MHz
                  </div>
                </div>
                <p className="font-mono text-xs text-amber-300/90 mt-3">
                  FREQUENCY HARMONIC DETECTED ON SOLANA NETWORK
                </p>
              </div>
            )}

            {/* Beat 3: A Message Arrives */}
            {currentBeat === 3 && (
              <div className="relative z-10 max-w-xl px-6 text-center animate-fade-in">
                <div className="inline-block px-3 py-1 rounded bg-amber-950/80 border border-amber-600/70 text-amber-300 font-mono text-xs font-bold mb-3 tracking-widest">
                  DECRYPTED TRANSMISSION DISPATCH
                </div>
                <blockquote className="text-lg sm:text-2xl font-['Cinzel',serif] text-white font-bold leading-relaxed drop-shadow-md">
                  “You weren’t supposed to hear this. The station doesn’t exist... yet the tape is still feeding.”
                </blockquote>
                <p className="font-mono text-xs text-slate-400 mt-3">
                  — SWITCH // LIVE FROM THE ROOFTOP BOOTH
                </p>
              </div>
            )}

            {/* Beat 4: Logo & Slogan */}
            {currentBeat === 4 && (
              <div className="relative z-10 text-center animate-fade-in px-4">
                <div className="text-4xl sm:text-6xl font-black font-['Cinzel',serif] text-white tracking-wider mb-2 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                  DEAD AIR
                </div>
                <p className="font-mono text-sm sm:text-base uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
                  “Something’s on the frequency.”
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-cyan-800 text-cyan-300 font-mono text-xs">
                  <span>TICKER: $DEADAIR</span>
                  <span>•</span>
                  <span>SOLANA PRE-LAUNCH</span>
                </div>
              </div>
            )}

            {/* Big Play Overlay Button when paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlayPause}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors group cursor-pointer"
                aria-label="Play transmission teaser"
              >
                <span className="p-5 rounded-full bg-cyan-500 text-slate-950 group-hover:scale-110 shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-transform flex items-center justify-center">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </span>
              </button>
            )}
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col gap-3">
            {/* Scrubber Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                {currentTime.toFixed(1)}s
              </span>
              <div
                className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentTime(ratio * duration);
                  startTimeRef.current = null;
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-75"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400 w-10">
                {duration}.0s
              </span>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Play Teaser
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:text-white text-slate-400 transition-colors"
                  title="Replay from start"
                  aria-label="Replay transmission teaser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    showTranscript
                      ? 'bg-slate-800 text-cyan-300 border-cyan-800'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                  aria-expanded={showTranscript}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Transcript</span>
                </button>
              </div>
            </div>

            {/* Collapsible Transcript */}
            {showTranscript && (
              <div className="mt-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                <div className="text-amber-400 font-bold mb-2 uppercase tracking-wide">
                  // OFFICIAL TEASER TRANSCRIPT
                </div>
                <p className="mb-1.5">
                  <strong className="text-cyan-400">[00:00 - 00:03]</strong> [Low-frequency radio static. Amber vacuum tube warming tone.] Digital clock flashes <strong>00:07:00</strong>.
                </p>
                <p className="mb-1.5">
                  <strong className="text-cyan-400">[00:03 - 00:07]</strong> [Carrier sweep tone. Oscilloscope needle deflects.] Switch: <em>“Patch, is the red light supposed to pulse like that?”</em>
                </p>
                <p className="mb-1.5">
                  <strong className="text-cyan-400">[00:07 - 00:10]</strong> [Telegraph pulse.] Echo (over telephone): <em>“You weren’t supposed to hear this. The station doesn’t exist... but the tape is feeding.”</em>
                </p>
                <p>
                  <strong className="text-cyan-400">[00:10 - 00:14]</strong> [Resonant chord.] Announcer: <em>“DEAD AIR. Something’s on the frequency. $DEADAIR on Solana.”</em>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Transmission Archive Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-white font-['Cinzel',serif]">
                Transmission Archive
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Starter dispatches logged from the midnight frequency
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
              3 EPISODES LOGGED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STARTER_EPISODES.map((ep) => (
              <article
                key={ep.id}
                className="flex flex-col bg-slate-950/80 rounded-2xl border border-slate-800/80 hover:border-cyan-800/60 transition-all duration-300 overflow-hidden shadow-xl"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 group">
                  <img
                    src={ep.image}
                    alt={ep.alt}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-cyan-800 text-[11px] font-mono font-bold text-cyan-400">
                    EPISODE {ep.number}
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-black/70">
                    {ep.frequency}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 font-semibold mb-2">
                      <span>TIMESTAMP</span>
                      <span>{ep.timestamp}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white font-['Cinzel',serif] mb-3">
                      {ep.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-['Inter',sans-serif] leading-relaxed mb-4">
                      {ep.story}
                    </p>
                  </div>

                  <div>
                    {/* Community Prompt */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-400 mb-4">
                      <strong className="text-amber-400 block mb-1">COMMUNITY PROMPT:</strong>
                      {ep.communityPrompt}
                    </div>

                    {/* Share Action */}
                    <button
                      type="button"
                      onClick={() => handleShareEpisode(ep)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center justify-center gap-2 transition-colors"
                      aria-label={`Copy shareable URL for ${ep.title}`}
                    >
                      {copiedEpId === ep.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Link Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copy Episode Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Illustrated Artwork Gallery */}
        <div>
          <div className="pb-4 mb-8 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white font-['Cinzel',serif]">
                Illustrated Artwork Gallery
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Click any scene to open full-resolution inspection modal
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {GALLERY_ITEMS.length} ORIGINAL SCENES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveModalIndex(index)}
                className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition-all group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={`Enlarge image: ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <div className="text-[11px] font-bold text-white font-['Cinzel',serif] truncate">
                    {item.title}
                  </div>
                  <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                    {item.category} // {item.aspectRatio}
                  </div>
                </div>
                <span className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Gallery Modal Lightbox */}
      {activeModalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
              <div>
                <h4
                  id="gallery-modal-title"
                  className="text-lg font-bold text-white font-['Cinzel',serif]"
                >
                  {GALLERY_ITEMS[activeModalIndex].title}
                </h4>
                <p className="text-xs font-mono text-cyan-400">
                  SCENE {activeModalIndex + 1} OF {GALLERY_ITEMS.length} //{' '}
                  {GALLERY_ITEMS[activeModalIndex].aspectRatio}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveModalIndex(
                      (activeModalIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                    )
                  }
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModalIndex((activeModalIndex + 1) % GALLERY_ITEMS.length)
                  }
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalIndex(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/80 hover:text-red-400 text-slate-300 transition-colors ml-2"
                  aria-label="Close modal dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center p-2">
              <img
                src={GALLERY_ITEMS[activeModalIndex].src}
                alt={GALLERY_ITEMS[activeModalIndex].alt}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Modal Caption and Notes */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800/80">
              <p className="text-sm text-slate-200 font-['Inter',sans-serif] mb-2">
                {GALLERY_ITEMS[activeModalIndex].caption}
              </p>
              <div className="text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-bold">ALT SPEC:</span>{' '}
                {GALLERY_ITEMS[activeModalIndex].alt}
              </div>
              <div className="text-xs font-mono text-amber-400/80 mt-1">
                <span className="font-bold">USAGE:</span>{' '}
                {GALLERY_ITEMS[activeModalIndex].usageNotes}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
