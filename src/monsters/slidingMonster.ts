import {Sprite} from 'kontra';
import Hero from "../hero";
import BaseMonster from "./base";

export default class SlidingMonster extends BaseMonster {
  readonly height: number = 65;
  reverseDirection: boolean;

  constructor(...args: ConstructorParameters<typeof BaseMonster>) {
    super(...args);
    this.reverseDirection = false;
  }

  getSprite(): Sprite {
    return Sprite({
      x: 0,
      y: -80,
      width: this.width,
      height: this.height,
      render: function () {
        renderImage(this.context);
      },
    });
  }

  render(): void {
    this.sprite.render();
  }

  fall(hero: Hero): void {
    this.slideHorizontally();
    super.fall(hero);
  }

  slideHorizontally(): void {
    const newPosition =
      this.sprite.x + this.verticalSpeed * (this.reverseDirection ? -1 : 1);
    if (
      newPosition < 0 ||
      newPosition + this.sprite.width > window.gameCanvas.width
    ) {
      this.reverseDirection = !this.reverseDirection;
    } else {
      this.sprite.x = newPosition;
    }
  }
}

function renderImage(ctx) {
  // 35x50
  ctx.scale(1.5, 1.5);
  const path = new Path2D(
    "m 0.6,18.88 c -3.2,6.7 7.3,11 8,28 2.2,5.5 3.5,-3.9 6.1,-2.9 2.3,0.84 2.3,2 4.6,3.3 3.1,1.8 5.3,-1.1 7.3,-1.4 2.4,-0.42 5.6,6.9 5.4,-1.1 -0.45,-19 6.9,-25 -0.079,-28 -3.3,-1.4 -1.9,6.4 -3,4.1 -4.5,-9.3 -1.3,-21 -8.2,-21 -8.7,-0.43 -13,2.9 -15,19 -0.7,5.5 -2,-5.6 -5.12,0 z"
  );
  ctx.filter = "drop-shadow(3px 3px 3px rgba(0,0,0,0.3)";
  ctx.fillStyle = "#000";
  ctx.fill(path);

  ctx.filter = "none";
  ctx.fillStyle = "#fff";
  ctx.fill(path);

  ctx.strokeStyle = "#333";
  ctx.stroke(path);

  ["blur(4px)", "none"].forEach((filter) => {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.filter = filter;
    [
      [1, 0],
      [-1, 9],
    ].forEach(([rotation, delta]) => {
      ctx.ellipse(
        12 + delta, // XXX
        15,
        4,
        3,
        (rotation * Math.PI) / 4,
        0,
        2 * Math.PI
      );
    });
    ctx.fill();
  });

  const shadow = new Path2D(
    "m 0.6,18.88 c -3.2,6.7 7.3,11 8,28 2.2,5.5 3.5,-3.9 6.1,-2.9 C 9.3054086,37.60645 8.9555519,29.035045 6.2200132,25.194241 16.046146,27.812577 4.1743762,1.7533605 25.292022,4.0615333 23.66163,1.5392037 22.055474,-0.03250161 20.721,-0.12 c -8.7,-0.43 -13,2.9 -15,19 -0.7,5.5 -2,-5.6 -5.12,0 z"
  );
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fill(shadow);
}
