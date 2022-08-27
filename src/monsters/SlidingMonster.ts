import { Sprite } from "kontra";
import BaseMonster from "./base";
import monster from "../assets/monster.svg";

export default class SlidingMonster extends BaseMonster {
  reverseDirection: boolean;
  xSpeed = 1;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.reverseDirection = false;
  }

  getSprite(): Sprite {
    return Sprite({
      x: 100,
      y: -80,
      width: 30,
      height: 30,
      image: this.image(),
    });
  }

  image(): HTMLImageElement {
    const img = new Image(30, 30);
    img.src = monster;
    return img;
  }

  render(): void {
    this.sprite.render();
  }

  fall(): void {
    this.slideHorizontally();
    super.fall();
  }

  slideHorizontally(): void {
    const newPosition =
      this.sprite.x + this.xSpeed * (this.reverseDirection ? -1 : 1);
    if (
      newPosition < 0 ||
      newPosition + this.sprite.width > window.gameCanvas.width
    ) {
      this.reverseDirection = !this.reverseDirection;
    } else {
      this.sprite.x = newPosition;
    }
  }
}
