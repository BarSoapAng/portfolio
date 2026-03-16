"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SparkleProps = {
  duration: number;
  rotate: number;
  x: number;
};

const sparkleConfigs = Array.from({ length: 80 }, (_, index) => ({
  x: (index * 17) % 100,
  rotate: (index * 37) % 360,
  duration: 1 + (index % 5) * 0.15,
}));

function Sparkle({ duration, rotate, x }: SparkleProps) {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 z-50"
      initial={{ y: -200, scale: 0.5 }}
      animate={{
        y: "100vh",
        opacity: [1, 0],
        scale: [0.5, 1, 0.3],
        rotate,
      }}
      transition={{
        duration,
        ease: "easeIn",
      }}
      style={{
        left: `${x}%`,
      }}
    >
      *
    </motion.div>
  );
}

export default function SparkleHover() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer text-purple-500 transition hover:text-purple-300"
      >
        Favorite Color: purple
      </span>

      <AnimatePresence>
        {hovered &&
          sparkleConfigs.map((sparkle, index) => (
            <Sparkle
              key={index}
              duration={sparkle.duration}
              rotate={sparkle.rotate}
              x={sparkle.x}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
