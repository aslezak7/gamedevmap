import Component from "./_component";

export default class VelocityComponent extends Component {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}
