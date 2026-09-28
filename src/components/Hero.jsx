import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import SmartImage from './SmartImage';

export default function Hero({ onScrollDown }) {
  const { hero, photos } = birthdayData;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-20 w-full max-w-[1200px] mx-auto box-border overflow-hidden">
      {/* Soft background ambient gradient blooms */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-300/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-200/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
        {/* Top subtle tag: "FOR MY FAVORITE SISTER 🌸🧿" */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
          <span>FOR MY FAVORITE SISTER 🌸🧿</span>
        </motion.div>

        {/* Ankitha Portrait Frame - Clean & Free of any overlapping badges */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-300 opacity-60 blur-md transition-opacity duration-700 animate-pulse-glow" />

          {/* Portrait Container */}
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full p-1.5 bg-white shadow-xl backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-pink-200/80 shadow-inner">
              <SmartImage
                src={photos.portrait}
                alt="Ankitha Portrait"
                priority={true}
                placeholderLabel="Ankitha 🩷"
                placeholderSub="Place ankitha-portrait.jpg in public/images/ or select below"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Headings: Clean, Centered, Strictly No Overlapping Emojis */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-3 mb-6 w-full text-center"
        >
          {/* "Happy Birthday," centered cleanly without any badges */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-pink-700/90 font-medium italic block">
            Happy Birthday,
          </h2>

          {/* "Ankitha 🩷🧿" centered below "Happy Birthday" */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-pink-950 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-pink-gradient">{hero.headingName}</span>
            <span className="inline-flex items-center gap-1.5 select-none font-normal text-3xl sm:text-5xl md:text-6xl">
              <span>🩷</span>
              <span>🧿</span>
            </span>
          </h1>

          {/* "Ankuuuu... Kandaa... Paapu..." centered below her name */}
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-pink-600 font-semibold tracking-wide pt-1">
            {hero.nicknamesList}
          </p>
        </motion.div>

        {/* Emotional Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-sm sm:text-base md:text-lg text-neutral-700 font-light max-w-xl mx-auto leading-relaxed mb-8 px-2"
        >
          {hero.emotionalQuote}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="group inline-flex flex-col items-center gap-1.5 text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors cursor-pointer"
        >
          <span className="tracking-wide group-hover:translate-y-0.5 transition-transform">
            {hero.scrollText}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/90 border border-pink-200 flex items-center justify-center shadow-xs group-hover:shadow group-hover:scale-110 transition-all animate-bounce [animation-duration:2s]">
            <ChevronDown className="w-4 h-4 text-pink-500" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
