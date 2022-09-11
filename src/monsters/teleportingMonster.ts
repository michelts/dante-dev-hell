import Hero from "../hero";
import BaseMonster from "./base";

export default class TeleportingMonster extends BaseMonster {
  private readonly threshold: number;
  private teleported: boolean = false;
  private readonly eyesTop = 21;
  private readonly eyesLeft = 11;
  private readonly eyesGap = 10;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    const baseDistance = Math.min(300, window.gameCanvas.height / 2);
    const baseSpeed = 2;
    const incrementRate = 0.2;
    this.threshold =
      baseDistance * (1 + incrementRate * (this.verticalSpeed - baseSpeed));
  }

  fall(hero: Hero): void {
    if (
      window.gameCanvas.height - this.sprite.y < this.threshold &&
      !this.teleported
    ) {
      this.teleport(hero);
    }
    super.fall(hero);
  }

  protected getImagePath(): string {
    return "m 5.1,22 c -3.2,4.86 -5.7,11 -4.2,13 1.6,1.6 3.1,-4.2 4.4,-3.4 1.5,0.94 -0.97,12 3.4,16 6.2,5.3 4.5,-5.4 7,-1.4 5.5,8.9 4.2,-0.54 6.3,-0.81 2.5,-0.33 2.8,8.3 5.5,-1.9 1.9,-6.9 -3.4,-16 2.4,-11 1.1,0.93 5.4,2.7 4.5,-0.038 -1.5,-4.3 -7,-5.7 -8.3,-9.1 -1.7,-4.5 -1.4,-8.2 -4.4,-10 -3.7,-2.8 -11,-1.3 -7.8,-7.1 0.92,-1.6 2.9,-2.7 4.8,-1.8 2,0.93 1.7,3.8 -2.8,2.8 1.1,3.3 4.8,3.2 6.8,0.25 3.3,-4.7 -3.5,-8.5 -9.4,-5.4 -4.7,2.5 -6,5.6 -6.7,8.7 C 6.2,14 6.3,20 5.1,22 Z";
  }

  protected getShadowPath(): string {
    return "m 5.1,22 c -3.2,4.86 -5.7,11 -4.2,13 1.6,1.6 3.1,-4.2 4.4,-3.4 1.5,0.94 -0.97,12 3.4,16 2,1.7 3,1.7 4,1.2 C 7,5 9,34 8.5,28 8,17 10,9 13.3,2.1 c -4.7,2.5 -6,5.6 -6.7,8.7 C 6.2,14 6.3,20 5.1,22 Z";
  }

  private teleport(hero: Hero) {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const newLeftPosition = heroCenter - this.sprite.width / 2;
    const maxPosition = window.gameCanvas.width - this.sprite.width;
    this.sprite.x = Math.min(Math.max(0, newLeftPosition), maxPosition); // clamp
    this.teleported = true;
  }
}
