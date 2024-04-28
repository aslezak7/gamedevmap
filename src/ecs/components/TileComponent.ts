import Component from "./_component";

export default class TileComponent extends Component {
  tileType: number;
  constructor(tileType: number) {
    super();
    this.tileType = tileType;
  }
}
