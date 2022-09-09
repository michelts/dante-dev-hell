import { Language } from "../types";
import Level from "./level";

const languagesByTier = [
  [
    Language.Python,
    Language.Javascript,
    Language.Ruby,
    Language.PHP,
    Language.Pascal,
    Language.Julia,
  ],
  [
    Language.Java,
    Language.Go,
    Language.Typescript,
    Language.Dart,
    Language.Kotlin,
    Language.Swift,
  ],
  [
    Language.C,
    Language.Malbolge,
    Language.HolyC,
    Language.Assembly,
    Language.COBOL,
  ],
];

export default function* generateLevels(): Iterator<Level, void, void> {
  for (const params of generateLevelsParams()) {
    yield new Level(params);
  }
}

export function* generateLevelsParams(
  shuffleFunction = shuffle
): Iterator<LevelParams, void, void> {
  const baseSpeed = 2;
  const speedIncrement = 0.5;

  const baseFrequency = 1;
  const frequencyDecrement = 0.25;

  const baseMonstersCount = 6;
  const monstersCountIncrement = 2;

  const baseMonsterEasyPct = 100;
  const monsterLevelWeightDecrement = 20;

  for (const tierIndex of range(3)) {
    const languages = shuffleFunction(languagesByTier[tierIndex]);
    for (const levelIndex of range(3)) {
      const monsterEasyPct =
        baseMonsterEasyPct -
        monsterLevelWeightDecrement * levelIndex -
        monsterLevelWeightDecrement * tierIndex;
      yield {
        language: languages[levelIndex],
        speed: baseSpeed + speedIncrement * tierIndex,
        frequency: baseFrequency - frequencyDecrement * levelIndex,
        monstersCount: baseMonstersCount + monstersCountIncrement * tierIndex,
        monsterLevelWeights: [monsterEasyPct, 100 - monsterEasyPct],
      };
    }
  }
}

function range(count) {
  return Array(count)
    .fill(null)
    .map((_, index) => index);
}

function shuffle(inputArray) {
  return [...inputArray].sort(() => (Math.random() > 0.5 ? 1 : -1));
}
