import fs from 'fs';
import path from 'path';

const sampleRate = 44100;
const numChannels = 1;
const bitsPerSample = 16;

// Frequencies for Happy Birthday
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

const bpm = 115;
const beatSec = 60 / bpm;

const melody = [
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['F4', 1.0], ['E4', 2.0],
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['G4', 1.0], ['F4', 2.0],
  ['C4', 0.75], ['C4', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 1.5],
  ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 2.5],
  ['REST', 0.8],
  ['C5', 0.75], ['C5', 0.25], ['D5', 1.0], ['C5', 1.0], ['F5', 1.0], ['E5', 2.0],
  ['C5', 0.75], ['C5', 0.25], ['D5', 1.0], ['C5', 1.0], ['G5', 1.0], ['F5', 2.0],
  ['C5', 0.75], ['C5', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 1.5],
  ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 3.0],
  ['REST', 1.0],
];

let totalDuration = 0;
melody.forEach(([_, beats]) => {
  totalDuration += beats * beatSec;
});

const totalSamples = Math.ceil(totalDuration * sampleRate);
const audioBuffer = new Float32Array(totalSamples);

let currentSample = 0;
melody.forEach(([noteName, beats]) => {
  const duration = beats * beatSec;
  const numSamples = Math.floor(duration * sampleRate);
  const freq = notes[noteName] || 0;

  if (freq > 0) {
    const decayTime = Math.max(duration * 1.5, 1.3);
    const decaySamples = Math.floor(decayTime * sampleRate);

    for (let i = 0; i < decaySamples; i++) {
      const idx = currentSample + i;
      if (idx >= totalSamples) break;

      const t = i / sampleRate;
      const env = Math.exp(-t * 2.7);

      const s1 = Math.sin(2 * Math.PI * freq * t) * 0.5;
      const s2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.22;
      const s3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.1;
      const s4 = Math.sin(2 * Math.PI * freq * 4 * t) * 0.04;

      audioBuffer[idx] += (s1 + s2 + s3 + s4) * env * 0.5;
    }
  }

  currentSample += numSamples;
});

// Normalize
let maxVal = 0;
for (let i = 0; i < totalSamples; i++) {
  if (Math.abs(audioBuffer[i]) > maxVal) maxVal = Math.abs(audioBuffer[i]);
}
const scale = maxVal > 0 ? 0.85 / maxVal : 1;

// Build standard RIFF / WAVE header
const dataByteLength = totalSamples * numChannels * (bitsPerSample / 8);
const headerByteLength = 44;
const totalFileLength = headerByteLength + dataByteLength;
const buffer = Buffer.alloc(totalFileLength);

// "RIFF"
buffer.write('RIFF', 0);
buffer.writeUInt32LE(totalFileLength - 8, 4);
buffer.write('WAVE', 8);

// "fmt "
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // audioFormat (1 = PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28); // byteRate
buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32); // blockAlign
buffer.writeUInt16LE(bitsPerSample, 34);

// "data"
buffer.write('data', 36);
buffer.writeUInt32LE(dataByteLength, 40);

// Write PCM samples
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const clamped = Math.max(-1, Math.min(1, audioBuffer[i] * scale));
  const intSample = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
  buffer.writeInt16LE(intSample, offset);
  offset += 2;
}

// Ensure public/audio exists
const audioDir = path.resolve('public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Write to public/audio/birthday-music.mp3
const targetFile = path.join(audioDir, 'birthday-music.mp3');
fs.writeFileSync(targetFile, buffer);

console.log(`Generated audio file: ${targetFile} (${(buffer.length / 1024).toFixed(1)} KB, ~${Math.round(totalDuration)}s)`);
