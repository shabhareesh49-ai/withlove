import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { audioController, triggerHaptic } from '../utils/audio';

export default function LoveShowerButton() {
  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem('ankitha_love_showers');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [particles, setParticles] = useState([]);

  const emojis = ['🩷', '🌸', '🧿', '✨', '🎂', '💖', '🥰'];

  const handleClick = (e) => {
    triggerHaptic([35]);
    audioController.playBell(587.33 + Math.random() * 400, 0.8, 0, 0.1);

    const newCount = count + 1;
    setCount(newCount);
    try {
      localStorage.setItem('ankitha_love_showers', newCount.toString());
    } catch {}

    // Spawn 5 burst particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      startX: rect.left + rect.width / 2,
      startY: rect.top,
      offsetX: (Math.random() - 0.5) * 120,
      offsetY: -(120 + Math.random() * 140),
      rotate: (Math.random() - 0.5) * 60,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          title="Send Love & Blessings to Ankitha"
          aria-label="Send Love to Ankitha"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-pink-700 shadow-xl border border-pink-200 backdrop-blur-md transition-all select-none"
        >
          {/* Glowing pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-pink-400/20 blur-sm group-hover:bg-pink-400/40 transition-all pointer-events-none" />

          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse group-hover:scale-125 transition-transform" />
          
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight">
            <span className="hidden sm:inline">Shower Love</span>
            <span className="px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-800 text-[11px] font-mono">
              {count > 0 ? count : '🩷'}
            </span>
          </div>
          <span className="text-xs">🧿</span>
        </motion.button>
      </div>

      {/* Floating Animated Hearts & Blessings Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: p.startX,
                y: p.startY,
                opacity: 1,
                scale: 0.6,
                rotate: 0,
              }}
              animate={{
                x: p.startX + p.offsetX,
                y: p.startY + p.offsetY,
                opacity: 0,
                scale: 1.6,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute text-2xl select-none"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
