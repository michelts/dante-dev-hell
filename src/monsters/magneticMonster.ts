import Hero from "../hero";
import BaseMonster from "./base";
import monster from "../assets/monster-4.svg";

export default class MagneticMonster extends BaseMonster {
  private readonly width = 90;
  private readonly height = 85;
  slideSpeed: number;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.slideSpeed = Math.sqrt(this.verticalSpeed);
  }

  image(): HTMLImageElement {
    const img = new Image(this.width, this.height);
    img.src = monster;
    return img;
  }

  fall(hero: Hero): void {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const monsterCenter = this.sprite.x + this.sprite.width / 2;
    let movement = 0;
    if (monsterCenter < heroCenter) {
      movement = this.slideSpeed;
    } else if (monsterCenter > heroCenter) {
      movement = -1 * this.slideSpeed;
    }
    this.sprite.x += movement;
    super.fall();
  }
}
