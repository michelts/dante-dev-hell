import { init, Sprite, GameLoop, initKeys, keyPressed, load, SpriteSheet, Animation } from 'kontra';
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
      character.toggleCollisionAnimation(monster);
      character.update()
    },
    render: function() {
      monster.render();
      character.render();
    }
  });

  loop.start();
}

app();
