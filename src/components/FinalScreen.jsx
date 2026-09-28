import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUp, MessageCircle, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function FinalScreen({ onBackToTop }) {
  const { finalScreen } = birthdayData;
  const [hugSent, setHugSent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareLink = async () => {
    triggerHaptic([35]);
    audioController.playChime();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy Birthday Ankitha 🩷🧿",
          text: "A special surprise website made for Ankitha by Shabrii! 🎂✨",
          url: window.location.href,
        });
        return;
      } catch (err) {}
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch (err) {}
  };

  const handleSendHug = () => {
    triggerHaptic([50, 40, 60, 40, 100]);
    audioController.playMagicChime();
    setHugSent(true);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#38bdf8', '#c084fc', '#ffffff']
    });

    const phone = finalScreen.whatsappPhone ? finalScreen.whatsappPhone.replace(/[^0-9]/g, '') : '';
    const text = encodeURIComponent(finalScreen.whatsappMessage || "Happy Birthday Shabrii! 🩷");
    const whatsappUrl = phone
      ? `https://wa.me/${phone}?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <footer className="relative py-20 sm:py-24 px-4 sm:px-6 text-center overflow-hidden w-full max-w-[1200px] mx-auto box-border">
      {/* Soft birthday glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-pink-300/30 blur-[100px] pointer-events-none" />

      {/* Subtle floating decorative hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
        <span className="absolute top-1/4 left-[12%] text-lg animate-float" style={{ animationDelay: '0s' }}>🩷</span>
        <span className="absolute top-1/3 right-[14%] text-base animate-float" style={{ animationDelay: '1.5s' }}>🌸</span>
        <span className="absolute bottom-1/4 left-[20%] text-sm animate-float" style={{ animationDelay: '2.5s' }}>✨</span>
        <span className="absolute bottom-1/3 right-[18%] text-base animate-float" style={{ animationDelay: '0.8s' }}>🧿</span>
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Subtle emblem */}
        <div className="text-2xl select-none mb-2">
          🧿 🌸 🩷
        </div>

        {/* Main Final Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 leading-tight"
        >
          Happy Birthday, Ankitha 🩷🧿
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-pink-900/80 italic leading-relaxed whitespace-pre-line"
        >
          "Made with love,<br />a little craziness."
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-1"
        >
          <span className="font-script text-3xl sm:text-4xl text-pink-600 font-bold drop-shadow-xs">
            {finalScreen.signature}
          </span>
        </motion.div>

        {/* Action Buttons: Responsive & Never Overflowing */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSendHug}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>{hugSent ? "Hug Sent to Shabrii! 🩷🫂" : finalScreen.whatsappButtonText}</span>
          </motion.button>

          <button
            onClick={handleShareLink}
            title="Share this surprise link with family"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all border border-pink-200 cursor-pointer"
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-bold">Link Copied! 📋✨</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>Share Surprise 🔗</span>
              </>
            )}
          </button>

          <button
            onClick={onBackToTop}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all border border-pink-200 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 text-[11px] text-pink-400/80 uppercase tracking-widest font-sans">
          {finalScreen.copyright}
        </div>
      </div>
    </footer>
  );
}
