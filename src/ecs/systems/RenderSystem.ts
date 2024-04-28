import PositionComponent from "../components/PositionComponent";
import RenderableComponent from "../components/RenderableComponent";
import System from "./_system";

export default class RenderSystem extends System {
  constructor(private ctx: CanvasRenderingContext2D, private tileSize: number) {
    super();
  }
  draw(): void {
    for (let entity of this.entities) {
      const position = entity.getComponent(PositionComponent);
      const renderable = entity.getComponent(RenderableComponent);
      if (position && renderable) {
        this.drawTile(position, renderable);
      }
    }
  }

  private drawTile(
    position: PositionComponent,
    renderable: RenderableComponent
  ) {
    const { x, y } = position;
    const { tileType, imageSource } = renderable;
    const sourceX = (tileType - 1) * this.tileSize;
    this.ctx.drawImage(
      imageSource,
      sourceX,
      0,
      this.tileSize,
      this.tileSize,
      x,
      y,
      this.tileSize,
      this.tileSize
    );
  }
}
