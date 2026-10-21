import * as tf from "@tensorflow/tfjs";
import type { NSFWJS } from "nsfwjs";
import sharp from "sharp";

let modelPromise: Promise<NSFWJS> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = import("nsfwjs")
      .then((nsfwjs) => nsfwjs.load())
      .catch((error) => {
        modelPromise = null;
        throw error;
      });
  }
  return modelPromise;
}

export async function isImageSafeServer(
  imageBuffer: ArrayBuffer,
): Promise<boolean> {
  const { data, info } = await sharp(Buffer.from(imageBuffer))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const tensor = tf.tensor3d(new Uint8Array(data), [
    info.height,
    info.width,
    3,
  ]);

  try {
    const model = await getModel();
    const predictions = await model.classify(
      tensor as Parameters<NSFWJS["classify"]>[0],
    );
    const unsafe = predictions.find(
      (prediction) =>
        prediction.className === "Porn" ||
        prediction.className === "Hentai" ||
        prediction.className === "Sexy",
    );
    return !unsafe || unsafe.probability < 0.3;
  } finally {
    tensor.dispose();
  }
}
