import React, { useState, useEffect, useRef } from 'react';
import {
  evaluateTuning,
  formatFrequency,
  clampFrequency,
  RADIO_STATIONS,
  type RadioStation,
  type SignalFeedback,
  FM_MIN_FREQ,
  FM_MAX_FREQ,
} from '../../utils/tunerLogic';
import { audioSynth } from '../../utils/audioSynth';
import {
  Radio,
  Volume2,
  VolumeX,
  Sparkles,
  Unlock,
  CheckCircle,
  Copy,
  Download,
  Share2,
  RotateCcw,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const TuneTheSignal: React.FC = () => {
  // Start near 98.5 MHz so the user has to tune towards 104.7 or 88.3
  const [frequency, setFrequency] = useState<number>(98.5);
  const [feedback, setFeedback] = useState<SignalFeedback>(() => evaluateTuning(98.5));
  const [selectedClueStationId, setSelectedClueStationId] = useState<string>('station-001-main');
  const [unlockedStationIds, setUnlockedStationIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('deadair_unlocked_frequencies');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [activeUnlockModal, setActiveUnlockModal] = useState<RadioStation | null>(null);
  const [copiedLog, setCopiedLog] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  const prevLockedRef = useRef(false);

  // Update evaluation whenever frequency changes
  useEffect(() => {
    const res = evaluateTuning(frequency);
    setFeedback(res);

    // Audio synthesis feedback
    if (audioActive) {
      audioSynth.updateTuningNoise(res.proximity);
      if (res.isLocked && !prevLockedRef.current) {
        audioSynth.playLockChime();
      }
    }

    // Auto-unlock station if tuned
    if (res.isLocked && res.activeStation) {
      if (!unlockedStationIds.includes(res.activeStation.id)) {
        const next = [...unlockedStationIds, res.activeStation.id];
        setUnlockedStationIds(next);
        try {
          localStorage.setItem('deadair_unlocked_frequencies', JSON.stringify(next));
        } catch {
          // localStorage disabled
        }
      }
      if (!prevLockedRef.current) {
        setActiveUnlockModal(res.activeStation);
      }
    }

    prevLockedRef.current = res.isLocked;
  }, [frequency, audioActive, unlockedStationIds]);

  // Cleanup audio noise on unmount
  useEffect(() => {
    return () => {
      audioSynth.stopTuningNoise();
    };
  }, []);

  const handleFrequencyChange = (newFreq: number) => {
    const clamped = clampFrequency(Number(newFreq.toFixed(2)));
    setFrequency(clamped);
    if (audioActive) {
      audioSynth.playDialTick();
    }
  };

  const handleStep = (delta: number) => {
    handleFrequencyChange(frequency + delta);
  };

  const handleAudioToggle = () => {
    const active = audioSynth.toggleMute();
    setAudioActive(active);
    if (active) {
      audioSynth.updateTuningNoise(feedback.proximity);
    } else {
      audioSynth.stopTuningNoise();
    }
  };

  const handleResetProgress = () => {
    setUnlockedStationIds([]);
    try {
      localStorage.removeItem('deadair_unlocked_frequencies');
    } catch {}
    setFrequency(98.5);
  };

  const handleCopyLog = (station: RadioStation | null) => {
    if (!station) return;
    navigator.clipboard?.writeText(station.fullDispatchLog);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleDownloadLog = (station: RadioStation | null) => {
    if (!station) return;
    const element = document.createElement('a');
    const file = new Blob([station.fullDispatchLog], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `DEADAIR_${station.callsign}_LOG.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedClueStation =
    RADIO_STATIONS.find((s) => s.id === selectedClueStationId) || RADIO_STATIONS[0];

  return (
    <section id="tuner" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-bold mb-2">
            // INTERACTIVE RADIO CONSOLE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight mb-4">
            Tune The Signal
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
            A free, browser-based receiver mini-game. No login, no wallet connection, and no wager
            required. Follow the frequency clues, dial the receiver, and intercept classified
            transmissions.
          </p>

          {/* Compliance Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pure creative community game. No purchase, token stake or cash prize involved.</span>
          </div>
        </div>

        {/* Main Radio Tuner Hardware Deck */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-3xl border-2 border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-cyan-950/30 relative">
          {/* Top Chassis Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-slate-300 font-bold tracking-wider">
                DEADAIR MODEL TR-007 // RECEIVER CHASSIS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAudioToggle}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all text-xs ${
                  audioActive
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
                title="Toggle static noise and heterodyne tones"
              >
                {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{audioActive ? 'STATIC AUDIO: ON' : 'STATIC AUDIO: OFF'}</span>
              </button>

              <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[11px]">
                LOGGED: <strong className="text-cyan-400">{unlockedStationIds.length}</strong> /{' '}
                {RADIO_STATIONS.length}
              </div>
            </div>
          </div>

          {/* Clue Prompt Card */}
          <div className="my-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 mt-0.5">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  INTERCEPT OBJECTIVE // SELECT TARGET CLUE
                </span>
                <p className="text-sm font-['Inter',sans-serif] text-slate-200 mt-0.5 font-medium">
                  {selectedClueStation.clue}
                </p>
              </div>
            </div>

            {/* Station Target Switcher */}
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              {RADIO_STATIONS.map((st, i) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedClueStationId(st.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                    selectedClueStationId === st.id
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  aria-label={`Select clue for ${st.callsign}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Analog Meter + Digital Readout Dual Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Digital Nixie / VFD Frequency Display */}
            <div className="bg-slate-950 rounded-2xl border border-cyan-900/60 p-5 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
              <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-500">
                TUNED FREQUENCY
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-black tracking-wider text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] my-2">
                {formatFrequency(frequency)}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>FM BROADCAST</span>
                <span>•</span>
                <span className={feedback.isLocked ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {feedback.isLocked ? 'LOCKED' : 'SEARCHING'}
                </span>
              </div>
            </div>

            {/* Analog VU Signal Strength Meter */}
            <div className="bg-slate-950 rounded-2xl border border-amber-900/40 p-5 flex flex-col justify-between shadow-inner relative">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span>SIGNAL STRENGTH (CARRIER)</span>
                <span className="text-amber-400 font-bold">{feedback.strengthPercent}%</span>
              </div>

              {/* Graphical Needle Arc */}
              <div className="relative h-20 w-full flex items-end justify-center overflow-hidden">
                {/* Meter scale background ticks */}
                <div className="absolute inset-x-8 top-2 flex justify-between text-[9px] font-mono text-slate-600">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span className="text-red-500 font-bold">100</span>
                </div>
                {/* Arc gauge track */}
                <div className="w-56 h-28 border-t-4 border-slate-800 rounded-t-full absolute top-6" />

                {/* Pivot and rotating needle */}
                <div
                  className="w-1 h-20 bg-gradient-to-t from-red-600 to-amber-400 origin-bottom rounded-full transition-transform duration-100 shadow-[0_0_8px_#f59e0b]"
                  style={{
                    transform: `rotate(${feedback.needleOffsetDeg}deg)`,
                  }}
                />
                <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 z-10 absolute -bottom-3" />
              </div>

              {/* Text Status Feedback */}
              <div className="text-center mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-mono font-bold tracking-wider ${
                    feedback.isLocked
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 animate-pulse'
                      : feedback.strengthPercent > 50
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {feedback.statusText}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Dial Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>BAND: {FM_MIN_FREQ} MHz</span>
              <span className="text-cyan-400 font-bold">SLIDE OR USE ARROW KEYS TO TUNE</span>
              <span>{FM_MAX_FREQ} MHz</span>
            </div>

            <label htmlFor="frequency-slider" className="sr-only">
              Tuning Dial Frequency Slider (87.5 to 108.0 MHz)
            </label>
            <input
              id="frequency-slider"
              type="range"
              min={FM_MIN_FREQ}
              max={FM_MAX_FREQ}
              step="0.05"
              value={frequency}
              onChange={(e) => handleFrequencyChange(parseFloat(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            {/* Stepper Buttons for Fine Tuning */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => handleStep(-1.0)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-300"
              >
                -1.0 MHz
              </button>
              <button
                type="button"
                onClick={() => handleStep(-0.1)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-cyan-300 font-bold"
              >
                -0.1 MHz
              </button>
              <button
                type="button"
                onClick={() => handleStep(0.1)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-cyan-300 font-bold"
              >
                +0.1 MHz
              </button>
              <button
                type="button"
                onClick={() => handleStep(1.0)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-300"
              >
                +1.0 MHz
              </button>
            </div>
          </div>

          {/* Active Station Card If Locked */}
          {feedback.isLocked && feedback.activeStation && (
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-fade-in mb-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <CheckCircle className="w-4 h-4" />
                  CARRIER LOCK ESTABLISHED // {feedback.activeStation.frequency} MHz
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[11px] font-mono font-bold">
                  {feedback.activeStation.unlockedBadge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Cinzel',serif] mb-1">
                {feedback.activeStation.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-3">
                BROADCASTER: {feedback.activeStation.speaker} // {feedback.activeStation.callsign}
              </p>

              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 mb-4 leading-relaxed">
                {feedback.activeStation.transcriptSnippet}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveUnlockModal(feedback.activeStation)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Unlock className="w-4 h-4" />
                  View Full Dispatch Log
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyLog(feedback.activeStation)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copiedLog ? 'Copied Log!' : 'Copy Log'}
                </button>
              </div>
            </div>
          )}

          {/* Unlocked Stations Drawer / Logbook */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
              <span className="font-bold text-slate-300 uppercase">
                DISPATCH LOGBOOK ({unlockedStationIds.length}/{RADIO_STATIONS.length} UNLOCKED)
              </span>
              {unlockedStationIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="text-slate-500 hover:text-red-400 text-[11px] transition-colors"
                >
                  Clear Save Data
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {RADIO_STATIONS.map((station) => {
                const isUnlocked = unlockedStationIds.includes(station.id);
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => {
                      setFrequency(station.frequency);
                      if (isUnlocked) setActiveUnlockModal(station);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isUnlocked
                        ? 'bg-slate-900 border-cyan-800/80 hover:border-cyan-500 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span>{station.frequency} MHz</span>
                      <span>{isUnlocked ? '✓ LOGGED' : 'LOCKED'}</span>
                    </div>
                    <div className="text-xs font-bold truncate font-['Cinzel',serif]">
                      {station.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full Dispatch Modal */}
      {activeUnlockModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveUnlockModal(null)}
        >
          <div
            className="max-w-2xl w-full bg-slate-950 rounded-2xl border border-cyan-600 p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Cinzel',serif]">
                  CONFIDENTIAL DISPATCH LOG
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveUnlockModal(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
                aria-label="Close dispatch log"
              >
                ✕
              </button>
            </div>

            <div className="text-xs font-mono text-cyan-400 mb-2">
              CALLSIGN: {activeUnlockModal.callsign} // FREQ: {activeUnlockModal.frequency} MHz
            </div>

            <pre className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-amber-300 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto mb-6">
              {activeUnlockModal.fullDispatchLog}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLog(activeUnlockModal)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copiedLog ? 'Copied Log!' : 'Copy Log to Clipboard'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadLog(activeUnlockModal)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export .TXT
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveUnlockModal(null)}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider transition-colors"
              >
                Return to Radio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
