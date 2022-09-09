import Hero from "../../hero";
import TeleportingMonster from "../teleportingMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 } as HTMLCanvasElement;
});

it("should teleport to the hero position after crossing the middle of the screen", () => {
  const leftPosition = 290;
  const speed = 2;
  const frequency = 1;
  const monster = new TeleportingMonster({ speed, frequency });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: leftPosition } } as Hero;
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
  const frequency = 1;
  const monster = new TeleportingMonster({ speed, frequency });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 10, x: leftPosition } } as Hero;
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
  const frequency = 1;
  const monster = new TeleportingMonster({ speed, frequency });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 10, x: leftPosition } } as Hero;
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

it.skip("should keep the x position if aligned with the hero position", () => {
  const speed = 2;
  const frequency = 1;
  const monster = new TeleportingMonster({ speed, frequency });
  const { x, y, width } = monster.sprite;
  const center = x + width / 2;
  const hero = { sprite: { width: 30, x: center - 15 } } as Hero;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x);
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});
