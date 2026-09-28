import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, Sparkles, X, Heart, Image as ImageIcon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioController, triggerHaptic } from '../utils/audio';

export default function PhotoBooth({ isOpen, onClose, onPinMemory }) {
  const [photoSrc, setPhotoSrc] = useState(null);
  const [caption, setCaption] = useState('Happy Birthday Anku! 🩷');
  const [selectedSticker, setSelectedSticker] = useState('🧿');
  const [frameTint, setFrameTint] = useState('white');
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef(null);

  const stickers = ['🧿', '🩷', '🌸', '👑', '🎂', '✨', '🥰'];

  const frameTints = [
    { id: 'white', label: 'Classic White', bg: '#ffffff', tape: 'rgba(251, 207, 232, 0.7)' },
    { id: 'blush', label: 'Blush Pink', bg: '#fff0f5', tape: 'rgba(244, 114, 182, 0.6)' },
    { id: 'cream', label: 'Warm Cream', bg: '#fefcf8', tape: 'rgba(253, 230, 138, 0.7)' },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic([30]);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoSrc(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render canvas whenever inputs change
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 600;
    const height = 750;
    canvas.width = width;
    canvas.height = height;

    const currentTint = frameTints.find((t) => t.id === frameTint) || frameTints[0];

    // Background Polaroid Card
    ctx.fillStyle = currentTint.bg;
    ctx.fillRect(0, 0, width, height);

    // Subtle border
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Photo Area (Aspect ratio: 500x500 square)
    const photoX = 50;
    const photoY = 70;
    const photoSize = 500;

    if (photoSrc) {
      const img = new Image();
      img.src = photoSrc;
      img.onload = () => {
        // Draw image cover centered
        ctx.save();
        ctx.beginPath();
        ctx.rect(photoX, photoY, photoSize, photoSize);
        ctx.clip();

        const imgRatio = img.width / img.height;
        let drawWidth = photoSize;
        let drawHeight = photoSize;
        let drawX = photoX;
        let drawY = photoY;

        if (imgRatio > 1) {
          drawWidth = photoSize * imgRatio;
          drawX = photoX - (drawWidth - photoSize) / 2;
        } else {
          drawHeight = photoSize / imgRatio;
          drawY = photoY - (drawHeight - photoSize) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();

        drawOverlays(ctx, width, height, currentTint);
      };
    } else {
      // Placeholder photo box
      ctx.fillStyle = '#fce7f3';
      ctx.fillRect(photoX, photoY, photoSize, photoSize);

      ctx.fillStyle = '#db2777';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Select a photo below 📸', width / 2, photoY + photoSize / 2);

      drawOverlays(ctx, width, height, currentTint);
    }
  }, [photoSrc, caption, selectedSticker, frameTint, isOpen]);

  const drawOverlays = (ctx, width, height, currentTint) => {
    // Top Washi Tape
    ctx.save();
    ctx.translate(width / 2, 35);
    ctx.rotate(-0.03);
    ctx.fillStyle = currentTint.tape;
    ctx.fillRect(-100, -14, 200, 28);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.strokeRect(-100, -14, 200, 28);
    ctx.restore();

    // Sticker in corner of photo
    if (selectedSticker) {
      ctx.font = '40px serif';
      ctx.textAlign = 'center';
      ctx.fillText(selectedSticker, width - 75, 115);
    }

    // Bottom Handwritten Caption
    ctx.fillStyle = '#37203b';
    ctx.font = 'bold 36px "Caveat", "Dancing Script", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(caption || 'Ankitha 🩷', width / 2, 645);

    // Subtle Sibling Signature in bottom corner
    ctx.fillStyle = '#ec4899';
    ctx.font = 'italic 16px serif';
    ctx.textAlign = 'right';
    ctx.fillText('From Shabrii ❤️  🧿', width - 50, 715);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    triggerHaptic([40, 30, 80]);
    audioController.playMagicChime();
    setIsExporting(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#fbbf24', '#38bdf8', '#ffffff']
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `ankitha-birthday-keepsake-${Date.now()}.png`;
    a.click();

    setTimeout(() => setIsExporting(false), 1000);
  };

  const handlePin = () => {
    if (!photoSrc) return;
    triggerHaptic([50]);
    audioController.playChime();

    if (onPinMemory) {
      onPinMemory({
        id: Date.now(),
        image: photoSrc,
        caption: caption || 'Special Moment 🩷',
        subcaption: 'Added from Sister Photo Booth',
        rotation: Math.random() > 0.5 ? 'rotate-2' : '-rotate-2',
        date: 'Photo Booth'
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          aria-label="Close photo booth"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-pink-500" />
            <span>Sister Photo Booth 📸</span>
            <span>🧿</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
            Create a Polaroid Keepsake
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Customize a memory polaroid with stickers, your handwritten caption, and download or pin it!
          </p>
        </div>

        {/* Layout: Canvas Preview + Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Canvas Preview Area */}
          <div className="flex flex-col items-center justify-center p-3 bg-neutral-100/70 rounded-2xl border border-pink-100 shadow-inner">
            <canvas
              ref={canvasRef}
              className="max-h-[380px] w-auto h-auto rounded-lg shadow-md border border-neutral-200"
            />
          </div>

          {/* Customization Controls */}
          <div className="space-y-4">
            {/* Photo Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Choose Photo
              </label>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-all w-full justify-center">
                <ImageIcon className="w-4 h-4 text-pink-500" />
                <span>{photoSrc ? 'Change Photo 📸' : 'Select from Device 🖼️'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Caption Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Polaroid Caption
              </label>
              <input
                type="text"
                value={caption}
                maxLength={45}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Best sister ever 🩷"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-medium"
              />
            </div>

            {/* Sticker Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Decorative Sticker
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {stickers.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedSticker(st)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                      selectedSticker === st
                        ? 'bg-pink-100 border-2 border-pink-500 scale-110 shadow-sm'
                        : 'bg-neutral-50 hover:bg-pink-50 border border-neutral-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Tint Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Polaroid Frame Style
              </label>
              <div className="flex items-center gap-2">
                {frameTints.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFrameTint(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      frameTint === t.id
                        ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-pink-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Saving Image...' : 'Download Image 📥'}</span>
              </button>

              {photoSrc && (
                <button
                  type="button"
                  onClick={handlePin}
                  className="py-3 px-4 rounded-full bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Pin to Gallery 📌</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
