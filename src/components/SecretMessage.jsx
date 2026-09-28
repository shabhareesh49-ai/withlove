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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#0284c7', '#38bdf8', '#f472b6', '#fbcfe8', '#fbbf24']
    });
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-xl w-full rounded-3xl p-8 sm:p-12 text-center glass-card border border-pink-200/90 shadow-xl overflow-hidden box-border mx-auto"
      >
        {/* Ambient talisman halo glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />

        {!isRevealed ? (
          <div className="relative z-10 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-pink-600 block">
              ONE LAST MYSTERY 🔐
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-pink-950 leading-snug">
              Wait...<br />There's still one more thing.
            </h3>

            {/* Beautiful Button: 💗 TAP THE SURPRISE 💗 */}
            <div className="pt-2 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
                aria-label="Tap the surprise"
              >
                <span>💗</span>
                <span>TAP THE SURPRISE</span>
                <span>💗</span>
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-6"
          >
            {/* Unlocked Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold shadow-xs">
              <span>🧿 Secret Protection Unlocked 🩷</span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950">
              {secretMessage.heading}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-4 max-w-md mx-auto text-sm sm:text-base text-pink-950/90 leading-relaxed font-light break-words [overflow-wrap:anywhere]">
              {secretMessage.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === secretMessage.paragraphs.length - 1 ? "font-serif text-lg sm:text-xl font-semibold text-pink-900 pt-2" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-3">
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
