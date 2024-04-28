import "./style.css";

window.onload = async () => {
  const jsonData = JSON.parse(
    await fetch("/assets/map.json").then((res) => res.text())
  );
  let tileSize = 16;
  let canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  let ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not found");
  }
  setupCanvas(
    canvas,
    ctx,
    tileSize * jsonData.width,
    tileSize * jsonData.height
  );

  drawMapLayers(jsonData, ctx, tileSize);

  function setupCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width = window.innerWidth,
    height = window.innerHeight
  ) {
    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = false;
  }
};

function convertArrayTo2D(array: any[], width: number) {
  let result = [];
  for (let i = 0; i < array.length; i += width) {
    result.push(array.slice(i, i + width));
  }
  return result;
}

function drawMapLayers(
  jsonData: any,
  ctx: CanvasRenderingContext2D,
  tileSize: number
) {
  let layers = jsonData.layers;
  for (let layer of layers) {
    let data = layer.data;
    let width = layer.width;
    let height = layer.height;
    let tiles = convertArrayTo2D(data, width);
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let tile = tiles[row][col];
        if (tile === 0) {
          continue;
        }
        let x = col * tileSize;
        let y = row * tileSize;
        if (tile == 1) {
          ctx.fillStyle = "black";
        }

        if (tile == 2) {
          ctx.fillStyle = "green";
        }
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
  }
}
