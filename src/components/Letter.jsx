import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart, Eye, Play, FastForward, RotateCcw, Printer } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';

export default function Letter() {
  const { letter } = birthdayData;
  const fullText = [
    letter.salutation,
    "",
    ...letter.paragraphs,
    "",
    letter.closing,
    "",
    letter.signature,
    letter.author
  ].join("\n");

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Typewriter effect controller
  useEffect(() => {
    if (!hasStarted) return;
    if (displayedLength < fullText.length && isTyping) {
      const timer = setTimeout(() => {
        // speed up slightly on whitespace or punctuation
        const char = fullText[displayedLength];
        const step = char === '\n' ? 1 : 2;
        setDisplayedLength((prev) => Math.min(prev + step, fullText.length));
      }, 22);
      return () => clearTimeout(timer);
    } else if (displayedLength >= fullText.length) {
      setIsTyping(false);
    }
  }, [displayedLength, isTyping, hasStarted, fullText]);

  const handleStartTyping = () => {
    setHasStarted(true);
    setIsTyping(true);
  };

  const handleShowAll = () => {
    setHasStarted(true);
    setIsTyping(false);
    setDisplayedLength(fullText.length);
  };

  const handleReplay = () => {
    setDisplayedLength(0);
    setIsTyping(true);
    setHasStarted(true);
  };

  return (
    <section className="py-24 px-4 relative z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-pink-500" />
          <span>The Heart of This Gift</span>
          <span className="text-xs">🧿</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-pink-950 mb-3"
        >
          {letter.heading}
        </motion.h2>

        {/* Typewriter Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {!hasStarted ? (
            <button
              onClick={handleStartTyping}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 text-white text-xs sm:text-sm font-semibold hover:bg-pink-700 shadow-md shadow-pink-500/25 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Read Letter (Typewriter Mode)</span>
            </button>
          ) : (
            <>
              {displayedLength < fullText.length && (
                <button
                  onClick={handleShowAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-medium hover:bg-pink-50 shadow-sm transition-all"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Show Full Letter</span>
                </button>
              )}
              {displayedLength >= fullText.length && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-medium hover:bg-pink-50 shadow-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Letter</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    title="Print or Save as PDF Keepsake"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-800 text-xs font-semibold shadow-sm transition-all"
                  >
                    <Printer className="w-3.5 h-3.5 text-pink-600" />
                    <span>Save / Print Keepsake 📜</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Handwritten Letter Card (Parchment Paper) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8 },
        }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-[#fffdfa] via-[#fffaf5] to-[#fff3f8] p-6 sm:p-10 md:p-14 rounded-3xl shadow-2xl border border-pink-200/90 overflow-hidden"
      >
        {/* Subtle lined paper watermarks */}
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Vintage Postmark Stamp Top Right */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 border-2 border-dashed border-pink-300 rounded-xl px-3 py-1.5 text-center rotate-3 pointer-events-none select-none">
          <span className="block text-[10px] uppercase tracking-widest text-pink-400 font-bold">Express Delivery</span>
          <span className="block text-xs font-serif font-bold text-pink-700">FOR ANKITHA 🩷</span>
        </div>

        {/* Letter Content */}
        <div className="relative z-10">
          {!hasStarted ? (
            <div
              onClick={handleStartTyping}
              className="cursor-pointer py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shadow-inner animate-bounce">
                <Mail className="w-8 h-8" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-pink-900 font-semibold">
                Tap here to open and read Shabrii's letter... 💌
              </p>
              <p className="text-xs sm:text-sm text-pink-600/70 italic">
                A personal message straight from the heart
              </p>
            </div>
          ) : (
            <div className="font-letter-handwriting text-xl sm:text-2xl md:text-3xl text-neutral-800 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide">
              {fullText.slice(0, displayedLength)}
              {isTyping && (
                <span className="inline-block w-2.5 h-6 bg-pink-500 ml-1 animate-pulse align-middle" />
              )}
            </div>
          )}
        </div>

        {/* Wax Seal at the bottom */}
        {hasStarted && displayedLength >= fullText.length && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 pt-6 border-t border-pink-200/60 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              {/* Wax Seal Emblem */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-700 via-rose-600 to-pink-500 shadow-lg flex items-center justify-center text-white text-xs font-bold border-2 border-pink-300">
                <span>SHABRII</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-pink-900 uppercase tracking-widest">Original & Authentic</span>
                <span className="block text-[11px] text-pink-600">Written with pure brotherly love ❤️</span>
              </div>
            </div>

            <div className="text-2xl">
              🧿 🌸 🩷
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
