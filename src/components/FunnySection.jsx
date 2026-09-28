import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Laugh, Sparkles, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function FunnySection() {
  const { funnySection } = birthdayData;
  const [factIndex, setFactIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCardClick = () => {
    triggerHaptic([30]);
    audioController.playChime();
  };

  const handleNextFact = () => {
    triggerHaptic([40]);
    audioController.playBell(784, 0.6, 0, 0.12);
    setIsSpinning(true);
    setTimeout(() => {
      setFactIndex((prev) => (prev + 1) % (funnySection.bonusFacts?.length || 1));
      setIsSpinning(false);
    }, 200);
  };

  return (
    <section className="py-24 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Playful Warning Banner */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ rotate: -2, scale: 0.95 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-amber-800 text-xs font-bold tracking-widest uppercase shadow-sm mb-6"
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>{funnySection.badge}</span>
          <span className="text-sm">⚠️</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-pink-950 whitespace-pre-line tracking-tight mb-4"
        >
          {funnySection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-neutral-600 text-sm sm:text-base max-w-md mx-auto"
        >
          {funnySection.subtitle}
        </motion.p>
      </div>

      {/* Funny Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {funnySection.cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.025, rotate: idx % 2 === 0 ? 1 : -1 }}
            onClick={handleCardClick}
            className="cursor-pointer group relative p-7 rounded-3xl glass-card border border-pink-200/90 hover:border-pink-400 hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300"
          >
            {/* Funny Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                {card.emoji}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                {card.tag}
              </span>
            </div>

            {/* Funny Title */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">
              {card.title}
            </h4>

            {/* Funny Quote */}
            <p className="font-serif text-xl sm:text-2xl font-bold text-pink-950 whitespace-pre-line leading-snug">
              {card.content}
            </p>

            {/* Little reaction cue */}
            <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between text-xs text-neutral-400 group-hover:text-pink-600 transition-colors">
              <span>Verified 100% accurate</span>
              <span className="text-sm">😂</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Sister Secret Generator */}
      {funnySection.bonusFacts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 sm:p-8 rounded-3xl glass-card border border-pink-200/90 text-center max-w-2xl mx-auto shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">🔮</span>
            <span className="text-xs uppercase font-bold tracking-widest text-pink-600">
              The Sister Oracle • Confidential Fact
            </span>
          </div>

          <div className="min-h-[70px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-lg sm:text-xl md:text-2xl text-pink-950 font-medium leading-relaxed italic"
              >
                "{funnySection.bonusFacts[factIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-5">
            <button
              onClick={handleNextFact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-pink-500 ${isSpinning ? "animate-spin" : ""}`} />
              <span>Tap for Another Secret Fact 😂</span>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
