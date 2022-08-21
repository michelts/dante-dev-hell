import { Sprite, SpriteSheet, Animation, keyPressed, collides } from 'kontra';
import boat from './assets/boat.svg';

export default class Character {
  canvas: HTMLCanvasElement;
  sprite: Sprite;
  speed = 2;

  collisionAnimationTimeout: number = 0

  constructor(canvas) {
    const width = 30;
    const height = 60;
    const margin = 20;
    this.canvas = canvas

    this.spriteSheet = SpriteSheet({
      image: this.image(),
      frameWidth: width,
      frameHeight: height,
      animations: {
        default: {
          frames: [0],
        },
        flash: {
          frames: [0, 1],
          frameRate: 10,
        }
      }
    })

    this.sprite = Sprite({
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) - margin,
      width,
      height,
      anchor: {x: 0.5, y: 0.5},
      spriteSheet: this.spriteSheet,
      animations: this.spriteSheet.animations,
    })
  }

  image() {
    var img = new Image(30, 60);
    img.src = boat;
    return img
  }

  render() {
    this.sprite.render()
  }

  update() {
    this.allowMove();
    this.sprite.update();
    if (this.collisionAnimationTimeout) {
      this.collisionAnimationTimeout--
    } else {
      this.sprite.playAnimation('default')
    }
  }

  allowMove() {
    if(keyPressed("arrowleft")) {
      this.sprite.x = this.sprite.x - this.speed
    }
    if(keyPressed("arrowright")) {
      this.sprite.x = this.sprite.x + this.speed
    }
  }

  toggleCollisionAnimation(monster) {
    if(collides(this.sprite, monster.sprite)) {
      this.collisionAnimationTimeout = 30
      this.sprite.playAnimation('flash')
    }
  }

}
