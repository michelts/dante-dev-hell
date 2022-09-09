import generateMonster from "../index";

beforeEach(() => {
  window.gameCanvas = { width: 320, height: 480 } as HTMLCanvasElement;
});

const MonsterA = jest.fn();
const MonsterB = jest.fn();
const MonsterC = jest.fn();
const MonsterD = jest.fn();

it("should generate easy monsters up to the limit if monster distribution includes only them", () => {
  const getRandomNumber = jest
    .fn()
    .mockReturnValueOnce(0)
    .mockReturnValue(0.99);
  const count = 2;
  const generator = generateMonster({
    count,
    levelDistribution: [100, 0],
    monstersByLevel: [[MonsterA], [MonsterB]],
    getRandomNumber,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterA,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterA,
  });
  expect(generator.next()).toEqual({
    done: true,
    value: undefined,
  });
});

it("should generate easy and hard monsters up to the limit if monster distribution includes both", () => {
  const getRandomNumber = jest
    .fn()
    .mockReturnValueOnce(0.5)
    .mockReturnValue(0.51);
  const count = 2;
  const generator = generateMonster({
    count,
    levelDistribution: [50, 50],
    monstersByLevel: [[MonsterA], [MonsterB]],
    getRandomNumber,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterA,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterB,
  });
  expect(generator.next()).toEqual({
    done: true,
    value: undefined,
  });
});

it("should distribute changes equaly between monsters of the same level", () => {
  const getRandomNumber = jest
    .fn()
    .mockReturnValueOnce(0.2)
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.7)
    .mockReturnValue(0.99);
  const count = 4;
  const generator = generateMonster({
    count,
    levelDistribution: [40, 60],
    monstersByLevel: [
      [MonsterA, MonsterB],
      [MonsterC, MonsterD],
    ],
    getRandomNumber,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterA,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterB,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterC,
  });
  expect(generator.next()).toEqual({
    done: false,
    value: MonsterD,
  });
  expect(generator.next()).toEqual({
    done: true,
    value: undefined,
  });
});
