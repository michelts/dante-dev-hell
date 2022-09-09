export enum GameStatus {
  Play,
  Pause,
  Stop,
  Complete,
  GameOver,
}

export enum Language {
  Python,
  Ruby,
  Javascript,
  C,
  Malbolge,
  HolyC,
  Assembly,
}

export interface LevelParams {
  language: Language;
  speed: number;
  frequency: number;
}
