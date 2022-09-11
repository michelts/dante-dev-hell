import * as types from "../types";
import Hero from "../hero";
import BaseMonster from "./base";

export default class SlidingMonster extends BaseMonster {
  private reverseDirection: boolean;
  private readonly defaultEyeRotation = types.EyeRotation.Inverse;
  private readonly eyesLeft = 13;
  private readonly eyesGap = 9;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.reverseDirection = false;
  }

  fall(hero: Hero): void {
    this.slideHorizontally();
    super.fall(hero);
  }

  protected getImagePath(): string {
    return "m 0.6,18.88 c -3.2,6.7 7.3,11 8,28 2.2,5.5 3.5,-3.9 6.1,-2.9 2.3,0.84 2.3,2 4.6,3.3 3.1,1.8 5.3,-1.1 7.3,-1.4 2.4,-0.42 5.6,6.9 5.4,-1.1 -0.45,-19 6.9,-25 -0.079,-28 -3.3,-1.4 -1.9,6.4 -3,4.1 -4.5,-9.3 -1.3,-21 -8.2,-21 -8.7,-0.43 -13,2.9 -15,19 -0.7,5.5 -2,-5.6 -5.12,0 z";
  }

  protected getShadowPath(): string {
    return "m 0.6,18.88 c -3.2,6.7 7.3,11 8,28 2.2,5.5 3.5,-3.9 6.1,-2.9 C 9.3054086,37.60645 8.9555519,29.035045 6.2200132,25.194241 16.046146,27.812577 4.1743762,1.7533605 25.292022,4.0615333 23.66163,1.5392037 22.055474,-0.03250161 20.721,-0.12 c -8.7,-0.43 -13,2.9 -15,19 -0.7,5.5 -2,-5.6 -5.12,0 z";
  }

  private slideHorizontally(): void {
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
