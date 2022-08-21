import { Sprite } from 'kontra/kontra.mjs';
import monster from './assets/monster.svg'

export default class Monster {
  canvas: HTMLCanvasElement;
  sprite: Sprite;

  constructor(canvas) {
    this.canvas = canvas
    this.sprite = Sprite({
      x: 100,
      y: -80,
      width: 30,
      height: 30,
      dy: 2,
      image: this.image(),
    })
  }

  image() {
    var img = new Image(30, 30);
    img.src = monster;
    return img
  }

  render() {
    this.sprite.render()
  }

  fall() {
    this.sprite.update();
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas() {
    if (this.sprite.y > this.canvas.height) {
      this.sprite.y = -this.sprite.height;
    }
  }
}
