import BaseMonster from "./base";
import { Sprite } from "kontra";

export default class FallingMonster extends BaseMonster {
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
}

function renderImage(ctx) {
  // 35x50
  ctx.scale(1.5, 1.5);
  const path = new Path2D(
    "m 35,20 c 0,7 -1,23 -3.3,30 L 28,41 22,50 18,40 10,49 7,40 0,48 C 0,39 2,36 3,23 4,12 6,0 16,0 25,0 34,3 35,21 Z"
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
      [-1, 0],
      [1, 12],
    ].forEach(([rotation, delta]) => {
      ctx.ellipse(
        15 + delta,
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
    "M 4,42 0,48 C 0,39 2,35 3,23 3.5,12 6,0 15,0 20,0 23,0 26,2 3.3,3 10,20 5,42 Z"
  );
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fill(shadow);
}
