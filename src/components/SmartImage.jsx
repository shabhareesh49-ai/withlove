import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Sparkles, Heart } from 'lucide-react';

/**
 * SmartImage handles loading real photos from public/images/
 * while gracefully displaying a deluxe warm aesthetic placeholder
 * if the image file has not been copied into public/images/ yet.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  placeholderLabel = "Ankitha 🩷",
  placeholderSub = "Photo will display when placed in public/images/",
  onClick = null,
  priority = false
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [customSrc, setCustomSrc] = useState(null);

  useEffect(() => {
    // Check local storage for user uploaded preview if any
    const localKey = `custom_photo_${src}`;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      setCustomSrc(saved);
      setImageLoaded(true);
      setLoadError(false);
    }
  }, [src]);

  const effectiveSrc = customSrc || src;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target.result;
        setCustomSrc(result);
        localStorage.setItem(`custom_photo_${src}`, result);
        setImageLoaded(true);
        setLoadError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative overflow-hidden group ${className}`} onClick={onClick}>
      {!loadError ? (
        <img
          src={effectiveSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!customSrc) {
              setLoadError(true);
            }
          }}
        />
      ) : null}

      {/* Elegant fallback if image not yet placed in public/images/ */}
      {(loadError || !imageLoaded) && !customSrc && (
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 via-rose-50 to-purple-100 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-pink-300 rounded-2xl">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-pink-200/80 flex items-center justify-center text-pink-600 shadow-inner">
              <Heart className="w-8 h-8 fill-pink-400 text-pink-500 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 text-lg">🧿</span>
          </div>

          <h4 className="font-serif text-xl font-bold text-pink-900 mb-1">{placeholderLabel}</h4>
          <p className="text-xs text-pink-700/80 max-w-[220px] mb-3 leading-relaxed">
            {placeholderSub}
          </p>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-pink-700 text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all border border-pink-200">
            <ImageIcon className="w-3.5 h-3.5 text-pink-500" />
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

      {/* Subtle shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
