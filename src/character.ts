import { Sprite, SpriteSheet, Animation, keyPressed, collides, emit, on } from 'kontra';
import boat from './assets/boat.svg';

export default class Character {
  canvas: HTMLCanvasElement;
  sprite: Sprite;
  spriteSheet: SpriteSheet;
  speed = 3;

  isColliding = false
  collisionAnimationTimeout: number = null

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
    var img = new Image(60, 30);
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
    } else if(this.collisionAnimationTimeout === 0) {
      this.collisionAnimationTimeout = null;
      this.sprite.playAnimation('default')
      emit('killed', this)
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

  killOnCollide(monster) {
    if(collides(this.sprite, monster.sprite)) {
      if(!this.isColliding) {
        this.isColliding = true
        this.collisionAnimationTimeout = 30
        this.sprite.playAnimation('flash')
      }
    } else {
      this.isColliding = false
    }
  }
}
