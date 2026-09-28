import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Camera, Sparkles } from 'lucide-react';

import SecretEntry from './components/SecretEntry';
import Hero from './components/Hero';
import NicknameCards from './components/NicknameCards';
import SpecialQualities from './components/SpecialQualities';
import MemoryGallery from './components/MemoryGallery';
import FunnySection from './components/FunnySection';
import Letter from './components/Letter';
import BirthdayCake from './components/BirthdayCake';
import SecretMessage from './components/SecretMessage';
import FinalScreen from './components/FinalScreen';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayer from './components/MusicPlayer';
import LoveShowerButton from './components/LoveShowerButton';
import WishCapsule from './components/WishCapsule';
import SisterQuiz from './components/SisterQuiz';
import MomentsCounter from './components/MomentsCounter';
import FairyLights from './components/FairyLights';
import AffirmationJar from './components/AffirmationJar';
import WishesWall from './components/WishesWall';
import SiblingPact from './components/SiblingPact';
import SisterScratchCard from './components/SisterScratchCard';
import CassetteTape from './components/CassetteTape';
import { Flame, Sparkles as SparklesIcon, Moon, Sun } from 'lucide-react';
import { triggerHaptic } from './utils/audio';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isCandlelight, setIsCandlelight] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHeroNext = () => {
    const el = document.getElementById('nicknames-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen selection:bg-pink-200 selection:text-pink-900 custom-cursor-active overflow-x-hidden transition-colors duration-1000 ${isCandlelight ? 'candlelight-active' : ''}`}>
      {/* Background Floating Hearts, Sparkles & Evil Eyes */}
      <FloatingParticles />

      {/* Hanging Fairy Lights (Active in Candlelight Mode) */}
      <AnimatePresence>
        {isCandlelight && <FairyLights />}
      </AnimatePresence>

      {/* Screen 1: Secret Entry Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <SecretEntry onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience (Journey) */}
      {isUnlocked && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Top Left Candlelight Toggle */}
          <div className="fixed top-4 left-4 z-40">
            <button
              onClick={() => {
                triggerHaptic([35]);
                setIsCandlelight(!isCandlelight);
              }}
              title={isCandlelight ? "Switch to Daylight Mode" : "Switch to Candlelight Mode"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border border-pink-200 text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95 bg-white/85 text-pink-800"
            >
              {isCandlelight ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Daylight 🌸</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Candlelight 🕯️</span>
                </>
              )}
            </button>
          </div>

          {/* Top Right Music Toggle */}
          <MusicPlayer />

          {/* Screen 2: Hero */}
          <Hero onScrollDown={scrollToHeroNext} />

          {/* Screen 3: The Three Names */}
          <NicknameCards />

          {/* Interactive Moments That Matter Strip */}
          <MomentsCounter />

          {/* Screen 4: Why You Are Special */}
          <SpecialQualities />

          {/* Bonus: The Sister Affirmation Jar */}
          <AffirmationJar />

          {/* Screen 5: Our Memories (Photo Gallery) */}
          <MemoryGallery />

          {/* Bonus: Vintage Sibling Mixtape Player */}
          <CassetteTape />

          {/* Screen 6: Funny Section */}
          <FunnySection />

          {/* Interactive Birthday Scratch Card */}
          <SisterScratchCard />

          {/* Interactive Sister Trivia Quiz */}
          <SisterQuiz />

          {/* Sibling Agreement & Lifelong Pact */}
          <SiblingPact />

          {/* Screen 7: Letter from Shabrii */}
          <Letter />

          {/* Screen 8: Interactive Birthday Cake */}
          <BirthdayCake />

          {/* Interactive Wish Capsule */}
          <WishCapsule />

          {/* Bonus: The Birthday Wishes Wall */}
          <WishesWall />

          {/* Screen 9: The Secret Message */}
          <SecretMessage />

          {/* Screen 10: Final Cinematic Screen */}
          <FinalScreen onBackToTop={scrollToTop} />

          {/* Floating Love Shower Button Bottom Left */}
          <LoveShowerButton />

          {/* Floating Back To Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={scrollToTop}
                title="Back to Top"
                aria-label="Back to Top"
                className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-pink-600 shadow-xl border border-pink-200 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
              >
                <ChevronUp className="w-5 h-5 text-pink-500" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </div>
  );
}
