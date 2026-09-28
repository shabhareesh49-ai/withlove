import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, Heart, Sparkles, Pin, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';

export default function WishesWall() {
  const defaultWishes = [
    {
      id: 1,
      sender: "Mom & Dad 🌸",
      note: "Happy Birthday Anku! Stay the kind, lovely, and smiling girl you have always been. May God bless you with health, peace, and endless joy! 🧿🩷",
      color: "bg-pink-50/90 border-pink-200 text-pink-950",
      tapeColor: "bg-pink-200/70",
      rotation: "-rotate-2",
      date: "Birthday Blessings"
    },
    {
      id: 2,
      sender: "Shabrii ❤️",
      note: "To the certified funniest and most precious sister in the universe: keep being the ray of sunshine of this family. Always here for you, Paapu! 🎂🧿",
      color: "bg-amber-50/90 border-amber-200 text-amber-950",
      tapeColor: "bg-amber-200/70",
      rotation: "rotate-2",
      date: "Brother's Note"
    },
    {
      id: 3,
      sender: "Family & Loved Ones ✨",
      note: "Happy Birthday Ankitha! May this new chapter of your life be filled with unforgettable adventures, big laughter, and dreams realized! 🌸✨",
      color: "bg-purple-50/90 border-purple-200 text-purple-950",
      tapeColor: "bg-purple-200/70",
      rotation: "-rotate-1",
      date: "Warmest Wishes"
    }
  ];

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('ankitha_wishes_wall');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return defaultWishes;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [wishText, setWishText] = useState('');
  const [selectedColor, setSelectedColor] = useState('pink');

  const colorMap = {
    pink: {
      bg: "bg-pink-50/90 border-pink-200 text-pink-950",
      tape: "bg-pink-200/70"
    },
    amber: {
      bg: "bg-amber-50/90 border-amber-200 text-amber-950",
      tape: "bg-amber-200/70"
    },
    purple: {
      bg: "bg-purple-50/90 border-purple-200 text-purple-950",
      tape: "bg-purple-200/70"
    },
    emerald: {
      bg: "bg-emerald-50/90 border-emerald-200 text-emerald-950",
      tape: "bg-emerald-200/70"
    }
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !wishText.trim()) return;

    triggerHaptic([40, 30, 80]);
    audioController.playMagicChime();

    const newWish = {
      id: Date.now(),
      sender: senderName.trim(),
      note: wishText.trim(),
      color: colorMap[selectedColor].bg,
      tapeColor: colorMap[selectedColor].tape,
      rotation: Math.random() > 0.5 ? "rotate-2" : "-rotate-2",
      date: "Just Now 🩷"
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('ankitha_wishes_wall', JSON.stringify(updated));
    } catch {}

    setSenderName('');
    setWishText('');
    setIsModalOpen(false);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#38bdf8', '#c084fc']
    });
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Pin className="w-3.5 h-3.5 text-pink-500" />
          <span>Sticky Notes & Memories</span>
          <span>💌</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          The Birthday Wishes Wall 📝🌸
        </h2>

        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
          Heartfelt notes left for Ankitha on her special day. Tap the button to leave your own warm wish!
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4 text-white" />
          <span>Leave a Note for Anku ✍️</span>
        </button>
      </div>

      {/* Sticky Notes Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
        {wishes.map((w, idx) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className={`relative p-6 sm:p-7 rounded-2xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 ${w.color} ${w.rotation} select-none`}
          >
            {/* Washi tape on top */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 ${w.tapeColor} border-t border-b border-black/10 backdrop-blur-sm -rotate-1 rounded-sm shadow-sm pointer-events-none`} />

            {/* Top Pin Emblem */}
            <div className="flex items-center justify-between mb-3 text-xs opacity-75 font-semibold">
              <span className="font-serif italic">{w.date}</span>
              <span>🧿</span>
            </div>

            {/* Note text */}
            <p className="font-letter-handwriting text-xl sm:text-2xl leading-relaxed mb-4">
              "{w.note}"
            </p>

            {/* Sender Signature */}
            <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs font-bold font-serif">
              <span>With Love,</span>
              <span className="text-pink-700 text-sm font-script font-bold">{w.sender}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <span className="text-3xl mb-1 block">💌</span>
                <h3 className="font-serif text-2xl font-bold text-pink-950">
                  Write a Birthday Note for Anku
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  It will be pinned to her virtual birthday board forever!
                </p>
              </div>

              <form onSubmit={handleAddWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Shabrii, Mom, Uncle..."
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Write your sweet birthday wish for Ankitha... 🩷"
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm leading-relaxed"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Sticky Note Color
                  </label>
                  <div className="flex items-center gap-3">
                    {[
                      { key: 'pink', bg: 'bg-pink-100 border-pink-300', label: 'Pink 🌸' },
                      { key: 'amber', bg: 'bg-amber-100 border-amber-300', label: 'Gold ☀️' },
                      { key: 'purple', bg: 'bg-purple-100 border-purple-300', label: 'Lavender 💜' },
                      { key: 'emerald', bg: 'bg-emerald-100 border-emerald-300', label: 'Mint 🍃' }
                    ].map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setSelectedColor(c.key)}
                        className={`px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${c.bg} ${
                          selectedColor === c.key ? 'ring-2 ring-pink-500 scale-105' : 'opacity-70'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-all"
                  >
                    Pin Note to Board 📌
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
