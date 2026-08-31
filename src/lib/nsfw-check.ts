"use client";

let modelPromise: Promise<any> | null = null;

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
    (p: any) =>
      p.className === "Porn" ||
      p.className === "Hentai" ||
      p.className === "Sexy"
  );
  return !unsafe || unsafe.probability < 0.3;
}
