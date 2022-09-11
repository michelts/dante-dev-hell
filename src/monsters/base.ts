import { Sprite, emit } from "kontra";
import { Monster } from "../types";
import Hero from "../hero";

export default class BaseMonster implements Monster {
  readonly width: number = 100;
  readonly height: number = 80;
  sprite: Sprite;
  protected verticalSpeed: number;
  private readonly limitToCallNextMonster: number;
  private nextMonsterCalled = false;
  private monsterLeftScreen = false;

  constructor({ speed, frequency }: { speed: number; frequency: number }) {
    this.verticalSpeed = speed;
    this.limitToCallNextMonster = window.gameCanvas.height * frequency;
    this.sprite = this.getSprite();
  }

  getSprite(): Sprite {
    return Sprite({
      ...this.getInitialPosition(),
      width: this.width,
      height: this.height,
      image: this.image(),
    });
  }

  protected getInitialPosition(): { x: number; y: number } {
    const maxWidth = window.gameCanvas.width - this.width;
    return { x: Math.trunc(Math.random() * maxWidth), y: -1 * this.height };
  }

  image(): HTMLImageElement {
    throw new Error("Not Implemented");
  }

  render(): void {
    this.sprite.render();
  }

  fall(hero: Hero): void {
    this.sprite.update();
    this.sprite.y += 2 * this.verticalSpeed;
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas(): void {
    if (
      !this.nextMonsterCalled &&
      this.sprite.y > this.limitToCallNextMonster
    ) {
      this.nextMonsterCalled = true;
      emit("callNextMonster");
    }
    if (!this.monsterLeftScreen && this.sprite.y > window.gameCanvas.height) {
      this.monsterLeftScreen = true;
      emit("destroyMonster");
    }
  }
}
