import { GameStatus } from "./types";
import Layers from "./layers";
import Content from './content';

export default class Screen {
  constructor() {
    this.layers = new Layers();
    this.content = new Content();
  }

  render(newGameStatus: GameStatus): void {
    if (this.currentGameStatus === newGameStatus) {
      return;
    }
    this.layers.toggle(newGameStatus);
    this.content.toggle(newGameStatus);
    this.currentGameStatus = newGameStatus;
  }
}
