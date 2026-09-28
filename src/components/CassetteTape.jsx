import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCw, Sparkles, Disc, Volume2, Mic, Upload, Heart } from 'lucide-react';
import { audioController, triggerHaptic } from '../utils/audio';

export default function CassetteTape() {
  const [isPlaying, setIsPlaying] = useState(audioController.isPlaying);
  const [isFlipped, setIsFlipped] = useState(false); // Side A vs Side B
  const [voiceNoteUploaded, setVoiceNoteUploaded] = useState(false);
  const [voiceNoteName, setVoiceNoteName] = useState("");

  useEffect(() => {
    setIsPlaying(audioController.isPlaying);
    const unsub = audioController.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => unsub();
  }, []);

  const handleTogglePlay = async () => {
    triggerHaptic([30]);
    if (isPlaying) {
      audioController.stop();
    } else {
      audioController.startSynth();
    }
  };

  const handleFlip = () => {
    triggerHaptic([40]);
    audioController.playChime();
    setIsFlipped(!isFlipped);
    audioController.switchMelody();
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic([50]);
      audioController.playMagicChime();
      const url = URL.createObjectURL(file);
      audioController.playCustomAudio(url);
      setVoiceNoteUploaded(true);
      setVoiceNoteName(file.name.slice(0, 16) + '...');
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-200/35 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-200/80 shadow-sm">
          <Disc className="w-3.5 h-3.5 text-pink-500 animate-spin" />
          <span>Vintage Sibling Audio Deck 📼</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-2">
          Anku's Birthday Mixtape 🎶
        </h2>
        <p className="text-sm text-neutral-600 font-light">
          A retro cassette recorded with warm memories, sibling laughs, and birthday melodies.
        </p>
      </div>

      {/* Cassette 3D Card with Flip */}
      <div className="perspective-1000 max-w-md mx-auto">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full aspect-[16/10] min-h-[250px] sm:min-h-[270px] rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-pink-300/80 bg-gradient-to-br from-pink-900 via-neutral-900 to-rose-950 text-white select-none overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle screws in corners */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>

          {/* FRONT: SIDE A */}
          <div className={`absolute inset-4 flex flex-col justify-between ${isFlipped ? 'invisible' : 'visible'}`} style={{ backfaceVisibility: 'hidden' }}>
            {/* Top Label */}
            <div className="bg-[#fef9f3] text-neutral-900 px-4 py-2.5 rounded-xl border border-pink-200/90 shadow-inner flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-600 block">
                  SIDE A • 60 MIN STEREO
                </span>
                <h4 className="font-script text-xl sm:text-2xl font-bold text-pink-950 leading-none mt-0.5">
                  Anku's Birthday Tape 📼 Vol. 1
                </h4>
              </div>
              <span className="text-xl">🧿</span>
            </div>

            {/* Middle Window with Spools */}
            <div className="my-auto py-2 px-6 rounded-2xl bg-neutral-950/80 border border-pink-500/30 flex items-center justify-around shadow-inner relative">
              {/* Left Spool */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-pink-400/50 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  </div>
                  {/* Spool Teeth */}
                  <span className="absolute top-1 text-[8px] text-pink-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-pink-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-pink-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-pink-300">▶</span>
                </motion.div>
              </div>

              {/* Tape Center Window */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-pink-300/80 font-mono tracking-wider">
                  {isPlaying ? "PLAYING ▶" : "PAUSED ❚❚"}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1">
                  {voiceNoteUploaded ? voiceNoteName : "Handcrafted by Shabrii ❤️"}
                </span>
              </div>

              {/* Right Spool */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-pink-400/50 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  </div>
                  <span className="absolute top-1 text-[8px] text-pink-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-pink-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-pink-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-pink-300">▶</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Credits */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 px-2">
              <span>Track 1: Birthday Music Box 🎂</span>
              <span className="text-pink-400 font-semibold">HQ AUDIO</span>
            </div>
          </div>

          {/* BACK: SIDE B */}
          <div
            className={`absolute inset-4 flex flex-col justify-between ${isFlipped ? 'visible' : 'invisible'}`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            {/* Top Label */}
            <div className="bg-[#fef9f3] text-neutral-900 px-4 py-2.5 rounded-xl border border-pink-200/90 shadow-inner flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600 block">
                  SIDE B • ACOUSTIC DREAMS
                </span>
                <h4 className="font-script text-xl sm:text-2xl font-bold text-pink-950 leading-none mt-0.5">
                  Starlight Lullaby ✨
                </h4>
              </div>
              <span className="text-xl">🌸</span>
            </div>

            {/* Middle Window with Spools */}
            <div className="my-auto py-2 px-6 rounded-2xl bg-neutral-950/80 border border-purple-500/30 flex items-center justify-around shadow-inner relative">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-purple-400/50 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                  <span className="absolute top-1 text-[8px] text-purple-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-purple-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-purple-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-purple-300">▶</span>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-purple-300/80 font-mono tracking-wider">
                  {isPlaying ? "PLAYING ▶" : "PAUSED ❚❚"}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1">
                  Gentle Twilight Melody 🌌
                </span>
              </div>

              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-purple-400/50 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                  <span className="absolute top-1 text-[8px] text-purple-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-purple-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-purple-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-purple-300">▶</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Credits */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 px-2">
              <span>Track 2: Starlight Melody ✨</span>
              <span className="text-purple-400 font-semibold">SIDE B SPECIAL</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cassette Player Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleTogglePlay}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all ${
            isPlaying
              ? "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-500/25"
              : "bg-white hover:bg-neutral-50 text-pink-700 border border-pink-200"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause Tape Deck ⏸️</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-pink-600 text-pink-600" />
              <span>Play Tape Deck ▶️</span>
            </>
          )}
        </button>

        <button
          onClick={handleFlip}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-pink-800 border border-pink-200 text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <RotateCw className="w-3.5 h-3.5 text-pink-500" />
          <span>Flip to {isFlipped ? "Side A 📼" : "Side B 🌌"}</span>
        </button>

        <label
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 text-neutral-700 border border-neutral-200 text-xs sm:text-sm font-semibold shadow-sm transition-all"
          title="Play custom voice note or audio"
        >
          <Upload className="w-3.5 h-3.5 text-pink-500" />
          <span>{voiceNoteUploaded ? "Audio Loaded 🎙️" : "Drop Voice Note"}</span>
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleVoiceUpload}
          />
        </label>
      </div>
    </section>
  );
}
