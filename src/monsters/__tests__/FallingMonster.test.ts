import Hero from "../../hero";
import FallingMonster from "../fallingMonster";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 } as HTMLCanvasElement;
});

it("should increase y position", () => {
  const speed = 2;
  const frequency = 1;
  const hero = new Hero();
  const monster = new FallingMonster({ speed, frequency });
  const initial = monster.sprite.y;
  monster.fall(hero);
  expect(monster.sprite.y).toEqual(initial + 2 * speed);
  monster.fall(hero);
  expect(monster.sprite.y).toEqual(initial + 4 * speed);
});
