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
    <footer className="relative py-28 px-4 text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-300/30 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-2xl mb-2">🧿 🌸 🩷</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-pink-950">
            {finalScreen.title}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-xl sm:text-2xl text-pink-900/80 italic whitespace-pre-line leading-relaxed"
        >
          "{finalScreen.subtitle}"
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-2"
        >
          <span className="font-script text-4xl sm:text-5xl text-pink-600 font-bold drop-shadow-sm">
            {finalScreen.signature}
          </span>
        </motion.div>

        {/* Action Buttons: WhatsApp Hug + Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendHug}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{hugSent ? "Hug Sent to Shabrii! 🩷🫂" : finalScreen.whatsappButtonText}</span>
          </motion.button>

          <button
            onClick={handleShareLink}
            title="Share this surprise link with family"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all border border-pink-200"
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied! 📋✨</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-pink-500" />
                <span>Share Surprise 🔗</span>
              </>
            )}
          </button>

          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all border border-pink-200"
          >
            <ArrowUp className="w-3.5 h-3.5 text-pink-500" />
            <span>Scroll Back to Top</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="pt-10 text-[11px] text-pink-400/80 uppercase tracking-widest font-sans">
          {finalScreen.copyright}
        </div>
      </div>
    </footer>
  );
}
