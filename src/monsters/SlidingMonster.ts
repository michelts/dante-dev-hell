import { Sprite, emit } from 'kontra';
import monster from '../assets/monster.svg'

export default class Monster2 {
  sprite: Sprite;
  reverseDirection: boolean
  xSpeed = 1

  constructor() {
    this.reverseDirection = false
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
    this.slideHorizontally();
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas() {
    if (this.sprite.y > window.gameCanvas.height) {
      emit('monsterDead')
    }
  }

  slideHorizontally() {
    const newPosition = this.sprite.x + this.xSpeed * (this.reverseDirection ? -1 : 1)
    if ((newPosition < 0) || ((newPosition + this.sprite.width) > window.gameCanvas.width)) {
      this.reverseDirection = !this.reverseDirection
    } else {
      this.sprite.x = newPosition
    }
  }
}
