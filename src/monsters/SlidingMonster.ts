import { Sprite } from 'kontra';
import BaseMonster from './base';
import monster from '../assets/monster.svg'

export default class SlidingMonster extends BaseMonster {
  reverseDirection: boolean
  xSpeed = 1

  constructor() {
    super()
    this.reverseDirection = false
  }

  getSprite() {
    return Sprite({
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
    this.slideHorizontally()
    super.fall()
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
