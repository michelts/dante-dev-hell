import Hero from "../hero";
import BaseMonster from "./base";

export default class TeleportingMonster extends BaseMonster {
  private readonly threshold: number;
  private teleported: boolean = false;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    const baseDistance = Math.min(200, window.gameCanvas.height / 2);
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

  private teleport(hero: Hero) {
    const heroCenter = hero.sprite.x + hero.sprite.width / 2;
    const newLeftPosition = heroCenter - this.sprite.width / 2;
    const maxPosition = window.gameCanvas.width - this.sprite.width;
    this.sprite.x = Math.min(Math.max(0, newLeftPosition), maxPosition); // clamp
    this.teleported = true;
  }
}
