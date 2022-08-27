import { Sprite, emit } from 'kontra';

export default class BaseMonster {
  sprite: Sprite;

  constructor() {
    this.sprite = this.getSprite()
  }

  getSprite(): Sprite {
    throw new Error('Not Implemented Yet');
  }

  render() {
    this.sprite.render()
  }

  fall() {
    this.sprite.update();
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas() {
    if (this.sprite.y > window.gameCanvas.height) {
      emit('monsterDead')
    }
  }
}
