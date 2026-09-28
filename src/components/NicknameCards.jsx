import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Laugh, ShieldAlert, Heart, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function NicknameCards() {
  const { nicknamesSection } = birthdayData;
  const [openedCards, setOpenedCards] = useState({
    ankuu: true, // open the first by default as an invitation
    kandaa: false,
    paapu: false,
  });

  const toggleCard = (id) => {
    triggerHaptic([35]);
    audioController.playChime();
    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="nicknames-section" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>The Three Personas</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          {nicknamesSection.title}
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base max-w-lg mx-auto">
          {nicknamesSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nicknamesSection.cards.map((card, idx) => {
          const isOpen = openedCards[card.id];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              onClick={() => toggleCard(card.id)}
              className={`relative cursor-pointer rounded-3xl p-6 sm:p-7 glass-card transition-all duration-300 border-2 select-none ${
                isOpen
                  ? "border-pink-400 bg-white/95 shadow-xl shadow-pink-200/50"
                  : "border-pink-200/80 hover:border-pink-300 bg-white/70 shadow-md"
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700">
                  {card.tag}
                </span>
                <span className="text-xs text-pink-400">
                  {isOpen ? "Tap to fold" : "Tap to reveal"}
                </span>
              </div>

              {/* Big Nickname */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950 mb-3 flex items-center justify-between">
                <span>{card.name}</span>
                <span className={`text-base transition-transform duration-300 ${isOpen ? "rotate-90 text-pink-500" : "text-neutral-400"}`}>
                  <ChevronRight className="w-5 h-5" />
                </span>
              </h3>

              {/* Revealable meaning */}
              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden pt-3 border-t border-pink-100"
                  >
                    <p className="text-pink-900/90 text-base leading-relaxed font-normal">
                      "{card.meaning}"
                    </p>
                  </motion.div>
                ) : (
                  <div className="pt-2 text-xs text-pink-600/70 italic flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Click to unlock the real meaning ✨</span>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
