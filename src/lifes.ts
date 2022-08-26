import { Sprite } from 'kontra';

export default class Lifes {
  sprites: Array<Sprite>;
  lifesCount = 3;

  constructor() {
    const width = 10
    const height = 10
    const margin = 5
    this.sprites = Array(3).fill(null).map((_, index) => Sprite({
      x: margin * (index + 1) + (width * index),
      y: window.gameCanvas.height - height - margin,
      width: 10,
      height: 10,
      color: 'red',
    }))
  }

  render() {
    this.sprites.map(sprite => sprite.render())
  }

  update() {
    this.sprites.forEach((sprite, index) => {
      if(index < this.lifesCount) {
        sprite.color = 'red';
      } else {
        sprite.color = 'black';
      }
    });
  }

  discountLife() {
    this.lifesCount--;
  }

  isLive() {
    return this.lifesCount > 0;
  }
}