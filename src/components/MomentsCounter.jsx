import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, Smile, Infinity, Sun } from 'lucide-react';
import { audioController, triggerHaptic } from '../utils/audio';

export default function MomentsCounter() {
  const [activeCard, setActiveCard] = useState(null);

  const stats = [
    {
      id: 1,
      icon: "😂",
      value: "∞",
      label: "Shared Laughs",
      sub: "From uncontrollable giggles to random funny stories that only siblings understand.",
      secret: "Scientifically responsible for at least 80% of family smiles!"
    },
    {
      id: 2,
      icon: "🩷",
      value: "100%",
      label: "Heart of Gold",
      sub: "Always caring, quietly checking on people, and spreading genuine warmth.",
      secret: "Her kindness is what makes her truly beautiful."
    },
    {
      id: 3,
      icon: "🧿",
      value: "1 in 8B",
      label: "One in a Billion",
      sub: "A sister so precious that only the evil-eye talisman can protect her.",
      secret: "Badi nazar na lage — forever cherished by Shabrii!"
    },
    {
      id: 4,
      icon: "✨",
      value: "365+",
      label: "New Days Ahead",
      sub: "A brand new year of sweet memories, peace, and dreams coming true.",
      secret: "This year belongs to Ankitha. May every day be special!"
    }
  ];

  const handleCardClick = (stat) => {
    triggerHaptic([35]);
    audioController.playBell(700 + stat.id * 100, 0.9, 0, 0.12);
    setActiveCard(activeCard === stat.id ? null : stat.id);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Moments That Matter</span>
          <span>🩷</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3"
        >
          The Ankitha Impact ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto"
        >
          Some things can never be captured in numbers, but if we had to measure your presence in our lives:
        </motion.p>
      </div>

      {/* Grid of 4 Milestone Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const isSelected = activeCard === s.id;

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleCardClick(s)}
              className={`cursor-pointer rounded-3xl p-6 glass-card border-2 transition-all duration-300 relative select-none ${
                isSelected
                  ? "border-pink-400 bg-white/95 shadow-xl shadow-pink-200/50"
                  : "border-pink-200/80 hover:border-pink-300 bg-white/75 shadow-md"
              }`}
            >
              {/* Icon & Mini badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {s.icon}
                </span>
                <span className="text-[11px] font-semibold text-pink-400">
                  {isSelected ? "Fold" : "Tap for note"}
                </span>
              </div>

              {/* Big Stat Value */}
              <div className="font-serif text-3xl sm:text-4xl font-black text-pink-950 mb-1">
                {s.value}
              </div>

              {/* Stat Title */}
              <h3 className="font-serif text-lg font-bold text-pink-900 mb-2">
                {s.label}
              </h3>

              {/* Sub description */}
              <p className="text-neutral-600 text-xs leading-relaxed">
                {s.sub}
              </p>

              {/* Expanded Secret Note */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-3 mt-3 border-t border-pink-100 text-xs font-semibold text-pink-700 italic"
                  >
                    "{s.secret}"
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
