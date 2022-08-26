import { init, Sprite, GameLoop, initKeys, keyPressed, load, SpriteSheet, Animation, on, onKey } from 'kontra';
import Splash from './splash';
import generateMonster from './monsters';
import Character from './character'
import Lifes from './lifes'

window.gameCanvas = initCanvas()

function initCanvas() {
  const { canvas } = init();
  initKeys();
  return canvas;
}

async function app() {
  let play = false;
  let currentMonster = 0

  const splash = new Splash();
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
    const {value: MonsterType} = monsterGenerator.next();
    monster = new MonsterType()
    character = new Character();
    lifes = new Lifes();
  });

  on('monsterDead', () => {
    const {value: MonsterType} = monsterGenerator.next();
    monster = new MonsterType()
  });

  onKey('esc', () => {
    play = false;
  });
}

app();
