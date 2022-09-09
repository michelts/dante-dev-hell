import { Language } from "../../types";
import { generateLevelsParams } from "../generateLevels";

it("should 3 levels from each language tier", () => {
  const fakeShuffle = (inputArray) => inputArray;
  const generator = generateLevelsParams(fakeShuffle);

  // tier 1 languages
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Python, frequency: 1, speed: 2 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Javascript, frequency: 0.75, speed: 2 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Ruby, frequency: 0.5, speed: 2 },
  });

  // tier 2 languages
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Java, frequency: 1, speed: 2.5 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Go, frequency: 0.75, speed: 2.5 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Typescript, frequency: 0.5, speed: 2.5 },
  });

  // tier 3 languages
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.C, frequency: 1, speed: 3 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.Malbolge, frequency: 0.75, speed: 3 },
  });
  expect(generator.next()).toEqual({
    done: false,
    value: { language: Language.HolyC, frequency: 0.5, speed: 3 },
  });

  // done!
  expect(generator.next()).toEqual({
    done: true,
    value: undefined,
  });
});
