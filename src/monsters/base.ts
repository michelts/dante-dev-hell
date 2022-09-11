import { Sprite, emit } from "kontra";
import * as types from "../types";
import Hero from "../hero";

export default class BaseMonster implements types.Monster {
  readonly width: number = 49;
  readonly height: number = 70;
  sprite: Sprite;
  protected verticalSpeed: number;
  private readonly limitToCallNextMonster: number;
  private nextMonsterCalled = false;
  private monsterLeftScreen = false;

  // Eyes parameters for subclasses
  protected defaultEyeRotation: types.EyeRotation = types.EyeRotation.Direct;
  protected eyesLeft: number = 15;
  protected eyesTop: number = 15;
  protected eyesGap: number = 13;

  constructor({ speed, frequency }: { speed: number; frequency: number }) {
    this.verticalSpeed = speed;
    this.limitToCallNextMonster = window.gameCanvas.height * frequency;
    this.sprite = this.getSprite();
  }

  private getSprite(): Sprite {
    const bindedRenderImage = this.renderImage.bind(this);
    return Sprite({
      ...this.getInitialPosition(),
      width: this.width,
      height: this.height,
      render: function () {
        bindedRenderImage(this.context);
      },
    });
  }

  private getInitialPosition(): { x: number; y: number } {
    const maxWidth = window.gameCanvas.width - this.width;
    return { x: Math.trunc(Math.random() * maxWidth), y: -1 * this.height };
  }

  private renderImage(ctx: CanvasRenderingContext2D): void {
    this.setScale(ctx);
    this.placeImage(ctx);
    this.placeEyes(ctx, 15, 15);
    this.placeShadow(ctx);
  }

  protected setScale(ctx: CanvasRenderingContext2D): void {
    // Paths have 35x50px - we adjust it to fit 54x70
    ctx.scale(1.4, 1.4);
  }

  private placeImage(ctx: CanvasRenderingContext2D): void {
    const path = new Path2D(this.getImagePath());
    ctx.filter = "drop-shadow(3px 3px 3px rgba(0,0,0,0.3)";
    ctx.fillStyle = "#000";
    ctx.fill(path);

    ctx.filter = "none";
    ctx.fillStyle = "#fff";
    ctx.fill(path);

    ctx.strokeStyle = "#333";
    ctx.stroke(path);
  }

  private placeEyes(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.placeEye(
      ctx,
      this.eyesLeft,
      this.eyesTop,
      types.EyeRotation.Inverse * this.defaultEyeRotation
    );
    this.placeEye(
      ctx,
      this.eyesLeft + this.eyesGap,
      this.eyesTop,
      types.EyeRotation.Direct * this.defaultEyeRotation
    );
  }

  private placeEye(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rotation: number
  ): void {
    [
      ["blur(2px)", "#000"],
      ["none", "#333"],
    ].forEach(([filterEffect, color]) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.filter = filterEffect;
      const angle = (rotation * Math.PI) / 4;
      const width = 3.5;
      const height = 2.5;
      ctx.ellipse(x, y, width, height, angle, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  private placeShadow(ctx: CanvasRenderingContext2D): void {
    const shadow = new Path2D(this.getShadowPath());
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill(shadow);
  }

  protected getImagePath(): string {
    throw new Error("Not Implemented");
  }

  protected getShadowPath(): string {
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
