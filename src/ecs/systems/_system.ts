import Entity from "../entities/_entity";

export default class System {
  entities: Entity[];
  constructor() {
    this.entities = [];
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }
}
