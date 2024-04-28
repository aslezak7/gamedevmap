export const assets = new Map();

export async function loadImage(key: string, fileName: string) {
  const image = new Image();
  image.src = fileName;
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  assets.set(key, image);
  return assets.get(key);
}
