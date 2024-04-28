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

export async function loadJSON(key: string, fileName: string) {
  const json = await fetch(fileName).then((res) => res.json());
  assets.set(key, json);
  return assets.get(key);
}
