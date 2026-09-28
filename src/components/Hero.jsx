import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
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

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Top subtle tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs font-semibold uppercase tracking-wider shadow-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>{hero.tag}</span>
          <span className="text-sm">🧿</span>
        </motion.div>

        {/* Ankitha Portrait Frame */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 group"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-300 opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-700 animate-pulse-glow" />

          {/* Portrait Container */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1.5 bg-white/90 shadow-2xl backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-pink-200/60 shadow-inner">
              <SmartImage
                src={photos.portrait}
                alt="Ankitha Portrait"
                priority={true}
                placeholderLabel="Ankitha 🩷"
                placeholderSub="Place ankitha-portrait.jpg in public/images/"
                className="w-full h-full"
              />
            </div>

            {/* Little Evil Eye Badge floating on corner of portrait */}
            <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 bg-white/95 rounded-full p-1.5 shadow-md border border-pink-200 text-xl sm:text-2xl animate-bounce [animation-duration:3s]">
              🧿
            </div>

            {/* Little Heart Badge */}
            <div className="absolute top-2 left-2 bg-white/95 rounded-full p-1.5 shadow-md border border-pink-200 text-pink-500">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-500" />
            </div>
          </div>
        </motion.div>

        {/* Hero Headings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-3 mb-6"
        >
          <span className="block font-serif text-2xl sm:text-3xl text-pink-700/80 font-medium italic">
            {hero.headingPrefix}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-pink-950">
            <span className="text-pink-gradient">{hero.headingName}</span>{" "}
            <span className="inline-block hover:scale-125 transition-transform cursor-default">🩷</span>
            <span className="inline-block hover:scale-125 transition-transform cursor-default ml-1">🧿</span>
          </h1>
        </motion.div>

        {/* Nicknames Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-6"
        >
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-pink-600 font-semibold tracking-wide">
            {hero.nicknamesList}
          </p>
        </motion.div>

        {/* Emotional Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-neutral-700 font-light max-w-xl leading-relaxed mb-10 px-2"
        >
          {hero.emotionalQuote}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="group inline-flex flex-col items-center gap-1.5 text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
        >
          <span className="tracking-wide group-hover:translate-y-0.5 transition-transform">
            {hero.scrollText}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/80 border border-pink-200 flex items-center justify-center shadow-sm group-hover:shadow group-hover:scale-110 transition-all animate-bounce [animation-duration:2s]">
            <ChevronDown className="w-4 h-4 text-pink-500" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
