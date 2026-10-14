'use client';

/**
 * Web Audio API Ambient Sound & Tactile Interaction Engine
 * Generates lightweight analog vinyl/tape atmosphere and subtle mechanical UI feedback.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private isInitialized: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hh_audio_muted');
      this.isMuted = saved !== null ? saved === 'true' : true;
    }
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
    if (typeof window !== 'undefined') {
      localStorage.setItem('hh_audio_muted', String(this.isMuted));
    }
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.createAmbientAtmosphere();
      this.isInitialized = true;
    } catch {
      // Ignore if Web Audio is unsupported
    }
  }

  private createAmbientAtmosphere() {
    if (!this.ctx) return;

    // Master Ambient Gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.045, this.ctx.currentTime);
    this.ambientGain.connect(this.ctx.destination);

    // 1. Sub-bass cinematic warm drone (55Hz / A1)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    const osc1Gain = this.ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    osc1.connect(osc1Gain);
    osc1Gain.connect(this.ambientGain);
    osc1.start();

    // 2. Harmonic Fifth (82.4Hz / E2)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(82.41, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, this.ctx.currentTime);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    osc2.connect(filter);
    filter.connect(osc2Gain);
    osc2Gain.connect(this.ambientGain);
    osc2.start();

    // 3. Ultra-subtle analog noise texture
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambientGain);
    whiteNoise.start();
  }

  public toggleMute(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.045, now, 0.35);
    }

    this.notify();
    this.playClick();
    return this.isMuted;
  }

  public playClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignore click audio errors
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = typeof window !== 'undefined' ? new SoundEngine() : (null as unknown as SoundEngine);
