import BaseMonster from "./base";

export default class SlidingMonster extends BaseMonster {
  reverseDirection: boolean;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.reverseDirection = false;
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
