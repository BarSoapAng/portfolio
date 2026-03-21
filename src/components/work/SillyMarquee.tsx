"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import pika from "@assets/work/pika.gif";
import siamesefall from "@assets/work/siamesefall715.gif";
import sing from "@assets/work/sing.gif";
import typingNay from "@assets/work/typing_nay.gif";
import typingYay from "@assets/work/typing_yay.gif";

const MARQUEE_HEIGHT_PX = 300;
const GIF_HEIGHT_PX = 72;
const OFFSCREEN_DELAY_MS = 2000;
const MIN_DURATION_S = 7;
const MAX_DURATION_S = 11;

type GifConfig = {
  id: string;
  alt: string;
  asset: StaticImageData;
  width: number;
  height: number;
};

type GifState = {
  id: string;
  cycle: number;
  top: number;
  duration: number;
  initialDelay: number;
};

function getScaledWidth(asset: StaticImageData): number {
  return Math.round((asset.width / asset.height) * GIF_HEIGHT_PX);
}

function getRandomTop(spriteHeight: number): number {
  const maxTop = Math.max(0, MARQUEE_HEIGHT_PX - spriteHeight);

  return Math.floor(Math.random() * (maxTop + 1));
}

function getRandomDuration(): number {
  return Number((Math.random() * (MAX_DURATION_S - MIN_DURATION_S) + MIN_DURATION_S).toFixed(2));
}

const GIFS: GifConfig[] = [
  { id: "pika", alt: "Pikachu dancing", asset: pika, width: getScaledWidth(pika), height: GIF_HEIGHT_PX },
  {
    id: "siamesefall",
    alt: "A cat tumbling",
    asset: siamesefall,
    width: getScaledWidth(siamesefall),
    height: GIF_HEIGHT_PX,
  },
  { id: "sing", alt: "Cat singing", asset: sing, width: getScaledWidth(sing), height: GIF_HEIGHT_PX },
  { id: "typing-nay", alt: "Cat typing no", asset: typingNay, width: getScaledWidth(typingNay), height: GIF_HEIGHT_PX },
  { id: "typing-yay", alt: "Cat typing yes", asset: typingYay, width: getScaledWidth(typingYay), height: GIF_HEIGHT_PX },
];

function createInitialState(): GifState[] {
  return GIFS.map((gif, index) => ({
    id: gif.id,
    cycle: 0,
    top: getRandomTop(gif.height),
    duration: getRandomDuration(),
    initialDelay: index * 0.55,
  }));
}

export default function SillyMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<Record<string, number>>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const [gifStates, setGifStates] = useState<GifState[]>(createInitialState);

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

  useEffect(() => {
    const timeoutMap = timeoutsRef.current;

    return () => {
      for (const timeoutId of Object.values(timeoutMap)) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const queueRespawn = (gifId: string, spriteHeight: number) => {
    const existingTimeoutId = timeoutsRef.current[gifId];
    if (existingTimeoutId) {
      window.clearTimeout(existingTimeoutId);
    }

    timeoutsRef.current[gifId] = window.setTimeout(() => {
      setGifStates((currentStates) =>
        currentStates.map((state) =>
          state.id === gifId
            ? {
                ...state,
                cycle: state.cycle + 1,
                top: getRandomTop(spriteHeight),
                duration: getRandomDuration(),
                initialDelay: 0,
              }
            : state,
        ),
      );

      delete timeoutsRef.current[gifId];
    }, OFFSCREEN_DELAY_MS);
  };

  const trackWidth = containerWidth > 0 ? containerWidth : 1200;

  return (
    <section ref={containerRef} className="relative h-[300px] w-full overflow-hidden">
      {GIFS.map((gif) => {
        const gifState = gifStates.find((state) => state.id === gif.id);
        if (!gifState) {
          return null;
        }

        return (
          <motion.img
            key={`${gif.id}-${gifState.cycle}`}
            src={gif.asset.src}
            alt={gif.alt}
            className="pointer-events-none absolute left-0 select-none object-contain"
            style={{ top: gifState.top, width: gif.width, height: gif.height }}
            initial={{ x: trackWidth + gif.width }}
            animate={{ x: -gif.width }}
            transition={{ duration: gifState.duration, ease: "linear", delay: gifState.initialDelay }}
            onAnimationComplete={() => queueRespawn(gif.id, gif.height)}
          />
        );
      })}
    </section>
  );
}
