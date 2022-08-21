import { init, Sprite, GameLoop, initKeys, keyPressed, load} from 'kontra/kontra.mjs';
import Monster from './monster';
import Character from './character'

async function app() {
  const { canvas } = init();
  initKeys();

  const monster = new Monster(canvas);
  const character = new Character(canvas);

  const loop = GameLoop({
    update: () => {
      monster.fall()
      character.allowMove()
      if (character.hasCollided(monster)) {
        character.flash()
      }
    },
    render: function() {
      monster.render();
      character.render();
    }
  });

  loop.start();
}

app();
