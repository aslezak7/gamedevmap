import PositionComponent from "../components/PositionComponent";
import RenderableComponent from "../components/RenderableComponent";
import TileComponent from "../components/TileComponent";
import Entity from "../entities/_entity";
import System from "./_system";

export default class TileMapSystem extends System {
  constructor(
    private mapData: any[],
    private tileSize: number,
    private tileAtlas: HTMLImageElement
  ) {
    super();
  }

  initialize() {
    const height = this.mapData.length;
    const width = this.mapData[0].length;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const tileType = this.mapData[row][col];
        if (tileType === 0) continue;
        const entity = new Entity();
        entity.addComponent(
          new PositionComponent(col * this.tileSize, row * this.tileSize)
        );
        entity.addComponent(new TileComponent(tileType));
        entity.addComponent(new RenderableComponent(this.tileAtlas, tileType));
        this.addEntity(entity);
      }
    }
  }
}
