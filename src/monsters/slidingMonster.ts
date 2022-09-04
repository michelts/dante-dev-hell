import BaseMonster from "./base";
import monster from "../assets/monster-2.svg";

export default class SlidingMonster extends BaseMonster {
  private readonly height = 65;
  reverseDirection: boolean;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.reverseDirection = false;
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
    this.slideHorizontally();
    super.fall();
  }

  slideHorizontally(): void {
    const newPosition =
      this.sprite.x + this.verticalSpeed * (this.reverseDirection ? -1 : 1);
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
