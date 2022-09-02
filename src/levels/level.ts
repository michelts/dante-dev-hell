import { Language } from "../types";

export default class Level {
  protected speed: number;
  protected language: Language;

  constructor({ speed, language }: { speed: number; language: Language }) {
    this.speed = speed;
    this.language = language;
  }

  getSpeed(): number {
    return this.speed;
  }

  getLanguage(): Language {
    return this.language;
  }
}
