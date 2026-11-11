/**
 * Dead Air Web Audio Synthesizer
 * 
 * Generates analog radio textures, heterodyne tuning tones, static noise,
 * and signal lock chimes dynamically via Web Audio API.
 * 
 * Strict constraints:
 * - NO autoplay. AudioContext only initialises on explicit user click/interaction.
 * - Respects prefers-reduced-motion and user mute settings.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private isMuted: boolean = true; // Muted by default

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public enableAudio(): boolean {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    }
    return !this.isMuted;
  }

  public disableAudio() {
    this.isMuted = true;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.enableAudio();
    } else {
      this.disableAudio();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Continuous static noise generator modulated by tuning quality.
   * proximity = 0 (loud white noise/static), proximity = 1 (clear silence/carrier)
   */
  public updateTuningNoise(proximity: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    if (!this.noiseNode) {
      this.startContinuousNoise();
    }

    if (this.noiseGain && this.noiseFilter) {
      // As proximity reaches 1 (locked signal), static level drops to near-zero
      const targetGain = Math.max(0.01, (1 - proximity) * 0.25);
      const targetFreq = 800 + (1 - proximity) * 4000;
      this.noiseGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
      this.noiseFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    }
  }

  public stopTuningNoise() {
    if (this.noiseGain && this.ctx) {
      this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
  }

  private startContinuousNoise() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.value = 2500;
    this.noiseFilter.Q.value = 1.5;

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.15;

    this.noiseNode.connect(this.noiseFilter);
    this.noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  /**
   * Quick mechanical dial tick
   */
  public playDialTick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.03);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * Resonant carrier sweep tone when approaching a frequency
   */
  public playHeterodyneTone(frequencyHz: number, volume: number = 0.05) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequencyHz, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Signal lock chime: two rising harmonized tones indicating successful tune
   */
  public playLockChime() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    [440, 659.25, 880].forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.36);
    });
  }

  /**
   * Digital 00:07 transmission telegraph beep
   */
  public playTransmissionBeep() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1047, now); // C6 note
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.13);
  }
}

export const audioSynth = new SoundEngine();
