import InputComponent from "../components/InputComponent";
import PositionComponent from "../components/PositionComponent";
import VelocityComponent from "../components/VelocityComponent";
import System from "./_system";

export default class MovementSystem extends System {
  moveSpeed: number;
  constructor(moveSpeed: number = 0.01) {
    super();
    this.moveSpeed = moveSpeed;
  }
  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const input = entity.getComponent(InputComponent);
      if (!position || !velocity || !input) return;

      if (input.keysDown.has("s")) {
        velocity.y = 1 * this.moveSpeed;
      } else {
        velocity.y = 0;
      }

      position.x += velocity.x * deltaTime;
      const newPosition = position.y + velocity.y * deltaTime;
      console.log(newPosition);
      position.y = newPosition;
      velocity.y = 0;
    });
  }
}
