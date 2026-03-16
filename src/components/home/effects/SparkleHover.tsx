"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SparkleProps = {
  duration: number;
  rotate: number;
  x: number;
};

type SparkleConfig = SparkleProps & {
  id: number;
};

const Sparkle = ({ duration, rotate, x }: SparkleProps) => {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 z-50"
      initial={{ y: -200, scale: 0.5 }}
      animate={{
        y: "100vh",
        opacity: [1, 0],
        rotate,
        scale: [0.5, 1, 0.3],
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
};

export default function SparkleHover() {
  const [hovered, setHovered] = useState(false);
  const [sparkles] = useState<SparkleConfig[]>(() =>
    Array.from({ length: 80 }, (_, index) => ({
      duration: 1 + Math.random(),
      id: index,
      rotate: Math.random() * 360,
      x: Math.random() * 100,
    })),
  );

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
          sparkles.map((sparkle) => (
            <Sparkle
              key={sparkle.id}
              duration={sparkle.duration}
              rotate={sparkle.rotate}
              x={sparkle.x}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
