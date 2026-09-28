import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Smile, Shield } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';

export default function SpecialQualities() {
  const { specialQualities } = birthdayData;

  return (
    <section className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>The True Essence of Anku</span>
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3"
        >
          {specialQualities.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-600 text-sm sm:text-base max-w-md mx-auto"
        >
          {specialQualities.subtitle}
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialQualities.qualities.map((item, idx) => {
          // Span 2 columns on the last card if it's item 5 (to center or create balanced layout)
          const isLast = idx === specialQualities.qualities.length - 1;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`group relative rounded-3xl p-7 glass-card border border-pink-100/80 hover:border-pink-300 transition-all duration-300 ${
                isLast ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Subtle top corner decoration */}
              <div className="absolute top-4 right-4 text-xs font-mono text-pink-300 group-hover:text-pink-500 transition-colors">
                0{idx + 1}
              </div>

              {/* Icon avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 border border-pink-200/60 flex items-center justify-center text-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-pink-950 mb-2">
                {item.title}
              </h3>

              {/* Main quote */}
              <p className="text-pink-900 font-medium text-sm sm:text-base mb-3 leading-snug">
                "{item.description}"
              </p>

              {/* Gentle detail */}
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
