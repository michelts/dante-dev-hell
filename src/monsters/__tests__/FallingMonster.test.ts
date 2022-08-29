import FallingMonster from "../FallingMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 };
});

it("should increase y position", () => {
  const speed = 2;
  const monster = new FallingMonster({ speed });
  const initial = monster.sprite.y;
  monster.fall();
  expect(monster.sprite.y).toEqual(initial + 2 * speed);
  monster.fall();
  expect(monster.sprite.y).toEqual(initial + 4 * speed);
});
