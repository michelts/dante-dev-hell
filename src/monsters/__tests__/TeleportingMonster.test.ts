import TeleportingMonster from "../TeleportingMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 };
});

it("should teleport to the hero position after crossing the middle of the screen", () => {
  const leftPosition = 290;
  const speed = 2;
  const monster = new TeleportingMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: leftPosition } };
  let count = 1;
  while (monster.sprite.x === x) {
    monster.fall(hero);
    expect(monster.sprite.y).toEqual(y + 2 * speed * count);
    count++
  }
  expect(monster.sprite.x).toEqual(leftPosition);
  hero.sprite.x -= 10; // simulate moving out of sigth
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(leftPosition);
});

xit("should have its center moved left, toward the hero position, if at right", () => {
  const speed = 2;
  const monster = new MagneticMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: 0 } };
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x - Math.sqrt(speed));
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});

xit("should keep the x position if aligned with the hero position", () => {
  const speed = 2;
  const monster = new MagneticMonster({ speed });
  const { x, y, width } = monster.sprite;
  const center = x + width / 2;
  const hero = { sprite: { width: 30, x: center - 15 } };
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x);
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});
