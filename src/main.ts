import { loadImage, loadJSON } from "./assetLoader";
import InputComponent from "./ecs/components/InputComponent";
import PositionComponent from "./ecs/components/PositionComponent";
import RenderableComponent from "./ecs/components/RenderableComponent";
import VelocityComponent from "./ecs/components/VelocityComponent";
import Entity from "./ecs/entities/_entity";
import InputSystem from "./ecs/systems/InputSystem";
import MovementSystem from "./ecs/systems/MovementSystem";
import RenderSystem from "./ecs/systems/RenderSystem";
import TileMapSystem from "./ecs/systems/TileMapSystem";
import "./style.css";
const tileSize = 16;

window.onload = async () => {
  let canvas = getCanvas();
  let ctx = getCanvasContext(canvas);
  const tileAtlas = await loadImage("tileAtlas", "assets/tiles.png");
  const playerAtlas = await loadImage("playerAtlas", "assets/player.png");
  const jsonData = await loadJSON("mapData", "assets/map.json");
  const mapData = convertArrayTo2D(jsonData.layers[0].data, jsonData.width);
  const entities = [];
  const tileMapSystem = new TileMapSystem(mapData, tileSize, tileAtlas);
  tileMapSystem.initialize();
  entities.push(...tileMapSystem.entities);
  setupCanvas(
    canvas,
    ctx,
    tileSize * jsonData.width,
    tileSize * jsonData.height
  );

  const player = new Entity();
  player.addComponent(new PositionComponent(0, 0));
  player.addComponent(new VelocityComponent());
  player.addComponent(new InputComponent());
  player.addComponent(new RenderableComponent(playerAtlas, 1));

  entities.push(player);

  const renderSystem = new RenderSystem(ctx, tileSize);
  renderSystem.entities = entities;

  const inputSystem = new InputSystem();
  inputSystem.entities = entities;

  const movementSystem = new MovementSystem();
  movementSystem.entities = entities;

  // drawMapLayers(jsonData, ctx, tileSize, tileAtlas);

  function setupCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = false;
  }

  function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderSystem.draw();
  }

  function update(deltaTime: number) {
    movementSystem.update(deltaTime);
  }
  let lastTime = performance.now();
  function gameLoop(currentTime: number) {
    const deltaTime = currentTime - lastTime / 1000;
    update(deltaTime);
    draw();
    lastTime = currentTime;
    requestAnimationFrame(() => gameLoop(deltaTime));
  }

  requestAnimationFrame(gameLoop);
};

function getCanvas(): HTMLCanvasElement {
  let canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  return canvas;
}

function getCanvasContext(canvas: HTMLCanvasElement) {
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context not found");
  }
  return ctx;
}

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
  tileSize: number,
  image: HTMLImageElement
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
        drawTile(ctx, x, y, tileSize, tile, image);
      }
    }
  }
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tileSize: number,
  tileType: number,
  image: HTMLImageElement
) {
  if (tileType === 0) {
    return;
  }
  if (tileType === 1) {
    ctx.drawImage(image, 0, 0, tileSize, tileSize, x, y, tileSize, tileSize);
    return;
  }

  if (tileType === 2) {
    ctx.drawImage(image, 16, 0, tileSize, tileSize, x, y, tileSize, tileSize);
    return;
  }

  if (tileType === 3) {
    ctx.drawImage(image, 32, 0, tileSize, tileSize, x, y, tileSize, tileSize);
    return;
  }
}
