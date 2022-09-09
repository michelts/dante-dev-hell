import Hero from "../../hero";
import MagneticMonster from "../magneticMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 } as HTMLCanvasElement;
});

it("should have its center moved right, toward the hero position, if at left", () => {
  const speed = 2;
  const frequency = 1;
  const monster = new MagneticMonster({ speed, frequency });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: 290 } } as Hero;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x + Math.sqrt(speed));
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});

it("should have its center moved left, toward the hero position, if at right", () => {
  const speed = 2;
  const frequency = 1;
  const monster = new MagneticMonster({ speed, frequency });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: 0 } } as Hero;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x - Math.sqrt(speed));
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});

it("should keep the x position if aligned with the hero position", () => {
  const speed = 2;
  const frequency = 1;
  const monster = new MagneticMonster({ speed, frequency });
  const { x, y, width } = monster.sprite;
  const center = x + width / 2;
  const hero = { sprite: { width: 30, x: center - 15 } } as Hero;
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x);
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});
