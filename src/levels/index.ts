import { emit, on, off } from "kontra";
import { LevelParams } from "../types";
import Hero from "../hero";
import generateLevelParams from "./generateLevelParams";
import Level from "./level";

export default class Levels {
  private readonly bindedFinishLevel;
  private readonly levelParamsGenerator: Iterator<LevelParams, void, void>;
  private level: Level;

  constructor() {
    this.bindedFinishLevel = this.finishLevel.bind(this);
    this.levelParamsGenerator = generateLevelParams();
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
    const { value: params, done } = this.levelParamsGenerator.next();
    if (done === false) {
      this.level = new Level(params);
    } else {
      emit("gameComplete");
    }
  }
}
