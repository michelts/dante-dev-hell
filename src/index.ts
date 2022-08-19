import { init, Sprite, GameLoop } from 'kontra';


let { canvas } = init();

let monster = Sprite({
  x: 100,
  y: -80,
  color: 'red',
  width: 20,
  height: 40,
  dy: 2
});

let boat = Sprite({
  x: (320 - 30) / 2,
  y: 640 - 40 - 20,
  color: 'blue',
  width: 30,
  height: 40,
});

let loop = GameLoop({
  update: () => {
    monster.update();
    if (monster.y > canvas.height) {
      monster.y = -monster.height;
    }
  },
  render: function() {
    monster.render();
    boat.render();
  }
});

loop.start();
