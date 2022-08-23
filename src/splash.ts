import { Sprite } from 'kontra';

export default class Splash {
  canvas: HTMLCanvasElement;
  sprite: Sprite;

  constructor(canvas) {
    this.canvas = canvas
    this.sprite = Sprite({
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
      color: 'blue',
    });
  }

  render() {
    this.sprite.render()
  }
}
