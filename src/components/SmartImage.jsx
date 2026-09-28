import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Heart, Camera, Upload, RefreshCw } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

/**
 * SmartImage handles loading real photos from public/images/
 * while gracefully displaying a deluxe warm aesthetic placeholder
 * if the image file has not been copied into public/images/ yet.
 * Also allows user to select a photo from their computer and preview it immediately.
 */
export default function SmartImage({
  src,
  alt = "Memory Photo",
  className = "",
  placeholderLabel = "Special Memory 📸",
  placeholderSub = "Place photo in public/images/ or select from computer",
  onClick = null,
  priority = false
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [customSrc, setCustomSrc] = useState(null);

  // Check localStorage for previously selected custom photo
  useEffect(() => {
    try {
      const localKey = `custom_photo_${src}`;
      const saved = localStorage.getItem(localKey);
      if (saved) {
        setCustomSrc(saved);
        setImageLoaded(true);
        setLoadError(false);
      }
    } catch (e) {}

    // Listen to global photo updates across instances (e.g. Gallery & Lightbox)
    const handleGlobalUpdate = (e) => {
      if (e.detail && e.detail.src === src) {
        setCustomSrc(e.detail.customSrc);
        setImageLoaded(true);
        setLoadError(false);
      }
    };

    window.addEventListener('custom_photo_updated', handleGlobalUpdate);
    return () => window.removeEventListener('custom_photo_updated', handleGlobalUpdate);
  }, [src]);

  const effectiveSrc = customSrc || src;

  const handleFileChange = (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic([35]);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target.result;
        setCustomSrc(result);
        setImageLoaded(true);
        setLoadError(false);

        try {
          localStorage.setItem(`custom_photo_${src}`, result);
        } catch (err) {
          console.warn("Storage quota exceeded, previewing in memory:", err);
        }

        // Notify other components showing this photo slot
        window.dispatchEvent(
          new CustomEvent('custom_photo_updated', {
            detail: { src, customSrc: result }
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e) => {
    e.stopPropagation();
    triggerHaptic([25]);
    try {
      localStorage.removeItem(`custom_photo_${src}`);
    } catch (err) {}
    setCustomSrc(null);
    setImageLoaded(false);
    setLoadError(false);

    window.dispatchEvent(
      new CustomEvent('custom_photo_updated', {
        detail: { src, customSrc: null }
      })
    );
  };

  const hasPhoto = (imageLoaded && !loadError) || !!customSrc;

  return (
    <div
      className={`relative overflow-hidden w-full h-full select-none ${className}`}
      onClick={onClick}
    >
      {/* Real Image Tag (hidden until loaded to avoid any broken image icons) */}
      {!loadError && (
        <img
          src={effectiveSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => {
            setImageLoaded(true);
            setLoadError(false);
          }}
          onError={() => {
            if (!customSrc) {
              setLoadError(true);
              setImageLoaded(false);
            }
          }}
        />
      )}

      {/* Deluxe Fallback Card if photo not yet loaded or missing */}
      {!hasPhoto && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center border-2 border-dashed border-pink-300 rounded-2xl z-10 box-border">
          <div className="relative mb-2 sm:mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-200/90 flex items-center justify-center text-pink-600 shadow-inner">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-pink-400 text-pink-500 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 text-sm sm:text-base">🌸</span>
          </div>

          <h4 className="font-serif text-base sm:text-lg md:text-xl font-bold text-pink-950 mb-1 leading-snug">
            {placeholderLabel}
          </h4>

          <p className="text-[11px] sm:text-xs text-pink-700/80 max-w-[240px] mb-3 sm:mb-4 leading-relaxed">
            {placeholderSub}
          </p>

          {/* Fully Interactive Select Photo Button */}
          <label
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 hover:bg-white text-pink-700 text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all border border-pink-200 pointer-events-auto hover:scale-105 active:scale-95 z-20"
          >
            <Camera className="w-3.5 h-3.5 text-pink-500" />
            <span>Select Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              onClick={(e) => e.stopPropagation()}
            />
          </label>
        </div>
      )}

      {/* Change Photo Overlay Button when photo is present (Desktop hover / Mobile tap) */}
      {hasPhoto && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto flex items-center gap-1"
        >
          <label
            title="Change photo from computer"
            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-semibold backdrop-blur-md shadow-md transition-all hover:scale-105"
          >
            <Camera className="w-3 h-3 text-pink-300" />
            <span>Change</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              onClick={(e) => e.stopPropagation()}
            />
          </label>

          {customSrc && (
            <button
              onClick={handleResetPhoto}
              title="Reset to default photo path"
              className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-md transition-all hover:scale-105"
            >
              <RefreshCw className="w-3 h-3 text-pink-300" />
            </button>
          )}
        </div>
      )}

      {/* Subtle warm shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-950/15 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
