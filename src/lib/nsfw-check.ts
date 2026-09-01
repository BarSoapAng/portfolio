"use client";

import type { NSFWJS } from "nsfwjs";

let modelPromise: Promise<NSFWJS> | null = null;

async function getModel() {
  if (!modelPromise) {
    const nsfwjs = await import("nsfwjs");
    await import("@tensorflow/tfjs");
    modelPromise = nsfwjs.load();
  }
  return modelPromise;
}

export async function isImageSafe(canvas: HTMLCanvasElement): Promise<boolean> {
  const model = await getModel();
  const predictions = await model.classify(canvas);
  const unsafe = predictions.find(
    (prediction) =>
      prediction.className === "Porn" ||
      prediction.className === "Hentai" ||
      prediction.className === "Sexy"
  );
  return !unsafe || unsafe.probability < 0.3;
}
