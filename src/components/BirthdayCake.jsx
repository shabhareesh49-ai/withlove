import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, Mic, MicOff, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function BirthdayCake() {
  const { birthdayCake } = birthdayData;
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micError, setMicError] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  const stopMic = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    setIsListeningMic(false);
  };

  const startMicBlowDetection = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError("Microphone detection is not supported on this browser — you can tap the button below instead! 🎂");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setIsListeningMic(true);

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let blowCount = 0;

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        // Low frequency wind noise from blowing into microphone
        let sum = 0;
        for (let i = 0; i < 35; i++) {
          sum += dataArray[i];
        }
        const avg = sum / 35;

        if (avg > 72) {
          blowCount++;
          if (blowCount >= 3) {
            stopMic();
            handleMakeWish();
            return;
          }
        } else {
          blowCount = Math.max(0, blowCount - 1);
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access error:", err);
      setMicError("Microphone permission was not granted — just tap the Make a Wish button below! 🎂");
      setIsListeningMic(false);
    }
  };

  useEffect(() => {
    return () => {
      stopMic();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleMakeWish = () => {
    if (candlesBlown) return;
    stopMic();

    // Haptic vibration on mobile
    triggerHaptic([60, 40, 60, 40, 120]);

    // Blow out sound & chimes
    audioController.playBlowOut();
    setCandlesBlown(true);

    setTimeout(() => {
      audioController.playMagicChime();
      setShowCelebration(true);

      // Grand confetti explosion
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#f472b6', '#ec4899', '#f59e0b', '#fbcfe8', '#38bdf8', '#ffffff']
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }, 400);
  };

  const handleRelight = () => {
    stopMic();
    audioController.playChime();
    setCandlesBlown(false);
    setShowCelebration(false);
    setMicError(null);
  };

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border transition-colors duration-1000 ${
      showCelebration ? "bg-gradient-to-b from-pink-100/50 via-rose-100/40 to-pink-50/50" : ""
    }`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Playful Intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-600 font-semibold text-sm sm:text-base tracking-wide mb-2"
        >
          {birthdayCake.intro}
        </motion.p>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-pink-950 mb-3"
        >
          {birthdayCake.title}
        </motion.h2>

        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto mb-10">
          {birthdayCake.instruction}
        </p>

        {/* 3D-styled SVG Birthday Cake */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 mx-auto mb-8 flex items-center justify-center">
          {/* Ambient Cake Glow */}
          <div className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            candlesBlown ? "bg-pink-300/20 opacity-40" : "bg-amber-300/30 opacity-70 animate-pulse"
          }`} />

          {/* SVG 3D Multi-Tier Cake */}
          <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="cakeBase1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>

              <linearGradient id="cakeBase2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#ffe4e6" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>

              <linearGradient id="frostingWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fff1f2" />
              </linearGradient>

              <linearGradient id="candleGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>

            {/* Cake Stand / Plate */}
            <ellipse cx="160" cy="275" rx="130" ry="25" fill="url(#plateGrad)" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 120 275 L 110 300 L 210 300 L 200 275 Z" fill="#94a3b8" opacity="0.4" />
            <ellipse cx="160" cy="300" rx="60" ry="10" fill="#64748b" opacity="0.3" />

            {/* Bottom Tier */}
            <path d="M 50 215 C 50 240, 270 240, 270 215 L 270 260 C 270 285, 50 285, 50 260 Z" fill="url(#cakeBase1)" />
            <ellipse cx="160" cy="215" rx="110" ry="24" fill="url(#frostingWhite)" stroke="#fbcfe8" strokeWidth="2" />

            {/* Bottom Tier Decorative Frosting Swirls */}
            <path d="M 50 220 Q 65 240 80 220 Q 95 240 110 220 Q 125 240 140 220 Q 155 240 170 220 Q 185 240 200 220 Q 215 240 230 220 Q 245 240 260 220 Q 270 230 270 220" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

            {/* Middle Tier */}
            <path d="M 80 155 C 80 175, 240 175, 240 155 L 240 195 C 240 215, 80 215, 80 195 Z" fill="url(#cakeBase2)" />
            <ellipse cx="160" cy="155" rx="80" ry="18" fill="url(#frostingWhite)" stroke="#fbcfe8" strokeWidth="2" />

            {/* Middle Tier Swirls */}
            <path d="M 80 160 Q 95 178 110 160 Q 125 178 140 160 Q 155 178 170 160 Q 185 178 200 160 Q 215 178 230 160 Q 240 170 240 160" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />

            {/* Little Cherries / Berries on Middle Tier */}
            <circle cx="95" cy="156" r="5" fill="#e11d48" />
            <circle cx="160" cy="168" r="6" fill="#e11d48" />
            <circle cx="225" cy="156" r="5" fill="#e11d48" />

            {/* Top Tier */}
            <path d="M 110 105 C 110 120, 210 120, 210 105 L 210 138 C 210 153, 110 153, 110 138 Z" fill="url(#cakeBase1)" />
            <ellipse cx="160" cy="105" rx="50" ry="14" fill="url(#frostingWhite)" stroke="#fbcfe8" strokeWidth="2" />

            {/* Sprinkles on top */}
            <line x1="130" y1="104" x2="137" y2="106" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="175" y1="105" x2="182" y2="108" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="110" x2="158" y2="111" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />

            {/* Center Candle */}
            <rect x="156" y="65" width="8" height="38" rx="3" fill="url(#candleGrad1)" stroke="#f59e0b" strokeWidth="1" />
            {/* Candle wick */}
            <line x1="160" y1="65" x2="160" y2="57" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

            {/* Center Flame (flickering or blown out) */}
            {!candlesBlown ? (
              <g className="animate-flame" style={{ transformOrigin: "160px 58px" }}>
                <path d="M 160 38 C 153 46, 154 55, 160 58 C 166 55, 167 46, 160 38 Z" fill="url(#flameGrad)" />
                <ellipse cx="160" cy="50" rx="3" ry="5" fill="#ffffff" opacity="0.8" />
              </g>
            ) : (
              /* Smoke puff after blown out */
              <g className="animate-ping" style={{ transformOrigin: "160px 50px" }}>
                <ellipse cx="160" cy="48" rx="4" ry="7" fill="#cbd5e1" opacity="0.6" />
              </g>
            )}

            {/* Left Candle */}
            <rect x="132" y="73" width="7" height="32" rx="2.5" fill="#fda4af" stroke="#f43f5e" strokeWidth="1" />
            <line x1="135.5" y1="73" x2="135.5" y2="67" stroke="#334155" strokeWidth="1.5" />
            {!candlesBlown && (
              <g className="animate-flame" style={{ transformOrigin: "135.5px 67px", animationDelay: "0.2s" }}>
                <path d="M 135.5 50 C 130 57, 131 64, 135.5 67 C 140 64, 141 57, 135.5 50 Z" fill="url(#flameGrad)" />
              </g>
            )}

            {/* Right Candle */}
            <rect x="181" y="73" width="7" height="32" rx="2.5" fill="#c084fc" stroke="#a855f7" strokeWidth="1" />
            <line x1="184.5" y1="73" x2="184.5" y2="67" stroke="#334155" strokeWidth="1.5" />
            {!candlesBlown && (
              <g className="animate-flame" style={{ transformOrigin: "184.5px 67px", animationDelay: "0.4s" }}>
                <path d="M 184.5 50 C 179 57, 180 64, 184.5 67 C 189 64, 190 57, 184.5 50 Z" fill="url(#flameGrad)" />
              </g>
            )}
          </svg>
        </div>

        {/* Wish Button or Wish Granted Message */}
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {!candlesBlown ? (
            <div className="flex flex-col items-center gap-4">
              {/* Mic Listening Status or Trigger */}
              {isListeningMic ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-rose-50 border-2 border-rose-300 text-rose-800 shadow-lg"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-6 h-6 rounded-full bg-rose-400 opacity-75 animate-ping" />
                    <Wind className="w-5 h-5 text-rose-600 relative z-10" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Listening... Blow gently into your microphone! 🌬️
                  </span>
                  <button
                    onClick={stopMic}
                    className="ml-2 text-xs font-bold text-neutral-500 hover:text-neutral-800 underline"
                  >
                    Cancel
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Primary Tap to Blow Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMakeWish}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-500/35 hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200 animate-spin [animation-duration:4s]" />
                    <span>{birthdayCake.buttonBlow}</span>
                    <span className="text-xl">🎂</span>
                  </motion.button>

                  {/* Secondary Mic Button */}
                  <button
                    onClick={startMicBlowDetection}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 hover:border-pink-300 shadow-md transition-all hover:scale-105"
                  >
                    <Mic className="w-4 h-4 text-pink-500" />
                    <span>Blow with Mic 🎙️</span>
                  </button>
                </div>
              )}

              {/* Friendly mic tip or permission note if needed */}
              {micError && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-pink-600/80 max-w-sm"
                >
                  {micError}
                </motion.p>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-pink-900 flex items-center justify-center gap-2">
                <span>{birthdayCake.wishGrantedTitle}</span>
              </h3>
              <p className="text-sm sm:text-base text-pink-700 max-w-md mx-auto">
                {birthdayCake.wishGrantedSub}
              </p>

              <button
                onClick={handleRelight}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-white transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
                <span>{birthdayCake.buttonRelight}</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
