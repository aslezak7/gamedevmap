import Component from "./_component";

export default class RenderableComponent extends Component {
  constructor(public imageSource: HTMLImageElement, public tileType: number) {
    super();
  }
}
