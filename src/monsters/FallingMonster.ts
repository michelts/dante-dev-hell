import { Sprite, emit } from 'kontra';
import monster from '../assets/monster.svg'

export default class Monster {
  sprite: Sprite;

  constructor() {
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
    if (this.sprite.y > window.gameCanvas.height) {
      emit('monsterDead')
    }
  }
}
