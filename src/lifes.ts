import { Sprite } from "kontra";

export default class Lifes {
  sprites: Sprite[];
  lifesCount = 3;

  constructor() {
    const width = 10;
    const height = 10;
    const margin = 5;
    this.sprites = Array(3)
      .fill(null)
      .map((_, index) =>
        Sprite({
          x: margin * (index + 1) + width * index,
          y: window.gameCanvas.height - height - margin,
          width: 10,
          height: 10,
          color: "red",
        })
      );
  }

  render(): void {
    this.sprites.map((sprite) => sprite.render());
  }

  update(): void {
    this.sprites.forEach((sprite, index) => {
      if (index < this.lifesCount) {
        sprite.color = "red";
      } else {
        sprite.color = "black";
      }
    });
  }

  discountLife(): void {
    this.lifesCount--;
  }

  isLive(): boolean {
    return this.lifesCount > 0;
  }
}
