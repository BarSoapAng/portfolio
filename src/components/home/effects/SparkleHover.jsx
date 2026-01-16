import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sparkle = ({ x }) => {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 z-50"
      initial={{ y: -200, scale: 0.5 }}
      animate={{
        y: "100vh",
        opacity: [1, 0],
        scale: [0.5, 1, 0.3],
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 1 + Math.random(),
        ease: "easeIn",
      }}
      style={{
        left: `${x}%`,
      }}
    >
      ✦
    </motion.div>
  );
};

export default function SparkleHover() {
  const [hovered, setHovered] = useState(false);
  const sparkles = Array.from({ length: 80 });

  return (
    <div className="relative inline-block">
      {/* Hover Word */}
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer text-purple-500 hover:text-purple-300 transition"
      >
        Favorite Color: purple
      </span>

      {/* Sparkles */}
      <AnimatePresence>
        {hovered &&
          sparkles.map((_, i) => (
            <Sparkle key={i} x={Math.random() * 100} />
          ))}
      </AnimatePresence>
    </div>
  );
}
