import { Sprite, SpriteSheet, collides, emit, on, off } from "kontra";
import * as types from "./types";
import * as songs from "./songs";
import boat from "./assets/boat.svg";

export default class Hero implements types.Hero {
  private readonly bindedHandleHeroMoved;
  private readonly width = 50;
  private readonly height = 100;
  sprite: Sprite;
  spriteSheet: SpriteSheet;
  speed = 3;

  isColliding = false;
  collisionAnimationTimeout: number | null = null;

  constructor() {
    this.bindedHandleHeroMoved = this.handleHeroMoved.bind(this);
    this.createSprites();
    this.addEventListeners();
  }

  destroy(): void {
    this.removeEventListeners();
  }

  private addEventListeners() {
    on("heroMoved", this.bindedHandleHeroMoved);
  }

  private removeEventListeners() {
    off("heroMoved", this.bindedHandleHeroMoved);
  }

  private createSprites() {
    const margin = 30;
    this.spriteSheet = SpriteSheet({
      image: this.image(),
      frameWidth: this.width,
      frameHeight: this.height,
      animations: {
        default: {
          frames: [0],
        },
        flash: {
          frames: [0, 1],
          frameRate: 10,
        },
      },
    });
    this.sprite = Sprite({
      x: (window.gameCanvas.width - this.width) / 2,
      y: window.gameCanvas.height - this.height - margin,
      width: this.width,
      height: this.height,
      anchor: { x: 0, y: 0 },
      spriteSheet: this.spriteSheet,
      animations: this.spriteSheet.animations,
    });
  }

  image(): HTMLImageElement {
    const img = new Image(this.height, this.width);
    img.src = boat;
    return img;
  }

  render(): void {
    this.sprite.render();
  }

  update(): void {
    this.sprite.update();

    if (
      this.collisionAnimationTimeout != null &&
      this.collisionAnimationTimeout !== 0
    ) {
      this.collisionAnimationTimeout--;
    } else if (this.collisionAnimationTimeout === 0) {
      this.collisionAnimationTimeout = null;
      this.sprite.playAnimation("default");
      emit("killed", this);
    }
  }

  killOnCollide(monster: types.Monster): void {
    if (collides(this.sprite, monster.sprite)) {
      if (!this.isColliding) {
        this.isColliding = true;
        this.collisionAnimationTimeout = 30;
        this.sprite.playAnimation("flash");
        songs.hit();
      }
    } else {
      this.isColliding = false;
    }
  }

  private handleHeroMoved(direction: number) {
    if (direction === 1) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  private moveLeft() {
    const newX = this.sprite.x - this.speed;
    if (newX >= 0) {
      this.sprite.x = newX;
    }
  }

  private moveRight() {
    const newX = this.sprite.x + this.speed;
    if (newX <= window.gameCanvas.width - this.sprite.width) {
      this.sprite.x = newX;
    }
  }
}
