import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Sparkles, Camera, Plus, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import SmartImage from './SmartImage';
import PhotoBooth from './PhotoBooth';
import { audioController, triggerHaptic } from '../utils/audio';

export default function MemoryGallery() {
  const { memoryGallery } = birthdayData;
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [heartPops, setHeartPops] = useState({});
  const [isPhotoBoothOpen, setIsPhotoBoothOpen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);

  const [memoriesList, setMemoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('ankitha_pinned_memories');
      if (saved) {
        return [...memoryGallery.memories, ...JSON.parse(saved)];
      }
    } catch {}
    return memoryGallery.memories;
  });

  const handlePinMemory = (newMem) => {
    const updated = [...memoriesList, newMem];
    setMemoriesList(updated);
    try {
      const userAdded = updated.filter((m) => m.id > 10);
      localStorage.setItem('ankitha_pinned_memories', JSON.stringify(userAdded));
    } catch {}
  };

  const handlePhotoClick = (mem, e) => {
    e.stopPropagation();
    audioController.playChime();

    // Trigger local heart burst
    setHeartPops((prev) => ({ ...prev, [mem.id]: true }));
    setTimeout(() => {
      setHeartPops((prev) => ({ ...prev, [mem.id]: false }));
    }, 1000);

    setSelectedPhoto(mem);
    setIsSlideshow(false);
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto || memoriesList.length <= 1) return;
    triggerHaptic([25]);
    audioController.playBell(650, 0.4, 0, 0.08);
    const currentIndex = memoriesList.findIndex((m) => m.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % memoriesList.length;
    setSelectedPhoto(memoriesList[nextIndex]);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto || memoriesList.length <= 1) return;
    triggerHaptic([25]);
    audioController.playBell(500, 0.4, 0, 0.08);
    const currentIndex = memoriesList.findIndex((m) => m.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + memoriesList.length) % memoriesList.length;
    setSelectedPhoto(memoriesList[prevIndex]);
  };

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isSlideshow || !selectedPhoto) return;
    const timer = setInterval(() => {
      const currentIndex = memoriesList.findIndex((m) => m.id === selectedPhoto.id);
      const nextIndex = (currentIndex + 1) % memoriesList.length;
      setSelectedPhoto(memoriesList[nextIndex]);
    }, 3500);
    return () => clearInterval(timer);
  }, [isSlideshow, selectedPhoto, memoriesList]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        setIsSlideshow(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, memoriesList]);

  const handleStartSlideshow = () => {
    triggerHaptic([35]);
    audioController.playChime();
    setSelectedPhoto(memoriesList[0]);
    setIsSlideshow(true);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5 text-pink-500" />
          <span>Our Journey Through Time</span>
          <span className="text-xs">🧿</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          {memoryGallery.title}
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base max-w-md mx-auto mb-2">
          {memoryGallery.subtitle}
        </p>
        <p className="text-xs text-pink-500/80 italic mb-6">
          {memoryGallery.hint}
        </p>

        {/* Photo Gallery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              triggerHaptic([35]);
              setIsPhotoBoothOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4 text-pink-500" />
            <span>Create a Keepsake Polaroid 📸</span>
          </button>

          <button
            onClick={handleStartSlideshow}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs sm:text-sm font-semibold border border-pink-200 shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            <span>Play Slideshow Reel ▶️</span>
          </button>
        </div>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 max-w-4xl mx-auto items-center">
        {memoriesList.map((mem, idx) => {
          const hasHeartPop = heartPops[mem.id];

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30, rotate: idx === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: idx === 0 ? -2 : 2 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => handlePhotoClick(mem, e)}
              className="cursor-pointer group relative bg-white p-4 sm:p-5 pb-8 sm:pb-9 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 select-none"
            >
              {/* Cute Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/60 backdrop-blur-sm border-t border-b border-pink-300/40 -rotate-1 shadow-sm rounded-sm pointer-events-none" />

              {/* Little Pin / Evil eye sticker */}
              <div className="absolute top-2 right-3 z-10 text-lg opacity-80 group-hover:scale-125 transition-transform">
                🧿
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-xl overflow-hidden bg-pink-50 mb-4 shadow-inner">
                <SmartImage
                  src={mem.image}
                  alt={mem.caption}
                  placeholderLabel={`Memory #${mem.id} 📸`}
                  placeholderSub={`Place ankitha-shabrii-${mem.id}.jpg in public/images/`}
                  className="w-full h-full"
                />

                {/* Floating Heart Blast Animation on click */}
                {hasHeartPop && (
                  <motion.div
                    initial={{ scale: 0.3, opacity: 1, y: 0 }}
                    animate={{ scale: 2.2, opacity: 0, y: -60 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  >
                    <Heart className="w-20 h-20 fill-pink-500 text-pink-500 drop-shadow-lg" />
                  </motion.div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/90 text-pink-800 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>View Memory</span>
                  </div>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="text-center px-2">
                <h4 className="font-script text-2xl sm:text-3xl text-pink-950 font-bold mb-1">
                  {mem.caption}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 font-sans">
                  {mem.subcaption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-pink-200 overflow-hidden"
            >
              {/* Top Modal Controls */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold font-mono">
                    {memoriesList.findIndex((m) => m.id === selectedPhoto.id) + 1} / {memoriesList.length}
                  </span>
                  <button
                    onClick={() => {
                      triggerHaptic([30]);
                      setIsSlideshow(!isSlideshow);
                    }}
                    title={isSlideshow ? "Pause Slideshow" : "Auto-Play Slideshow"}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-pink-100 text-neutral-700 hover:text-pink-700 text-xs font-medium transition-colors"
                  >
                    {isSlideshow ? (
                      <>
                        <Pause className="w-3 h-3 text-pink-600 fill-pink-600" />
                        <span>Pause Reel</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-pink-600 fill-pink-600" />
                        <span>Play Reel</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    setIsSlideshow(false);
                  }}
                  className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Large Image Preview with Navigation Arrows */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square w-full mb-4 bg-pink-50">
                <SmartImage
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  placeholderLabel={`Memory #${selectedPhoto.id} 📸`}
                  placeholderSub="Photo preview"
                  className="w-full h-full"
                />

                {/* Left Arrow Button */}
                {memoriesList.length > 1 && (
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-pink-800 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-pink-200"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5 text-pink-700" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {memoriesList.length > 1 && (
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-pink-800 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-pink-200"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5 text-pink-700" />
                  </button>
                )}
              </div>

              {/* Captions inside modal */}
              <div className="text-center pt-1">
                <h3 className="font-script text-3xl sm:text-4xl text-pink-900 font-bold mb-1">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-sm text-neutral-600">
                  {selectedPhoto.subcaption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Sister Photo Booth Modal */}
      <PhotoBooth
        isOpen={isPhotoBoothOpen}
        onClose={() => setIsPhotoBoothOpen(false)}
        onPinMemory={handlePinMemory}
      />
    </section>
  );
}
