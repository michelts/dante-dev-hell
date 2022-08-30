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
    count++;
  }
  expect(monster.sprite.x).toEqual(leftPosition);

  // moving out of sight won't cause a new teleport
  hero.sprite.x -= 10;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(leftPosition);
});

it("should not cross the right border of the screen if the hero is thinner", () => {
  const leftPosition = 310;
  const speed = 2;
  const monster = new TeleportingMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 10, x: leftPosition } };
  let count = 1;
  while (monster.sprite.x === x) {
    monster.fall(hero);
    expect(monster.sprite.y).toEqual(y + 2 * speed * count);
    count++;
  }
  const outOfBorderCompensation = leftPosition + monster.sprite.width - 320;
  expect(monster.sprite.x).toEqual(leftPosition - outOfBorderCompensation);

  // moving out of sight won't cause a new teleport
  hero.sprite.x -= 10;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(leftPosition - outOfBorderCompensation);
});

it("should not cross the left border of the screen if the hero is thinner", () => {
  const leftPosition = 0;
  const speed = 2;
  const monster = new TeleportingMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 10, x: leftPosition } };
  let count = 1;
  while (monster.sprite.x === x) {
    monster.fall(hero);
    expect(monster.sprite.y).toEqual(y + 2 * speed * count);
    count++;
  }
  expect(monster.sprite.x).toEqual(0);

  // moving out of sight won't cause a new teleport
  hero.sprite.x += 10;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(0);
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
