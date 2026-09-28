import React, { useState, useEffect } from 'react';
import { Music, VolumeX, Sparkles, Disc, RefreshCw, Upload } from 'lucide-react';
import { audioController, triggerHaptic } from '../utils/audio';
import { birthdayData } from '../data/birthdayContent';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(audioController.isPlaying);
  const [melodyIdx, setMelodyIdx] = useState(audioController.melodyIndex || 0);
  const [customTrackName, setCustomTrackName] = useState(null);

  useEffect(() => {
    setIsPlaying(audioController.isPlaying);
    setMelodyIdx(audioController.melodyIndex || 0);
    const unsubscribe = audioController.subscribe((state) => {
      setIsPlaying(state);
      setMelodyIdx(audioController.melodyIndex || 0);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = async () => {
    triggerHaptic([30]);
    await audioController.toggleMusic(birthdayData.audioSrc);
  };

  const handleSwitchMelody = (e) => {
    e.stopPropagation();
    triggerHaptic([35]);
    const nextIdx = audioController.switchMelody();
    setMelodyIdx(nextIdx);
    setCustomTrackName(null);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic([40]);
      const url = URL.createObjectURL(file);
      audioController.playCustomAudio(url);
      setCustomTrackName(file.name.slice(0, 14) + '...');
    }
  };

  const melodyNames = ['Birthday 🎂', 'Starlight ✨'];

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        title={isPlaying ? "Pause Music" : "Play Birthday Music Box"}
        aria-label="Toggle Music"
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-md ${
          isPlaying
            ? "bg-pink-600/90 border-pink-400 text-white shadow-pink-500/25 ring-2 ring-pink-300/50"
            : "bg-white/80 border-pink-200 text-pink-700 hover:bg-white shadow-sm"
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.1s]" style={{ height: '70%' }} />
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.3s]" style={{ height: '100%' }} />
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" style={{ height: '50%' }} />
            </div>
            <span className="text-xs font-semibold tracking-wide">Playing 🎶</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold tracking-wide">Music 🎵</span>
          </>
        )}
      </button>

      {/* Melody Switcher Button (visible when playing) */}
      {isPlaying && (
        <button
          onClick={handleSwitchMelody}
          title="Switch Melody"
          className="hidden sm:flex px-2.5 py-2 rounded-full bg-white/85 hover:bg-white border border-pink-200 text-pink-700 text-[11px] font-semibold shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-pink-500" />
          <span>{customTrackName || melodyNames[melodyIdx % melodyNames.length]}</span>
        </button>
      )}

      {/* Upload Custom Song Button */}
      <label
        title="Play custom song from device (MP3/M4A)"
        className="hidden md:flex cursor-pointer px-2.5 py-2 rounded-full bg-white/85 hover:bg-white border border-pink-200 text-pink-700 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 items-center gap-1 text-[11px] font-semibold"
      >
        <Upload className="w-3 h-3 text-pink-500" />
        <span>{customTrackName ? "Song Loaded 🎶" : "Custom Song"}</span>
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleAudioUpload}
        />
      </label>
    </div>
  );
}
