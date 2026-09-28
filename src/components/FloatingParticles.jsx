import React, { useMemo } from 'react';

export default function FloatingParticles() {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2 + (i % 5) * 3) % 96 + 2}%`,
      top: `${(i * 7.1 + (i % 7) * 4) % 94 + 3}%`,
      size: (i % 3 === 0 ? 18 : i % 2 === 0 ? 12 : 8),
      duration: 6 + (i % 6) * 2,
      delay: (i % 5) * 1.2,
      type: i % 4 === 0 ? 'heart' : i % 3 === 0 ? 'sparkle' : i % 7 === 0 ? 'evil-eye' : 'star',
      opacity: 0.25 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform-gpu select-none animate-float"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' && (
            <span className="text-pink-400 drop-shadow-sm">🩷</span>
          )}
          {p.type === 'sparkle' && (
            <span className="text-amber-300 drop-shadow-sm">✨</span>
          )}
          {p.type === 'star' && (
            <span className="text-rose-300 drop-shadow-sm">🌸</span>
          )}
          {p.type === 'evil-eye' && (
            <span className="text-sky-500 drop-shadow-sm text-sm">🧿</span>
          )}
        </div>
      ))}
    </div>
  );
}
