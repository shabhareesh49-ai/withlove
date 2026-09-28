/**
 * Audio Utility: Provides delicate music-box synthesis, chime sound effects,
 * and seamless fallback between local MP3 audio and Web Audio API synthesis.
 */

class BirthdayAudioController {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.audioElement = null;
    this.musicBoxTimer = null;
    this.useSynth = true;
    this.currentNoteIndex = 0;
    this.melodyIndex = 0;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isPlaying);
      } catch (e) {
        console.error(e);
      }
    });
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, dreamy music-box / kalimba bell note
  playBell(freq, duration = 1.2, time = 0, volume = 0.15) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + time;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm sine + soft triangle for music-box chime feel
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic sparkle

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Chime burst for surprise / button clicks
  playChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      this.playBell(freq, 1.0, idx * 0.07, 0.12);
    });
  }

  // Wish granted magic chime
  playMagicChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    notes.forEach((freq, idx) => {
      this.playBell(freq, 1.4, idx * 0.09, 0.14);
    });
  }

  // Soft candle blow-out whoosh sound
  playBlowOut() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.2));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  // Start continuous music-box loop with multiple selectable melodies
  startMusicBoxLoop() {
    this.init();
    const melodies = [
      // Melody 0: Happy Birthday to you (Gentle slow music-box style)
      [
        { f: 261.63, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 293.66, d: 1.0 }, { f: 261.63, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 329.63, d: 2.0 },
        { f: 261.63, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 293.66, d: 1.0 }, { f: 261.63, d: 1.0 }, { f: 392.00, d: 1.0 }, { f: 349.23, d: 2.0 },
        { f: 261.63, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 523.25, d: 1.0 }, { f: 440.00, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 329.63, d: 1.0 }, { f: 293.66, d: 2.0 },
        { f: 466.16, d: 0.5 }, { f: 466.16, d: 0.5 }, { f: 440.00, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 392.00, d: 1.0 }, { f: 349.23, d: 2.5 }
      ],
      // Melody 1: Dreamy Starlight Lullaby
      [
        { f: 293.66, d: 1.0 }, { f: 220.00, d: 1.0 }, { f: 246.94, d: 1.0 }, { f: 185.00, d: 1.0 },
        { f: 196.00, d: 1.0 }, { f: 146.83, d: 1.0 }, { f: 196.00, d: 1.0 }, { f: 220.00, d: 1.0 },
        { f: 293.66, d: 0.8 }, { f: 329.63, d: 0.8 }, { f: 369.99, d: 1.0 }, { f: 293.66, d: 1.0 },
        { f: 440.00, d: 1.2 }, { f: 369.99, d: 1.0 }, { f: 293.66, d: 2.2 }
      ]
    ];

    const currentMelody = melodies[this.melodyIndex % melodies.length];
    let noteIdx = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const item = currentMelody[noteIdx];
      // Play octave higher for dreamy music box
      this.playBell(item.f * 1.5, item.d * 1.3, 0, 0.12);

      // Play soft harmony on key notes
      if (noteIdx % 4 === 0) {
        this.playBell(item.f * 0.75, 2.0, 0, 0.05);
      }

      noteIdx = (noteIdx + 1) % currentMelody.length;
      const delay = (item.d * 680) + (noteIdx === 0 ? 1500 : 0);
      this.musicBoxTimer = setTimeout(playNext, delay);
    };

    playNext();
  }

  // Switch between ambient melodies
  switchMelody() {
    this.melodyIndex = (this.melodyIndex + 1) % 2;
    if (this.isPlaying && this.useSynth) {
      if (this.musicBoxTimer) clearTimeout(this.musicBoxTimer);
      this.startMusicBoxLoop();
    }
    this.notify();
    return this.melodyIndex;
  }

  // Toggle Background Music
  async toggleMusic(audioUrl) {
    this.init();

    if (this.isPlaying) {
      this.stop();
      return false;
    }

    this.isPlaying = true;
    this.notify();

    // Check if an external audio file exists and is playable
    if (audioUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio(audioUrl);
        this.audioElement.loop = true;
      }
      try {
        await this.audioElement.play();
        this.useSynth = false;
        this.notify();
        return true;
      } catch (err) {
        // Fallback to internal Web Audio synth music box
        this.startMusicBoxLoop();
        this.useSynth = true;
        this.notify();
        return true;
      }
    } else {
      this.startMusicBoxLoop();
      this.useSynth = true;
      this.notify();
      return true;
    }
  }

  // Play user-uploaded custom audio file
  playCustomAudio(fileUrl) {
    this.stop();
    this.audioElement = new Audio(fileUrl);
    this.audioElement.loop = true;
    this.isPlaying = true;
    this.useSynth = false;
    this.audioElement.play().catch((err) => {
      console.warn("Could not play custom audio:", err);
    });
    this.notify();
  }

  stop() {
    this.isPlaying = false;
    if (this.musicBoxTimer) {
      clearTimeout(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }
}

export const audioController = new BirthdayAudioController();

export const triggerHaptic = (pattern = [40]) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore vibration error if not supported/permitted
    }
  }
};
