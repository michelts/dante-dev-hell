import { init, Sprite, GameLoop, initKeys, keyPressed, load, SpriteSheet, Animation, on, onKey } from 'kontra';
import Splash from './splash';
import Monster from './monster';
import Character from './character'
import Lifes from './lifes'

async function app() {
  let play = false;

  const { canvas } = init();
  initKeys();

  const splash = new Splash(canvas);
  let monster = new Monster(canvas);
  let character = new Character(canvas);
  let lifes = new Lifes(canvas);

  const loop = GameLoop({
    update: () => {
      if(play) {
        monster.fall()
        character.killOnCollide(monster);
        character.update()
        lifes.update()
      }
    },
    render: function() {
      if(play) {
        monster.render();
        character.render();
        lifes.render();
      } else {
        splash.render();
      }
    }
  });

  loop.start();

  on('killed', () => {
    lifes.discountLife();
    if(!lifes.isLive()) {
      play = false;
    }
  });

  onKey('space', () => {
    play = true;
    monster = new Monster(canvas);
    character = new Character(canvas);
    lifes = new Lifes(canvas);
  });
}

app();
