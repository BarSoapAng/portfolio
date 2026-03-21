"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import pika from "@assets/work/pika.gif";
import siamesefall from "@assets/work/siamesefall715.gif";
import sing from "@assets/work/sing.gif";
import cat1 from "@assets/work/cat1.gif"
import borb from "@assets/work/borb.gif"

const DEFAULT_MARQUEE_HEIGHT_PX = 300;
const SPEED_PX_PER_SECOND = 100;

type GifConfig = {
  id: string;
  asset: StaticImageData;
  width: number;
  height: number;
  spawnOffsetX: number;
};

type GifState = {
  id: string;
  cycle: number;
  top: number;
  initialDelay: number;
  spawnOffsetX: number;
};

function getRandomTop(trackHeight: number, spriteHeight: number): number {
  const maxTop = Math.max(0, trackHeight - spriteHeight);

  return Math.floor(Math.random() * (maxTop + 1));
}

const GIFS: GifConfig[] = [
  { id: "pika", asset: pika, width: pika.width, height: pika.height, spawnOffsetX: 200 },
  {
    id: "siamesefall",
    asset: siamesefall,
    width: siamesefall.width,
    height: siamesefall.height - 50,
    spawnOffsetX: 500,
  },
  { id: "sing", asset: sing, width: sing.width, height: sing.height, spawnOffsetX: 720 },
  { id: "cat1", asset: cat1, width: cat1.width, height: cat1.height, spawnOffsetX: 890 },
  { id: "borb", asset: borb, width: borb.width, height: borb.height - 30, spawnOffsetX: 1042 },
];

function createInitialState(trackHeight: number): GifState[] {
  return GIFS.map((gif, index) => ({
    id: gif.id,
    cycle: 0,
    top: getRandomTop(trackHeight, gif.height),
    initialDelay: index * 0.55,
    spawnOffsetX: gif.spawnOffsetX,
  }));
}

type SillyMarqueeProps = {
  height?: number;
};

export default function SillyMarquee({ height = DEFAULT_MARQUEE_HEIGHT_PX }: SillyMarqueeProps) {
  const marqueeHeight = Math.max(0, Math.round(height));
  const initialSpawnHeight = marqueeHeight > 0 ? marqueeHeight : DEFAULT_MARQUEE_HEIGHT_PX;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [gifStates, setGifStates] = useState<GifState[]>(() => createInitialState(initialSpawnHeight));

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      setContainerWidth(node.getBoundingClientRect().width);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const queueRespawn = (gifId: string, spriteHeight: number) => {
    setGifStates((currentStates) =>
      currentStates.map((state) =>
        state.id === gifId
          ? {
            ...state,
            cycle: state.cycle + 1,
            top: getRandomTop(marqueeHeight, spriteHeight),
            initialDelay: 0,
          }
          : state,
      ),
    );
  };

  const trackWidth = containerWidth > 0 ? containerWidth : 1200;

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ height: marqueeHeight }}>
      {GIFS.map((gif) => {
        const gifState = gifStates.find((state) => state.id === gif.id);
        if (!gifState) {
          return null;
        }
        const maxTop = Math.max(0, marqueeHeight - gif.height);
        const clampedTop = Math.min(gifState.top, maxTop);
        const initialX = -gif.width - gifState.spawnOffsetX;
        const targetX = trackWidth + gif.width;
        const travelDistance = targetX - initialX;
        const duration = travelDistance / SPEED_PX_PER_SECOND;

        return (
          <motion.img
            key={`${gif.id}-${gifState.cycle}`}
            src={gif.asset.src}
            className="pointer-events-none absolute left-0 select-none object-contain"
            style={{ top: clampedTop, width: gif.width, height: gif.height }}
            initial={{ x: initialX }}
            animate={{ x: targetX }}
            transition={{ duration, ease: "linear", delay: gifState.initialDelay }}
            onAnimationComplete={() => queueRespawn(gif.id, gif.height)}
          />
        );
      })}
    </section>
  );
}
