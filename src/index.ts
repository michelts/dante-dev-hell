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
  const monsterGenerator = generateMonster();
  const splash = new Splash();

  let play = false;
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
    monster = monsterGenerator.next().value
    character = new Character();
    lifes = new Lifes();
  });

  on('monsterDead', () => {
    monster = monsterGenerator.next().value
  });

  onKey('esc', () => {
    play = false;
  });
}

declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement
  }
}

app();
