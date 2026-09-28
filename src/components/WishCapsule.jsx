import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Lock, Unlock, Send, RefreshCw, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';

export default function WishCapsule() {
  const [wishText, setWishText] = useState('');
  const [sealedWish, setSealedWish] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ankitha_wish_capsule');
      if (saved) {
        setSealedWish(saved);
      }
    } catch {}
  }, []);

  const handleSealWish = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    triggerHaptic([60, 40, 80, 50, 100]);
    audioController.playMagicChime();

    try {
      localStorage.setItem('ankitha_wish_capsule', wishText.trim());
    } catch {}

    setSealedWish(wishText.trim());
    setWishText('');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#fbbf24', '#ffffff']
    });
  };

  const handleResetWish = () => {
    triggerHaptic([30]);
    audioController.playChime();
    try {
      localStorage.removeItem('ankitha_wish_capsule');
    } catch {}
    setSealedWish(null);
    setIsRevealed(false);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-7 sm:p-10 text-center glass-card border border-pink-200/90 shadow-xl overflow-hidden"
      >
        {/* Ambient background bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Feather className="w-3.5 h-3.5 text-pink-500" />
          <span>Ankitha's Time Capsule</span>
          <span>🍾</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-2">
          Seal a Wish for Your Year Ahead ✨
        </h3>

        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
          Write one dream, hope, or secret wish for this year. Once sealed, it stays safely locked in your digital capsule.
        </p>

        {!sealedWish ? (
          /* Form to input wish */
          <form onSubmit={handleSealWish} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="What is your biggest wish or happiest dream this year, Anku? 🩷"
                rows={4}
                className="w-full p-4 rounded-2xl bg-white/80 border border-pink-200/90 focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-300/40 text-neutral-800 text-sm sm:text-base leading-relaxed placeholder:text-neutral-400 placeholder:italic transition-all shadow-inner"
              />
              <span className="absolute bottom-3 right-3 text-xs text-neutral-400">
                🧿 Private
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={!wishText.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Lock className="w-4 h-4 text-pink-100" />
              <span>Seal in Time Capsule 🍾</span>
            </motion.button>
          </form>
        ) : (
          /* Sealed Capsule View */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-5 max-w-md mx-auto"
          >
            {/* Sealed Bottle Icon */}
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-100 to-amber-50 border-2 border-pink-300 flex items-center justify-center text-3xl shadow-md">
              <span className="animate-bounce [animation-duration:2.5s]">🍾</span>
              <span className="absolute -top-1 -right-1 text-sm">🧿</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-bold text-pink-900">
                Your Birthday Wish is Sealed 🩷
              </h4>
              <p className="text-xs text-pink-600/80">
                Locked safely in your time capsule. May the universe make it come true!
              </p>
            </div>

            {/* Read / Hide Wish */}
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 rounded-2xl bg-[#fffdf9] border border-pink-200/90 shadow-inner text-left font-letter-handwriting text-xl sm:text-2xl text-neutral-800 whitespace-pre-line leading-relaxed"
              >
                "{sealedWish}"
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRevealed(!isRevealed)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-50 shadow-sm transition-all"
              >
                {isRevealed ? <Lock className="w-3.5 h-3.5 text-pink-500" /> : <Unlock className="w-3.5 h-3.5 text-pink-500" />}
                <span>{isRevealed ? 'Hide Wish 🔒' : 'Peek at My Sealed Wish 📜'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetWish}
                title="Write a new wish"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/70 hover:bg-white text-neutral-500 hover:text-neutral-700 text-xs transition-all border border-pink-100"
              >
                <RefreshCw className="w-3 h-3 text-neutral-400" />
                <span>New Wish</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
