import { GameStatus } from "./types";

enum Layer {
  Info = "info",
  Game = "game",
}

const layers = {
  [GameStatus.Stop]: Layer.Info,
  [GameStatus.Play]: Layer.Game,
  [GameStatus.Pause]: Layer.Game,
  [GameStatus.Complete]: Layer.Info,
  [GameStatus.GameOver]: Layer.Info,
};

export default class Layers {
  constructor() {
    this.layerElements = Object.values(Layer).map((layerId) =>
      document.getElementById(layerId)
    );
  }

  toggle(gameStatus: GameStatus): void {
    const activeLayer = layers[gameStatus];
    this.layerElements.forEach((layerElement) => {
      layerElement.style.visibility =
        layerElement.id === activeLayer ? "visible" : "hidden";
    });
  }
}
