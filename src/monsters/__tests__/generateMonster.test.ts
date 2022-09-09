import BaseMonster from "../base";
import FallingMonster from "../fallingMonster";
import SlidingMonster from "../slidingMonster";
import MagneticMonster from "../magneticMonster";
import TeleportingMonster from "../teleportingMonster";
import generateMonster from "../index";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 } as HTMLCanvasElement;
});

it("should generate weighted random monster instances up to the given limit", () => {
  const speed = 1;
  const frequency = 1;
  const generator = generateMonster({ speed, frequency });
  assertGeneratedValueIs(generator.next(), {
    done: false,
    value: FallingMonster,
  });
  assertGeneratedValueIs(generator.next(), {
    done: false,
    value: SlidingMonster,
  });
  assertGeneratedValueIs(generator.next(), {
    done: false,
    value: MagneticMonster,
  });
  assertGeneratedValueIs(generator.next(), {
    done: false,
    value: TeleportingMonster,
  });
});

function assertGeneratedValueIs(
  foundValue: IteratorResult<BaseMonster, void>,
  expectedValue: {
    done: boolean;
    value:
      | typeof FallingMonster
      | typeof SlidingMonster
      | typeof MagneticMonster
      | typeof TeleportingMonster;
  }
) {
  expect(foundValue.done).toEqual(expectedValue.done);
  expect(foundValue.value).toBeInstanceOf(expectedValue.value);
}
