import Component from "../components/_component";
import { v4 as uuidv4 } from "uuid";
export default class Entity {
  private id: string;
  private components: Map<string, Component> = new Map();
  constructor() {
    this.id = uuidv4();
  }

  addComponent(component: Component) {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T extends Component>(constructor: {
    new (...args: any[]): T;
  }): T {
    return this.components.get(constructor.name) as T;
  }
}
