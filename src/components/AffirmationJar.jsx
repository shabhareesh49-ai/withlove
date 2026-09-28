import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, Feather, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';

export default function AffirmationJar() {
  const affirmations = [
    {
      id: 1,
      tag: "When you feel overwhelmed 🩷",
      text: "You don't always have to carry the whole world. You are allowed to take a breath, relax, and know that you are deeply loved just as you are.",
    },
    {
      id: 2,
      tag: "On chasing your dreams ✨",
      text: "Whatever goal or dream you are quietly working towards, I believe in you 100%. You have the courage and talent to make it happen.",
    },
    {
      id: 3,
      tag: "Family reminder 🧿",
      text: "Our family is infinitely warmer, happier, and more fun because you are in it. You are the heart of the home.",
    },
    {
      id: 4,
      tag: "Your daily superpower 🌸",
      text: "Your smile has a natural magic that turns tough days around. Never let anyone or anything take that away from you.",
    },
    {
      id: 5,
      tag: "Sibling bond truth 😂🫶",
      text: "Even when you steal my snacks or start arguments over nothing, you are still my favorite sister in the galaxy.",
    },
    {
      id: 6,
      tag: "Eternal protection 🧿",
      text: "Badi nazar na lage — you are forever protected by brotherly love, good vibes, and prayers.",
    },
    {
      id: 7,
      tag: "Unconditional support ❤️",
      text: "No matter how much life changes or where we go, remember you always have a brother standing right behind you. Always. — Shabrii",
    },
    {
      id: 8,
      tag: "Pure essence ✨",
      text: "Never change the softness and sincerity of your heart. In a noisy world, your kind heart is your greatest beauty.",
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleDrawNote = () => {
    triggerHaptic([40, 30, 80]);
    audioController.playMagicChime();
    setIsOpening(true);

    setTimeout(() => {
      // Pick random different note
      setCurrentIdx((prev) => {
        let next = Math.floor(Math.random() * affirmations.length);
        if (next === prev) next = (prev + 1) % affirmations.length;
        return next;
      });
      setIsOpen(true);
      setIsOpening(false);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#f472b6', '#fbcfe8', '#fbbf24', '#fde68a']
      });
    }, 350);
  };

  const activeNote = affirmations[currentIdx];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Stars className="w-3.5 h-3.5 text-pink-500" />
          <span>Little Reminders from Shabrii</span>
          <span>🫙✨</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          The Sister Affirmation Jar 🫙
        </h2>

        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto">
          Whenever you need a little warmth or a gentle reminder, tap the jar to draw an folded note from your brother.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-6 sm:p-10 glass-card border border-pink-200/90 shadow-xl overflow-hidden max-w-xl mx-auto text-center"
      >
        {/* Glowing jar illustration / button */}
        <div className="py-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleDrawNote}
            className="group relative inline-flex flex-col items-center gap-3 p-6 rounded-full bg-gradient-to-b from-white/90 to-pink-50/80 hover:bg-white border-2 border-pink-300 shadow-xl transition-all"
            aria-label="Draw note from jar"
          >
            {/* Glowing halo */}
            <span className="absolute -inset-2 rounded-full bg-amber-200/40 blur-lg group-hover:bg-pink-300/50 transition-all pointer-events-none" />

            <div className="text-5xl sm:text-6xl animate-bounce [animation-duration:2.8s]">
              🫙
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700 group-hover:text-pink-900 transition-colors uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin [animation-duration:3s]" />
              <span>{isOpen ? "Draw Another Note ✨" : "Tap Jar to Draw a Note 💌"}</span>
            </div>
          </motion.button>
        </div>

        {/* Unfolded Note Paper */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key={currentIdx}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fff9f5] to-[#fff4fa] border border-pink-200 shadow-lg text-left relative overflow-hidden"
            >
              {/* Note Corner Stamp */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-500">
                  {activeNote.tag}
                </span>
                <span className="text-sm">🧿</span>
              </div>

              {/* Note Text */}
              <p className="font-letter-handwriting text-2xl sm:text-3xl text-neutral-800 leading-relaxed">
                "{activeNote.text}"
              </p>

              {/* Note Footer */}
              <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-pink-600">
                <span>With love, always</span>
                <span className="font-serif font-bold text-pink-700">— Shabrii ❤️</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
