import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Sparkles, Heart, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayContent';
import { audioController, triggerHaptic } from '../utils/audio';

export default function SisterQuiz() {
  const { quiz } = birthdayData;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz.questions[currentQIndex];

  const handleSelectOption = (opt, idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (opt.correct) {
      triggerHaptic([40, 30, 60]);
      audioController.playBell(880, 0.8, 0, 0.14);
      setScore((prev) => prev + 1);
    } else {
      triggerHaptic([70]);
      audioController.playBell(330, 0.6, 0, 0.1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed!
      triggerHaptic([60, 40, 70, 40, 140]);
      audioController.playMagicChime();
      setIsCompleted(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#f59e0b', '#38bdf8', '#c084fc', '#ffffff']
      });
    }
  };

  const handleRestart = () => {
    triggerHaptic([30]);
    audioController.playChime();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handlePrint = () => {
    triggerHaptic([30]);
    audioController.playChime();
    window.print();
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 w-full max-w-[1200px] mx-auto box-border">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 text-pink-500" />
          <span>{quiz.badge}</span>
          <span>🧿</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pink-950 mb-3">
          {quiz.title}
        </h2>
        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto">
          {quiz.subtitle}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-6 sm:p-10 glass-card border border-pink-200/90 shadow-xl overflow-hidden max-w-2xl mx-auto"
      >
        {!isCompleted ? (
          <div>
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between text-xs font-bold text-pink-600 mb-3">
              <span>Question {currentQIndex + 1} of {quiz.questions.length}</span>
              <span className="font-mono">{Math.round(((currentQIndex) / quiz.questions.length) * 100)}% Complete</span>
            </div>

            <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden mb-8">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQIndex + 1) / quiz.questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-pink-950 mb-6 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = "bg-white/90 hover:bg-white text-neutral-800 border-pink-200/80 hover:border-pink-400";

                    if (isAnswered) {
                      if (opt.correct) {
                        btnStyle = "bg-emerald-50 text-emerald-900 border-emerald-400 shadow-md";
                      } else if (isSelected && !opt.correct) {
                        btnStyle = "bg-rose-50 text-rose-900 border-rose-400";
                      } else {
                        btnStyle = "bg-white/60 text-neutral-400 border-transparent opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(opt, idx)}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base flex items-center justify-between transition-all duration-200 shadow-sm ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {isAnswered && opt.correct && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
                        )}
                        {isAnswered && isSelected && !opt.correct && (
                          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200 mb-6 text-xs sm:text-sm text-pink-900"
                  >
                    <span className="font-bold mr-1">Fact:</span> {currentQ.explanation}
                  </motion.div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <div className="text-right">
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 transition-all"
                    >
                      <span>{currentQIndex < quiz.questions.length - 1 ? "Next Question" : "See Final Score 🏆"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Official Diploma Result Card */
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            {/* Diploma Emblem */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-pink-400 to-rose-500 flex items-center justify-center text-4xl shadow-xl border-4 border-white text-white">
              🎓
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                {quiz.diploma.title}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
                {quiz.diploma.verdict}
              </h3>
              <p className="font-serif text-lg sm:text-xl text-pink-800 italic max-w-md mx-auto pt-2">
                "{quiz.diploma.note}"
              </p>
            </div>

            {/* Sibling Seal */}
            <div className="p-4 rounded-2xl bg-[#fffdf8] border border-pink-200/90 flex items-center justify-center gap-3 text-xs font-semibold text-pink-900 shadow-inner">
              <span>🧿 Sibling Bond Verified</span>
              <span>•</span>
              <span>100% Unconditional Love ❤️</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-md shadow-pink-500/25 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Save / Print Diploma 📜</span>
              </button>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-50 shadow-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
                <span>Play Trivia Again 🔁</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
