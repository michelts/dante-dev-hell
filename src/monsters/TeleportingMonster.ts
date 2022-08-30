import { Sprite } from "kontra";
import Hero from "../hero";
import BaseMonster from "./base";
import monster from "../assets/monster.svg";

export default class TeleportingMonster extends BaseMonster {
  private teleported: boolean = false;

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
    if (this.sprite.y > window.gameCanvas.height / 2 && !this.teleported) {
      this.teleport(hero);
    }
    super.fall();
  }

  private teleport(hero: Hero) {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const newLeftPosition = heroCenter - this.sprite.width / 2;
    const maxPosition = window.gameCanvas.width - this.sprite.width;
    this.sprite.x = Math.min(Math.max(0, newLeftPosition), maxPosition); // clamp
    this.teleported = true;
  }
}
