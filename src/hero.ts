import { Sprite, SpriteSheet, collides, emit, on, off } from "kontra";
import { BaseMonster } from "./monsters";
import boat from "./assets/boat.svg";

export default class Hero {
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
    const width = 30;
    const height = 60;
    const margin = 20;
    this.spriteSheet = SpriteSheet({
      image: this.image(),
      frameWidth: width,
      frameHeight: height,
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
      x: (window.gameCanvas.width - width) / 2,
      y: window.gameCanvas.height - height - margin,
      width,
      height,
      anchor: { x: 0, y: 0 },
      spriteSheet: this.spriteSheet,
      animations: this.spriteSheet.animations,
    });
  }

  image(): HTMLImageElement {
    const img = new Image(60, 30);
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

  killOnCollide(monster: BaseMonster): void {
    if (collides(this.sprite, monster.sprite)) {
      if (!this.isColliding) {
        this.isColliding = true;
        this.collisionAnimationTimeout = 30;
        this.sprite.playAnimation("flash");
      }
    } else {
      this.isColliding = false;
    }
  }

  private handleHeroMoved(direction) {
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
