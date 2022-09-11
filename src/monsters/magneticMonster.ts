import * as types from "../types";
import Hero from "../hero";
import BaseMonster from "./base";

export default class MagneticMonster extends BaseMonster {
  private slideSpeed: number;
  private eyesLeft = 11;
  private eyesGap = 12;
  private defaultEyeRotation = types.EyeRotation.Inverse;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.slideSpeed = Math.sqrt(this.verticalSpeed);
  }

  fall(hero: Hero): void {
    this.moveTowardHero(hero);
    super.fall(hero);
  }

  protected getImagePath(): string {
    return "m35 46c-2.8 0.085-9.8 1.2-12-4.1-1.5 2.4-1.4 4.2-1 6.6-5.7-0.97-8.6-2.7-11-7-0.91 2.4-1.4 4.5-0.87 7.7-10-7.6-9.2-13-8.6-27 0.23-5.5 2-11 4.9-15l-3.9-3.5 4.6 1.1-0.31-5.1 3 4.3c1.4-0.94 3-1.5 4.7-1.5 7.6-3e-5 17 2.2 15 18-0.78 7.3 3.4 21 5.5 26z";
  }

  protected getShadowPath(): string {
    return "m 11,41.5 c -0.91,2.4 -1.4,4.5 -0.87,7.7 -10,-7.6 -9.2,-13 -8.6,-27 0.23,-5.5 2,-11 4.9,-15 l -3.9,-3.5 4.6,1.1 -0.31,-5.1 3,4.3 c 1.4,-0.94 3,-1.5 4.7,-1.5 5.082539,-2.01e-5 10.970099,0.9839003 13.714695,6.3613568 C 17.092777,5.8487082 12.78185,7.0442861 9.401666,11.909225 3.6797857,20.144459 5.0268758,37.560233 11,41.5 Z";
  }

  private moveTowardHero(hero: Hero): void {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const monsterCenter = this.sprite.x + this.sprite.width / 2;
    let movement = 0;
    if (monsterCenter < heroCenter) {
      movement = this.slideSpeed;
    } else if (monsterCenter > heroCenter) {
      movement = -1 * this.slideSpeed;
    }
    this.sprite.x += movement;
  }
}
