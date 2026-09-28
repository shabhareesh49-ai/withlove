import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, RotateCw, Disc, Upload, AlertCircle, Volume2, VolumeX } from 'lucide-react';
import { audioController, triggerHaptic } from '../utils/audio';

export default function CassetteTape() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [customTrackTitle, setCustomTrackTitle] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const audioPath = "/audio/birthday-music.mp3";

  // Format time MM:SS
  const formatTime = (sec) => {
    if (isNaN(sec) || sec < 0) return "0:00";
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioError(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const togglePlay = () => {
    triggerHaptic([30]);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pause global background music if playing so they don't clash
      if (audioController.isPlaying) {
        audioController.stop();
      }

      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAudioError(false);
      }).catch((err) => {
        console.warn("Audio play prevented or file missing:", err);
        setAudioError(true);
      });
    }
  };

  const handleAudioError = () => {
    setAudioError(true);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    triggerHaptic([25]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      triggerHaptic([40]);
      const fileUrl = URL.createObjectURL(file);
      audioRef.current.src = fileUrl;
      setCustomTrackTitle(file.name.replace(/\.[^/.]+$/, ""));
      setAudioError(false);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      {/* Real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioPath}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={handleAudioError}
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-200/35 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-pink-200/80 shadow-xs">
          <Disc className={`w-3.5 h-3.5 text-pink-500 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>Vintage Sibling Audio Deck 📼</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-2">
          Anku's Birthday Mixtape 🎶
        </h2>
        <p className="text-sm text-neutral-600 font-light">
          Press Play to listen to Ankitha's birthday music with spinning tape reels!
        </p>
      </div>

      {/* Missing Audio Banner (if audio file missing or fails) */}
      {audioError && (
        <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold mb-1">Add your birthday music here</p>
            <p className="text-neutral-600 mb-2 leading-relaxed">
              Place an MP3 file at <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">public/audio/birthday-music.mp3</code>, or select a music file from your device below.
            </p>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-all">
              <Upload className="w-3 h-3" />
              <span>Choose Music File</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      )}

      {/* Cassette 3D Card with Flip */}
      <div className="perspective-1000 max-w-md mx-auto w-full box-border">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full aspect-[16/10] min-h-[250px] sm:min-h-[270px] rounded-3xl p-5 sm:p-6 shadow-xl border-4 border-pink-300/80 bg-gradient-to-br from-pink-950 via-neutral-900 to-rose-950 text-white select-none overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle screws in corners */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 flex items-center justify-center text-[7px] text-neutral-300">✕</div>

          {/* FRONT: SIDE A */}
          <div className={`absolute inset-4 flex flex-col justify-between ${isFlipped ? 'invisible' : 'visible'}`} style={{ backfaceVisibility: 'hidden' }}>
            {/* Top Label */}
            <div className="bg-[#fef9f3] text-neutral-900 px-4 py-2 rounded-xl border border-pink-200/90 shadow-inner flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-600 block">
                  SIDE A • STEREO HI-FI
                </span>
                <h4 className="font-script text-xl sm:text-2xl font-bold text-pink-950 leading-none mt-0.5 truncate max-w-[220px]">
                  {customTrackTitle || "Anku's Birthday Song 🎂"}
                </h4>
              </div>
              <span className="text-xl">🧿</span>
            </div>

            {/* Middle Window with Spools */}
            <div className="my-auto py-2.5 px-6 rounded-2xl bg-neutral-950/85 border border-pink-500/30 flex items-center justify-around shadow-inner relative">
              {/* Left Spool */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-pink-400/50 flex items-center justify-center shadow-md">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  </div>
                  <span className="absolute top-1 text-[8px] text-pink-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-pink-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-pink-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-pink-300">▶</span>
                </motion.div>
              </div>

              {/* Tape Center Status Window */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-pink-300 font-mono tracking-wider font-bold">
                  {isPlaying ? "PLAYING ▶" : "PAUSED ❚❚"}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Spool */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-pink-400/50 flex items-center justify-center shadow-md">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  </div>
                  <span className="absolute top-1 text-[8px] text-pink-300">▲</span>
                  <span className="absolute bottom-1 text-[8px] text-pink-300">▼</span>
                  <span className="absolute left-1 text-[8px] text-pink-300">◀</span>
                  <span className="absolute right-1 text-[8px] text-pink-300">▶</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Credits */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 px-2">
              <span>Track: Happy Birthday Music Box 🌸</span>
              <span className="text-pink-400 font-semibold">TAPE 01</span>
            </div>
          </div>

          {/* BACK: SIDE B */}
          <div
            className={`absolute inset-4 flex flex-col justify-between ${isFlipped ? 'visible' : 'invisible'}`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <div className="bg-[#fef9f3] text-neutral-900 px-4 py-2 rounded-xl border border-pink-200/90 shadow-inner flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600 block">
                  SIDE B • SIBLING REEL
                </span>
                <h4 className="font-script text-xl sm:text-2xl font-bold text-pink-950 leading-none mt-0.5">
                  Made for Ankitha with Love ❤️
                </h4>
              </div>
              <span className="text-xl">🌸</span>
            </div>

            <div className="my-auto py-2.5 px-6 rounded-2xl bg-neutral-950/85 border border-purple-500/30 flex items-center justify-around shadow-inner relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-purple-400/50 flex items-center justify-center shadow-md">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-purple-300 font-mono tracking-wider font-bold">
                  {isPlaying ? "PLAYING ▶" : "PAUSED ❚❚"}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 border-2 border-purple-400/50 flex items-center justify-center shadow-md">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 px-2">
              <span>Curated by Shabrii 🧿</span>
              <span className="text-purple-400 font-semibold">SIDE B</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar & Timeline Controls */}
      <div className="max-w-md mx-auto w-full mt-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-md box-border">
        {/* Scrubber slider */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Audio progress slider"
            className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-600 focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Player Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-pink-100">
          <div className="flex items-center gap-2">
            {/* Primary Play / Pause Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause ⏸️</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play ▶️</span>
                </>
              )}
            </motion.button>

            {/* Restart button */}
            <button
              onClick={handleRestart}
              title="Restart from beginning"
              className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors border border-pink-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors border border-pink-200 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Flip tape deck */}
            <button
              onClick={() => {
                triggerHaptic([30]);
                setIsFlipped(!isFlipped);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 text-pink-800 border border-pink-200 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <RotateCw className="w-3 h-3 text-pink-500" />
              <span>{isFlipped ? "Side A" : "Side B"}</span>
            </button>

            {/* Custom file button */}
            <label
              title="Choose your own MP3 from your device"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 text-neutral-700 border border-neutral-200 text-xs font-semibold shadow-2xs transition-all"
            >
              <Upload className="w-3 h-3 text-pink-500" />
              <span className="hidden sm:inline">Change Song</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
