"use client";

import type { NSFWJS } from "nsfwjs";

let modelPromise: Promise<NSFWJS> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = Promise.all([import("nsfwjs"), import("@tensorflow/tfjs")])
      .then(([nsfwjs]) => nsfwjs.load())
      .catch((error) => {
        modelPromise = null;
        throw error;
      });
  }
  return modelPromise;
}

export function preloadImageSafetyModel() {
  void getModel().catch(() => undefined);
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
