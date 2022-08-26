import { init, Sprite, GameLoop, initKeys, keyPressed, load, SpriteSheet, Animation, on, onKey } from 'kontra';
import Splash from './splash';
import Monster from './monster';
import Monster2 from './monster2';
import Character from './character'
import Lifes from './lifes'

const MONSTERS = [Monster, Monster2];

async function app() {
  let play = false;
  let currentMonster = 0

  const { canvas } = init();
  initKeys();

  const splash = new Splash(canvas);
  let monster
  let character
  let lifes

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
    monster = new MONSTERS[currentMonster % MONSTERS.length](canvas);
    character = new Character(canvas);
    lifes = new Lifes(canvas);
  });

  on('monsterDead', () => {
    currentMonster += 1
    monster = new MONSTERS[currentMonster % MONSTERS.length](canvas);
  });
}

app();
