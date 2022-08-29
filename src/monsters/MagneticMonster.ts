import { Sprite } from "kontra";
import Hero from "../hero";
import BaseMonster from "./base";
import monster from "../assets/monster.svg";

export default class MagneticMonster extends BaseMonster {
  slideSpeed: number;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.slideSpeed = Math.sqrt(this.verticalSpeed);
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
