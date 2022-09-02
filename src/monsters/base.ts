import { Sprite, emit } from "kontra";
import monster from "../assets/monster.svg";

export default class BaseMonster {
  private readonly width = 30;
  private readonly height = 30;
  sprite: Sprite;
  verticalSpeed: number;

  constructor({ speed }: { speed: number }) {
    this.verticalSpeed = speed;
    this.sprite = this.getSprite();
  }

  getSprite(): Sprite {
    const maxWidth = window.gameCanvas.width - this.width;
    const x = parseInt(Math.random() * maxWidth);
    return Sprite({
      x,
      y: -80,
      width: this.width,
      height: this.height,
      image: this.image(),
    });
  }

  image(): HTMLImageElement {
    const img = new Image(this.width, this.height);
    img.src = monster;
    return img;
  }

  render(): void {
    this.sprite.render();
  }

  fall(): void {
    this.sprite.update();
    this.sprite.y += 2 * this.verticalSpeed;
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas(): void {
    if (this.sprite.y > window.gameCanvas.height) {
      emit("monsterLeft");
    }
  }
}
