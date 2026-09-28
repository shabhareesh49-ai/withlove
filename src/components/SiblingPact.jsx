import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCheck, Sparkles, Check, Heart, Shield, Printer, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';
import { birthdayData } from '../data/birthdayContent';

export default function SiblingPact() {
  const [isSigned, setIsSigned] = useState(() => {
    try {
      return localStorage.getItem('ankitha_sibling_pact_signed') === 'true';
    } catch {
      return false;
    }
  });

  const [signatureDate, setSignatureDate] = useState(() => {
    try {
      return localStorage.getItem('ankitha_sibling_pact_date') || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Today';
    }
  });

  const handleSign = () => {
    triggerHaptic([60, 40, 80, 40, 120]);
    audioController.playMagicChime();
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setIsSigned(true);
    setSignatureDate(today);

    try {
      localStorage.setItem('ankitha_sibling_pact_signed', 'true');
      localStorage.setItem('ankitha_sibling_pact_date', today);
    } catch {}

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#38bdf8', '#8b5cf6']
    });
  };

  const handlePrint = () => {
    triggerHaptic([30]);
    audioController.playChime();
    window.print();
  };

  const clauses = [
    {
      number: "Clause 1.1",
      title: "The Universal Food Tax 🍟",
      text: "Party B (Anku) reserves the irrevocable right to claim 50% of any fries, dessert, or food ordered by Party A (Shabrii), even after explicitly stating: 'No, I'm not hungry'."
    },
    {
      number: "Clause 1.2",
      title: "The 45-Minute Daily Debrief 🎙️",
      text: "Party A (Shabrii) agrees to patiently listen to full cinematic recaps of daily gossip, complete with character voices, side plots, and dramatic eye rolls."
    },
    {
      number: "Clause 1.3",
      title: "The Lifetime Evil Eye Warranty 🧿",
      text: "Party A pledges 24/7 protection against bad vibes, fake people, and bad days. Party B is permanently designated as precious, irreplaceable, and cherished."
    },
    {
      number: "Clause 1.4",
      title: "No Returns, No Exchanges Policy 🔒",
      text: "This sibling partnership is lifetime guaranteed. Neither party can trade the other for a quieter sibling. Bond is sealed for eternity."
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border print:p-0 print:m-0 print:max-w-none">
      {/* Background ambient blush */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-200/30 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-200/60 shadow-sm">
          <FileCheck className="w-3.5 h-3.5 text-pink-500" />
          <span>Legally Binding Sibling Document 📜</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          The Official Sibling Pact ✍️
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 font-light">
          Drafted with love, governed by laughter, and sealed between Shabrii and Ankitha.
        </p>
      </div>

      {/* Parchment Pact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#fffdfa] rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl border-2 border-amber-200/70 overflow-hidden print:border-none print:shadow-none"
      >
        {/* Subtle vintage border ornament */}
        <div className="absolute inset-2 sm:inset-4 border border-dashed border-amber-300/60 rounded-2xl pointer-events-none" />

        {/* Vintage Header Stamp */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-amber-200/80">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">
              Department of Sibling Affairs • Ref #ANKU-BFF-2026
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950 mt-1">
              Agreement of Perpetual Siblinghood 🩷
            </h3>
          </div>
          <div className="flex items-center gap-2 text-2xl bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200/60 shadow-inner">
            <span>🧿</span>
            <span>✨</span>
            <span>🌸</span>
          </div>
        </div>

        {/* Clauses Grid */}
        <div className="relative z-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {clauses.map((clause, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-white/80 border border-amber-100 hover:border-pink-300 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  {clause.number}
                </span>
                <span className="text-amber-500 text-xs">★ ★ ★</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-neutral-900 mb-2">
                {clause.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {clause.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Signatures & Seal Section */}
        <div className="relative z-10 pt-8 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          {/* Party A: Shabrii */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">
              Party A (Brother & Sponsor)
            </span>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50">
              <span className="font-script text-3xl sm:text-4xl text-pink-700 font-bold block">
                Shabrii ❤️
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                Signed with Infinite Love & Care
              </span>
            </div>
          </div>

          {/* Party B: Ankitha */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">
              Party B (Birthday Queen & Sister)
            </span>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex items-center justify-between min-h-[72px]">
              {isSigned ? (
                <div>
                  <span className="font-script text-3xl sm:text-4xl text-pink-600 font-bold block">
                    Ankitha 🩷
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Signed & Ratified on {signatureDate}
                  </span>
                </div>
              ) : (
                <div className="w-full text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSign}
                    className="w-full py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Tap to Sign as Ankitha ✍️</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 pt-8 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-neutral-600">
              {isSigned ? "Status: Legally Sealed & Active forever 📜" : "Status: Awaiting Sister's Signature ✍️"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 hover:border-pink-300 text-neutral-700 hover:text-pink-600 shadow-sm transition-all text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Keepsake</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
