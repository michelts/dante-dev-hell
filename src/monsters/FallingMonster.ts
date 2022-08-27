import { Sprite } from "kontra";
import BaseMonster from "./base";
import monster from "../assets/monster.svg";

export default class FallingMonster extends BaseMonster {
  getSprite(): Sprite {
    return Sprite({
      x: 100,
      y: -80,
      width: 30,
      height: 30,
      dy: 2,
      image: this.image(),
    });
  }

  image(): HTMLImage {
    const img = new Image(30, 30);
    img.src = monster;
    return img;
  }
}
