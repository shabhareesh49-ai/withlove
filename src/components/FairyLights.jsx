import React from 'react';
import { motion } from 'framer-motion';

export default function FairyLights() {
  const bulbs = [
    { cx: 30, cy: 22, color: "#fbbf24", delay: 0 },
    { cx: 75, cy: 30, color: "#f472b6", delay: 0.4 },
    { cx: 120, cy: 24, color: "#fde047", delay: 0.8 },
    { cx: 165, cy: 32, color: "#ec4899", delay: 0.2 },
    { cx: 210, cy: 23, color: "#fbbf24", delay: 1.1 },
    { cx: 255, cy: 33, color: "#f472b6", delay: 0.6 },
    { cx: 300, cy: 25, color: "#38bdf8", delay: 1.3 },
    { cx: 345, cy: 32, color: "#fbbf24", delay: 0.3 },
    { cx: 390, cy: 22, color: "#fde047", delay: 0.9 },
    { cx: 435, cy: 31, color: "#ec4899", delay: 0.5 },
    { cx: 480, cy: 24, color: "#fbbf24", delay: 1.2 },
    { cx: 525, cy: 32, color: "#f472b6", delay: 0.7 },
    { cx: 570, cy: 23, color: "#38bdf8", delay: 0.1 },
    { cx: 615, cy: 31, color: "#fbbf24", delay: 1.4 },
    { cx: 660, cy: 24, color: "#fde047", delay: 0.5 },
    { cx: 705, cy: 33, color: "#ec4899", delay: 1.0 },
    { cx: 750, cy: 25, color: "#f472b6", delay: 0.3 },
    { cx: 795, cy: 32, color: "#fbbf24", delay: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-14 pointer-events-none z-30 overflow-hidden"
    >
      <svg
        viewBox="0 0 820 48"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-md"
      >
        {/* Fairy light garland wire */}
        <path
          d="M 0 10 Q 70 34 140 10 Q 210 34 280 10 Q 350 34 420 10 Q 490 34 560 10 Q 630 34 700 10 Q 770 34 820 10"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.2"
          opacity="0.6"
        />

        {/* Fairy light hanging clips and glowing bulbs */}
        {bulbs.map((b, i) => (
          <g key={i}>
            {/* Small clip/socket */}
            <rect
              x={b.cx - 2}
              y={b.cy - 7}
              width="4"
              height="5"
              rx="1"
              fill="#475569"
            />
            {/* Glowing fairy bulb */}
            <circle
              cx={b.cx}
              cy={b.cy}
              r="4.5"
              fill={b.color}
              className="fairy-bulb"
              style={{ animationDelay: `${b.delay}s` }}
            />
            {/* Inner bright filament core */}
            <circle
              cx={b.cx}
              cy={b.cy}
              r="2"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
