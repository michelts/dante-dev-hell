import { Sprite, emit, on, off } from "kontra";

export default class Lifes {
  sprites: Sprite[];
  lifesCount = 3;

  constructor() {
    this.bindedDiscountLife = this.discountLife.bind(this);
    this.attachEventListeners();
    this.createSprites();
  }

  render(): void {
    this.sprites.map((sprite) => sprite.render());
  }

  update(): void {
    this.sprites.forEach((sprite, index) => {
      if (index < this.lifesCount) {
        sprite.fillColor = "rgba(255, 0, 0, 1)";
      } else {
        sprite.fillColor = "rgba(255, 0, 0, 0.3)";
      }
    });
  }

  destroy(): void {
    this.removeEventListeners();
  }

  private attachEventListeners() {
    on("killed", this.bindedDiscountLife);
  }

  private removeEventListeners() {
    off("killed", this.bindedDiscountLife);
  }

  private createSprites() {
    const width = 16;
    const height = 16;
    const margin = 5;
    this.sprites = Array(3)
      .fill(null)
      .map((_, index) =>
        Sprite({
          x: margin * (index + 1) + width * index,
          y: window.gameCanvas.height - height - margin,
          width,
          height,
          render: function () {
            const path = new Path2D(heartPath);
            this.context.fillStyle = this.fillColor;
            this.context.filter = "drop-shadow(2px 2px 3px rgba(0, 0, 0, 1))";
            this.context.fill(path);
          },
        })
      );
  }

  private discountLife() {
    this.lifesCount--;
    if (this.lifesCount === 0) {
      emit("gameOver");
    }
  }
}

const heartPath = `
  M 2.57,0.10 C -0.12,0.65 -0.16,3.80 0.118,5.86 0.66,10.10 4.04,13.51
  8.00,16 11.97,13.501 15.34,10.10 15.89,5.86 16.16,3.79 16.12,0.65
  13.43,0.10 11.06,-0.38 9.37,0.96 8.00,3.32 6.38,0.89 5.00,-0.38 2.57,0.10 Z
`;
