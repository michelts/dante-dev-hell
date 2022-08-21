import { Sprite, keyPressed, collides } from 'kontra/kontra.mjs';
import boat from './assets/boat.svg';

export default class Character {
  canvas: HTMLCanvasElement;
  sprite: Sprite;
  speed = 2;

  constructor(canvas) {
    const width = 30;
    const height = 60;
    const margin = 20;
    this.canvas = canvas
    this.sprite = Sprite({
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) - margin,
      width,
      height,
      color: 'yellow',
      image: this.image(),
    })
  }

  image() {
    var img = new Image(30, 30);
    img.src = boat;
    return img
  }

  render() {
    this.sprite.render()
  }

  allowMove() {
    if(keyPressed("arrowleft")) {
      this.sprite.x = this.sprite.x - this.speed
    }
    if(keyPressed("arrowright")) {
      this.sprite.x = this.sprite.x + this.speed 
    }
  }

  hasCollided(monster) {
    return collides(this.sprite, monster.sprite);
  }

  flash() {
    this.sprite.color = 'green';
  }
}
