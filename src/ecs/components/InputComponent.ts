import Component from "./_component";

export default class InputComponent extends Component {
  public keysDown: Set<string> = new Set();
  public keysPressed: Set<string> = new Set();
  public keysReleased: Set<string> = new Set();
  constructor() {
    super();
  }
  updateKey(key: string, isDown: boolean): void {
    if (isDown) {
      if (!this.keysDown.has(key)) {
        this.keysPressed.add(key);
      }
      this.keysDown.add(key);
    } else {
      if (this.keysDown.has(key)) {
        this.keysReleased.add(key);
      }
      this.keysDown.delete(key);
    }
  }

  endFrame(): void {
    this.keysPressed.clear();
    this.keysReleased.clear();
  }
}
