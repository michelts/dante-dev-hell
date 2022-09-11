import { Sprite } from "kontra";

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
  monsterCount: number;
  monsterLevelDistribution: [number, number];
}

export interface Hero {
  killOnCollide: (monster: Monster) => void;
  render: () => void;
  update: () => void;
  destroy: () => void;
}

export type MonsterConstructor = new ({
  speed,
  frequency,
}: {
  speed: number;
  frequency: number;
}) => Monster;

export interface Monster {
  render: () => void;
  fall: (hero: Hero) => void;
  sprite: Sprite;
}

export enum EyeRotation {
  Direct = 1,
  Inverse = -1,
}
