import InputComponent from "../components/InputComponent";
import System from "./_system";

export default class InputSystem extends System {
  constructor() {
    super();
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.entities.forEach((entity) => {
      const inputComponent = entity.getComponent(InputComponent);
      if (inputComponent) {
        inputComponent.updateKey(event.key, true);
      }
    });
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.entities.forEach((entity) => {
      const inputComponent = entity.getComponent(InputComponent);
      if (inputComponent) {
        inputComponent.updateKey(event.key, false);
      }
    });
  }

  update(): void {
    // Clear pressed and released sets at the end of the update cycle
    this.entities.forEach((entity) => {
      const input = entity.getComponent(InputComponent);
      if (!input) return;
      input.endFrame();
    });
  }
}
