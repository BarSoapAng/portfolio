import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import illumi from '@assets/illumi.jpg'
import notIllumi from '@assets/not-illumi.jpg'

export default function PersonalHover() {
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState("imageA");

  // Handle timed image swap
  useEffect(() => {
    if (!hovered) return;

    setPhase("imageA");

    const timer = setTimeout(() => {
      setPhase("imageB");
    }, 1000);

    return () => clearTimeout(timer);
  }, [hovered]);

  return (
    <span
      className="relative inline-block text-orange-600 underline cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      my cat

      {/* Floating center animation */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: 1, rotate: 360, opacity: 1 }}
            exit={{ scale: 0, rotate: -360, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-76 h-76">
              {/* Image A */}
              <motion.img
                src={illumi}
                className="absolute inset-0 w-full h-full object-contain"
              />

              {/* Image B */}
              <motion.img
                src={notIllumi}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "imageB" ? 1 : 0 }}
                transition={{ duration: 3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
