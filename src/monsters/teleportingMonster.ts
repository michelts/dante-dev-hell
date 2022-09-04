import Hero from "../hero";
import BaseMonster from "./base";
import monster from "../assets/monster-3.svg";

export default class TeleportingMonster extends BaseMonster {
  private readonly height = 75;
  private readonly threshold: number;
  private teleported: boolean = false;

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
    super.fall();
  }

  image(): HTMLImageElement {
    const img = new Image(this.width, this.height);
    img.src = monster;
    return img;
  }

  private teleport(hero: Hero) {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const newLeftPosition = heroCenter - this.sprite.width / 2;
    const maxPosition = window.gameCanvas.width - this.sprite.width;
    this.sprite.x = Math.min(Math.max(0, newLeftPosition), maxPosition); // clamp
    this.teleported = true;
  }
}
