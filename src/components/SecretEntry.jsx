import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function SecretEntry({ onUnlock }) {
  const [opening, setOpening] = useState(false);
  const { secretEntry } = birthdayData;

  const handleOpen = () => {
    setOpening(true);
    triggerHaptic([60, 40, 80]);
    audioController.playChime();

    // Start background music box loop on user interaction
    if (!audioController.isPlaying) {
      audioController.toggleMusic(birthdayData.audioSrc);
    }

    // Elegant confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#c084fc', '#ffffff']
    });

    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1f0d22] via-[#2c1330] to-[#140616] p-4 text-white overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[18%] left-[12%] text-2xl animate-float opacity-40">✨</span>
        <span className="absolute top-[28%] right-[15%] text-2xl animate-float opacity-35 [animation-delay:1.5s]">🩷</span>
        <span className="absolute bottom-[22%] left-[18%] text-2xl animate-float opacity-30 [animation-delay:2.5s]">🧿</span>
        <span className="absolute bottom-[30%] right-[20%] text-xl animate-float opacity-40 [animation-delay:3s]">✨</span>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 max-w-lg w-full text-center px-6 py-12 rounded-3xl glass-card-dark border border-pink-500/20 backdrop-blur-2xl"
      >
        {/* Glowing badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Surprise Encrypted 🔒</span>
          <span>🧿</span>
        </motion.div>

        {/* Text sequence */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-pink-100 mb-4"
        >
          {secretEntry.greeting}
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg sm:text-xl font-light text-pink-200/90 mb-3"
        >
          {secretEntry.message}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-xs sm:text-sm text-pink-300/70 italic mb-8"
        >
          {secretEntry.hint}
        </motion.p>

        {/* Open Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <button
            onClick={handleOpen}
            disabled={opening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <Gift className={`w-5 h-5 text-pink-100 transition-transform duration-300 ${opening ? "rotate-45" : "group-hover:rotate-12"}`} />
            <span className="tracking-wide">
              {opening ? "Unlocking Magic... ✨" : secretEntry.buttonText}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
