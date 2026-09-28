import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, MessageCircle, RefreshCw, CheckCircle2, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';

const COUPONS = [
  {
    id: 1,
    icon: "🍟",
    title: "The Unlimited Food Treat Pass",
    desc: "Shabrii treats you to your favorite snacks or meal — no questions, no limits, no sharing required. 🍕✨",
    code: "ANKU-FOODIE-VIP",
    whatsappText: "Hey Shabrii! 🍟 I just scratched and unlocked 'The Unlimited Food Treat Pass' on my birthday site! When are you taking me out for food? 😋🩷"
  },
  {
    id: 2,
    icon: "👑",
    title: "'Sister Is 100% Right' Card",
    desc: "Valid for winning 1 argument automatically, anytime, anywhere. Shabrii must surrender immediately. 😂",
    code: "ANKU-ALWAYS-RIGHT",
    whatsappText: "Hey Shabrii! 👑 I just scratched and unlocked the 'Sister Is 100% Right' card! You officially have zero comeback rights on the next debate! 😂💅"
  },
  {
    id: 3,
    icon: "☕",
    title: "The 2:00 AM Rant & Debrief Line",
    desc: "Guaranteed 100% patient listening session for any drama, life update, or random late-night thoughts.",
    code: "ANKU-LATE-NIGHT-CHAT",
    whatsappText: "Hey Shabrii! ☕ I just unlocked the '2:00 AM Rant & Debrief Line'! Get ready for my next 45-minute daily update! 🎙️🩷"
  },
  {
    id: 4,
    icon: "🧿",
    title: "Lifetime Sibling Guardian Shield",
    desc: "Unlimited protection, unconditional sibling backup, and endless blessings. Valid for eternity. 🩷",
    code: "ANKU-ETERNAL-SHIELD",
    whatsappText: "Hey Shabrii! 🧿 I just unlocked the 'Lifetime Sibling Guardian Shield'! Thank you for always having my back no matter what! 🫂❤️"
  }
];

export default function SisterScratchCard() {
  const [selectedCouponIdx, setSelectedCouponIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const coupon = COUPONS[selectedCouponIdx];

  // Initialize canvas scratch surface
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw luxury rose-gold metallic foil
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fda4af');
    grad.addColorStop(0.3, '#f43f5e');
    grad.addColorStop(0.5, '#fb7185');
    grad.addColorStop(0.7, '#f472b6');
    grad.addColorStop(1, '#ec4899');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative sparkles and texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 60; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Scratch prompt text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 15px sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 6;
    ctx.fillText('✨ SCRATCH WITH FINGER / MOUSE ✨', width / 2, height / 2 - 12);
    ctx.font = '13px sans-serif';
    ctx.fillText('🎁 Secret Sister Pass Inside 🧿', width / 2, height / 2 + 14);
    ctx.shadowBlur = 0;

    setIsRevealed(false);
    setScratchPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, [selectedCouponIdx]);

  // Scratch action
  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    triggerHaptic([10]);

    // Check completion roughly every few frames
    if (Math.random() > 0.6) {
      calculateProgress(ctx, canvas.width, canvas.height);
    }
  };

  const calculateProgress = (ctx, w, h) => {
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparent = 0;
      const step = 32; // sampling step for speed
      let totalSamples = 0;

      for (let i = 3; i < pixels.length; i += 4 * step) {
        totalSamples++;
        if (pixels[i] < 128) {
          transparent++;
        }
      }

      const percent = Math.round((transparent / totalSamples) * 100);
      setScratchPercent(percent);

      if (percent > 42 && !isRevealed) {
        revealCard();
      }
    } catch (e) {}
  };

  const revealCard = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    triggerHaptic([60, 40, 80, 40, 120]);
    audioController.playMagicChime();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#f59e0b', '#38bdf8', '#8b5cf6']
    });
  };

  const handlePointerDown = (e) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  const handleRedeemWhatsApp = () => {
    triggerHaptic([40]);
    audioController.playChime();
    const text = encodeURIComponent(coupon.whatsappText);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 px-4 relative z-10 max-w-3xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-200 shadow-sm">
          <Ticket className="w-3.5 h-3.5 text-pink-500" />
          <span>Birthday Surprise Scratch Card 🎟️</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-2">
          Scratch & Win, Anku! 🎁
        </h2>
        <p className="text-sm text-neutral-600 font-light">
          Use your finger or mouse to scratch off the golden pink coating and reveal your special sibling voucher.
        </p>
      </div>

      {/* Coupon Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {COUPONS.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              if (selectedCouponIdx !== idx) {
                triggerHaptic([25]);
                audioController.playChime();
                setSelectedCouponIdx(idx);
              }
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedCouponIdx === idx
                ? "bg-pink-600 text-white shadow-md shadow-pink-500/25 scale-105"
                : "bg-white/80 hover:bg-white text-pink-800 border border-pink-200/80"
            }`}
          >
            <span>{c.icon}</span>
            <span>Pass #{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* The Scratch Card Container */}
      <div className="relative mx-auto max-w-md w-full aspect-[16/10] min-h-[260px] rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/80 bg-gradient-to-br from-amber-50 via-white to-pink-50 flex flex-col items-center justify-center p-6 text-center select-none">
        {/* Hidden Prize Inside */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-3xl shadow-lg text-white">
            {coupon.icon}
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-pink-600 bg-pink-100/90 px-2.5 py-0.5 rounded-full">
            {coupon.code}
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
            {coupon.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-xs leading-relaxed font-light">
            {coupon.desc}
          </p>

          <span className="text-[10px] text-pink-900/60 font-medium">
            Sealed by Shabrii • Lifetime Guarantee 🧿
          </span>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 z-20 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* Actions Beneath Scratch Card */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {!isRevealed ? (
          <button
            onClick={revealCard}
            className="text-xs text-pink-700 font-semibold underline underline-offset-4 hover:text-pink-900 transition-colors"
          >
            Can't scratch? Tap to reveal instantly ✨
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={handleRedeemWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Redeem with Shabrii on WhatsApp 💬</span>
            </button>

            <button
              onClick={initCanvas}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-50 shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
              <span>Scratch Again 🔁</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
