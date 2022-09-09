import { Language, LevelParams } from "../types";

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

export default function* generateLevelsParams(
  shuffleFunction = shuffle
): Iterator<LevelParams, void, void> {
  const baseSpeed = 2;
  const speedIncrement = 0.5;

  const baseFrequency = 1;
  const frequencyDecrement = 0.25;

  const baseMonstersCount = 6;
  const monsterCountIncrement = 2;

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
        language: languages[levelIndex] as Language,
        speed: baseSpeed + speedIncrement * tierIndex,
        frequency: baseFrequency - frequencyDecrement * levelIndex,
        monsterCount: baseMonstersCount + monsterCountIncrement * tierIndex,
        monsterLevelDistribution: [monsterEasyPct, 100 - monsterEasyPct],
      };
    }
  }
}

function range(count: number): number[] {
  return Array(count)
    .fill(null)
    .map((_, index) => index);
}

function shuffle(inputArray: unknown[]) {
  return [...inputArray].sort(() => (Math.random() > 0.5 ? 1 : -1));
}
