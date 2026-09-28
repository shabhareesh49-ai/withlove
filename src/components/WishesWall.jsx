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
      color: "bg-[#fff5f7] border-pink-200 text-pink-950",
      tapeColor: "bg-pink-200/80",
      tag: "🌸 Family Blessing",
      date: "Birthday Blessings"
    },
    {
      id: 2,
      sender: "Shabrii ❤️",
      note: "To the certified funniest and most precious sister in the universe: keep being the ray of sunshine of this family. Always here for you, Paapu! 🎂🧿",
      color: "bg-[#fffdf2] border-amber-200 text-amber-950",
      tapeColor: "bg-amber-200/80",
      tag: "❤️ Brother's Note",
      date: "Brother's Note"
    },
    {
      id: 3,
      sender: "Family & Loved Ones ✨",
      note: "Happy Birthday Ankitha! May this new chapter of your life be filled with unforgettable adventures, big laughter, and dreams realized! 🌸✨",
      color: "bg-[#faf5ff] border-purple-200 text-purple-950",
      tapeColor: "bg-purple-200/80",
      tag: "✨ Warmest Wishes",
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
      bg: "bg-[#fff5f7] border-pink-200 text-pink-950",
      tape: "bg-pink-200/80",
      tag: "🌸 Pink Blessing"
    },
    amber: {
      bg: "bg-[#fffdf2] border-amber-200 text-amber-950",
      tape: "bg-amber-200/80",
      tag: "☀️ Warm Note"
    },
    purple: {
      bg: "bg-[#faf5ff] border-purple-200 text-purple-950",
      tape: "bg-purple-200/80",
      tag: "💜 Sweet Wish"
    },
    emerald: {
      bg: "bg-[#f2fdf7] border-emerald-200 text-emerald-950",
      tape: "bg-emerald-200/80",
      tag: "🍃 Evergreen Wish"
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
      tag: colorMap[selectedColor].tag,
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
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Header - Strictly Centered */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Pin className="w-3.5 h-3.5 text-pink-500" />
          <span>Sticky Notes & Memories 💌</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3 text-center">
          The Birthday Wishes Wall 📝🌸
        </h2>

        <p className="text-neutral-600 text-sm sm:text-base max-w-lg mx-auto mb-6 text-center leading-relaxed">
          Heartfelt notes and blessings left for Ankitha. Tap below to pin your own warm birthday note!
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4 text-white shrink-0" />
            <span>Leave a Note for Anku ✍️</span>
          </button>
        </div>
      </div>

      {/* Sticky Notes Grid: 1 on mobile, 2 on tablet, 3 on desktop - NEVER OVERLAPPING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-stretch">
        {wishes.map((w, idx) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow duration-300 ${w.color} w-full box-border`}
          >
            {/* Subtle decorative washi tape centered at top */}
            <div className={`w-20 h-3.5 mx-auto -mt-2 mb-3 ${w.tapeColor} rounded-sm shadow-xs border-b border-black/5 opacity-80`} />

            {/* Top metadata line with subtle flower / evil eye */}
            <div className="flex items-center justify-between gap-2 mb-3 text-xs opacity-75 font-semibold">
              <span className="text-[11px] font-sans text-neutral-500">{w.date}</span>
              <span className="flex items-center gap-1 text-xs">
                <span>🌸</span>
                <span>🧿</span>
              </span>
            </div>

            {/* Note content - safe wrapping */}
            <div className="my-auto py-2">
              <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed break-words [overflow-wrap:anywhere] [word-break:normal]">
                "{w.note}"
              </p>
            </div>

            {/* Sender signature */}
            <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-500">With love,</span>
              <span className="text-pink-700 font-script text-base sm:text-lg font-bold">
                {w.sender}
              </span>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 box-border"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm box-border"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm leading-relaxed box-border"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Sticky Note Color
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
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
