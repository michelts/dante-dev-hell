import { Language } from "../../types";
import generateLevelParams from "../generateLevelParams";

it("should 3 levels from each language tier", () => {
  const generator = generateLevelParams(fakeShuffle);

  // tier 1 languages
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Python,
      frequency: 1,
      speed: 2,
      monsterCount: 6,
      monsterLevelDistribution: [100, 0],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Javascript,
      frequency: 0.75,
      speed: 2,
      monsterCount: 6,
      monsterLevelDistribution: [80, 20],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Ruby,
      frequency: 0.5,
      speed: 2,
      monsterCount: 6,
      monsterLevelDistribution: [60, 40],
    },
  });

  // tier 2 languages
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Java,
      frequency: 1,
      speed: 2.5,
      monsterCount: 8,
      monsterLevelDistribution: [80, 20],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Go,
      frequency: 0.75,
      speed: 2.5,
      monsterCount: 8,
      monsterLevelDistribution: [60, 40],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Typescript,
      frequency: 0.5,
      speed: 2.5,
      monsterCount: 8,
      monsterLevelDistribution: [40, 60],
    },
  });

  // tier 3 languages
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.C,
      frequency: 1,
      speed: 3,
      monsterCount: 10,
      monsterLevelDistribution: [60, 40],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.Malbolge,
      frequency: 0.75,
      speed: 3,
      monsterCount: 10,
      monsterLevelDistribution: [40, 60],
    },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: {
      language: Language.HolyC,
      frequency: 0.5,
      speed: 3,
      monsterCount: 10,
      monsterLevelDistribution: [20, 80],
    },
  });

  // done!
  expect(generator.next()).toEqual({
    done: true,
    value: undefined,
  });
});

function fakeShuffle(inputArray: unknown[]) {
  return inputArray;
}
