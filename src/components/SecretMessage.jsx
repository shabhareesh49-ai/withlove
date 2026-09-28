import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function SecretMessage() {
  const { secretMessage } = birthdayData;
  const [isRevealed, setIsRevealed] = useState(false);

  const handleUnlock = () => {
    if (isRevealed) return;
    triggerHaptic([60, 30, 80]);
    audioController.playMagicChime();
    setIsRevealed(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0284c7', '#38bdf8', '#f472b6', '#fbcfe8', '#fbbf24']
    });
  };

  return (
    <section className="py-24 px-4 relative z-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-8 sm:p-12 text-center glass-card border border-pink-200/80 shadow-2xl overflow-hidden"
      >
        {/* Ambient talisman halo glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl pointer-events-none" />

        {!isRevealed ? (
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-pink-500">
              One Last Mystery 🔒
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950">
              {secretMessage.suspense1}
            </h3>

            <p className="text-base sm:text-lg text-neutral-600 font-light max-w-sm mx-auto">
              {secretMessage.suspense2}
            </p>

            {/* Glowing Interactive Evil Eye */}
            <div className="py-4">
              <button
                onClick={handleUnlock}
                className="group relative inline-flex flex-col items-center gap-3 p-6 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-sky-300"
                aria-label="Tap the Evil Eye"
              >
                <div className="text-5xl sm:text-6xl animate-eye-glow select-none">
                  🧿
                </div>
                <span className="text-xs font-bold text-sky-800 tracking-wide uppercase group-hover:text-pink-600 transition-colors">
                  {secretMessage.instruction}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Unlocked Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
              <span>🧿 Secret Protection Unlocked 🩷</span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950">
              {secretMessage.heading}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-4 max-w-lg mx-auto text-base sm:text-lg text-pink-950/90 leading-relaxed font-light">
              {secretMessage.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === secretMessage.paragraphs.length - 1 ? "font-serif text-xl sm:text-2xl font-semibold text-pink-900 pt-2" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-4">
              <span className="font-script text-3xl sm:text-4xl text-pink-600 font-bold">
                {secretMessage.signature}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
