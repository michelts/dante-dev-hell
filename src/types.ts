export enum GameStatus {
  Play,
  Pause,
  Stop,
  Complete,
  GameOver,
}

export enum Language {
  Python,
  Javascript,
  Ruby,
  PHP,
  Pascal,
  Julia,

  Java,
  Go,
  Typescript,
  Dart,
  Kotlin,
  Swift,

  C,
  Malbolge,
  HolyC,
  Assembly,
  COBOL,
}

export interface LevelParams {
  language: Language;
  speed: number;
  frequency: number;
  monstersCount: number;
  monsterLevelWeights: [number, number];
}
