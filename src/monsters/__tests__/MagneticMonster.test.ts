import MagneticMonster from "../magneticMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 };
});

it("should have its center moved right, toward the hero position, if at left", () => {
  const speed = 2;
  const monster = new MagneticMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: 290 } };
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x + Math.sqrt(speed));
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});

it("should have its center moved left, toward the hero position, if at right", () => {
  const speed = 2;
  const monster = new MagneticMonster({ speed });
  const { x, y } = monster.sprite;
  const hero = { sprite: { width: 30, x: 0 } };
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x - Math.sqrt(speed));
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});

it("should keep the x position if aligned with the hero position", () => {
  const speed = 2;
  const monster = new MagneticMonster({ speed });
  const { x, y, width } = monster.sprite;
  const center = x + width / 2;
  const hero = { sprite: { width: 30, x: center - 15 } };
  monster.fall(hero);
  expect(monster.sprite.x).toEqual(x);
  expect(monster.sprite.y).toEqual(y + 2 * speed);
});
