import { Sprite } from "kontra";
import BaseMonster from "./base";
import monster from "../assets/monster.svg";

export default class MagneticMonster extends BaseMonster {
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

  fall(hero): void {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const monsterCenter = this.sprite.x + this.sprite.width / 2;
    let movement = 0
    if (monsterCenter < heroCenter) {
      movement = 2 * this.verticalSpeed
    } else if (monsterCenter > heroCenter) {
      movement = -2 * this.verticalSpeed
    }
    console.log(heroCenter, monsterCenter, movement)
    this.sprite.x += movement
    super.fall()
  }
}
