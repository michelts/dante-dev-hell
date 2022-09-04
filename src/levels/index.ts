import { emit, on, off } from "kontra";
import Hero from "../hero";
import generateLevels from "./generateLevels";
import Level from "./level";

export default class Levels {
  private readonly levelGenerator: Iterator<Level, void, void>;
  private level: Level;

  constructor() {
    this.bindedFinishLevel = this.finishLevel.bind(this);
    this.levelGenerator = generateLevels();
    this.addEventListeners();
    this.advanceLevel();
  }

  render(): void {
    this.level.render();
  }

  update(hero: Hero): void {
    this.level.update(hero);
  }

  destroy(): void {
    this.level.destroy();
    this.removeEventListeners();
  }

  private addEventListeners() {
    on("levelAccomplished", this.bindedFinishLevel);
  }

  private removeEventListeners() {
    off("levelAccomplished", this.bindedFinishLevel);
  }

  private finishLevel() {
    this.level.destroy();
    this.advanceLevel();
  }

  private advanceLevel() {
    const { value, done } = this.levelGenerator.next();
    if (done === false) {
      this.level = value;
    } else {
      emit("gameComplete");
    }
  }
}
