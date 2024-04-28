import InputComponent from "../components/InputComponent";
import System from "./_system";

export default class InputSystem extends System {
  constructor() {
    super();
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.entities.forEach((entity) => {
      const inputComponent = entity.getComponent(InputComponent);
      if (inputComponent) {
        inputComponent.keys.add(event.key);
      }
    });
  }
}
