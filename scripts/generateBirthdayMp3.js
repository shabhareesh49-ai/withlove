import fs from 'fs';
import path from 'path';
import lamejs from 'lamejs';

const sampleRate = 44100;
const channels = 1;
const kbps = 128;

// Note frequencies in Hz
const notes = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  REST: 0,
};

// Happy Birthday melody: [note, duration in beats]
const bpm = 110;
const beatSeconds = 60 / bpm;

const melody = [
  // Measure 1
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['F4', 1.0], ['E4', 2.0],
  // Measure 2
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['G4', 1.0], ['F4', 2.0],
  // Measure 3
  ['C4', 0.75], ['C4', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 1.5],
  // Measure 4
  ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 2.5],
  ['REST', 1.0],
  // Repeat with octave sparkle
  ['C5', 0.75], ['C5', 0.25], ['D5', 1.0], ['C5', 1.0], ['F5', 1.0], ['E5', 2.0],
  ['C5', 0.75], ['C5', 0.25], ['D5', 1.0], ['C5', 1.0], ['G5', 1.0], ['F5', 2.0],
  ['C5', 0.75], ['C5', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 1.5],
  ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 3.0],
  ['REST', 1.5]
];

// Calculate total samples
let totalDuration = 0;
melody.forEach(([_, beats]) => {
  totalDuration += beats * beatSeconds;
});

const totalSamples = Math.ceil(totalDuration * sampleRate);
const audioBuffer = new Float32Array(totalSamples);

// Music box tone generator
let currentSample = 0;
melody.forEach(([noteName, beats]) => {
  const duration = beats * beatSeconds;
  const numSamples = Math.floor(duration * sampleRate);
  const freq = notes[noteName] || 0;

  if (freq > 0) {
    // Generate chime / music box bell
    const decayTime = Math.max(duration * 1.4, 1.2); // bell ring decay
    const decaySamples = Math.floor(decayTime * sampleRate);

    for (let i = 0; i < decaySamples; i++) {
      const idx = currentSample + i;
      if (idx >= totalSamples) break;

      const t = i / sampleRate;
      // Envelope: fast attack, exponential bell decay
      const env = Math.exp(-t * 2.8);

      // Fundamental + 2nd & 3rd harmonic for music-box kalimba timbre
      const s1 = Math.sin(2 * Math.PI * freq * t) * 0.55;
      const s2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.25;
      const s3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.12;
      const s4 = Math.sin(2 * Math.PI * freq * 4.2 * t) * 0.05; // metallic chime sheen

      audioBuffer[idx] += (s1 + s2 + s3 + s4) * env * 0.45;
    }
  }

  currentSample += numSamples;
});

// Normalize & convert Float32 to Int16
const samples = new Int16Array(totalSamples);
let maxPeak = 0;
for (let i = 0; i < totalSamples; i++) {
  if (Math.abs(audioBuffer[i]) > maxPeak) maxPeak = Math.abs(audioBuffer[i]);
}

const scale = maxPeak > 0 ? 0.85 / maxPeak : 1;
for (let i = 0; i < totalSamples; i++) {
  const val = Math.max(-1, Math.min(1, audioBuffer[i] * scale));
  samples[i] = val < 0 ? val * 0x8000 : val * 0x7FFF;
}

// Encode to MP3 using lamejs
const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
const mp3Data = [];

const sampleBlockSize = 1152;
for (let i = 0; i < samples.length; i += sampleBlockSize) {
  const sampleChunk = samples.subarray(i, i + sampleBlockSize);
  const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
  if (mp3buf.length > 0) {
    mp3Data.push(Buffer.from(mp3buf));
  }
}

const mp3End = mp3encoder.flush();
if (mp3End.length > 0) {
  mp3Data.push(Buffer.from(mp3End));
}

// Ensure target directory exists
const targetDir = path.resolve('public', 'audio');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetPath = path.join(targetDir, 'birthday-music.mp3');
fs.writeFileSync(targetPath, Buffer.concat(mp3Data));

console.log(`Successfully generated MP3 at ${targetPath} (${Math.round(totalDuration)}s, ${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB)`);
