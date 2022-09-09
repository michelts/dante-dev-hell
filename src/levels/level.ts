import { on, off, emit } from "kontra";
import { Language, LevelParams } from "../types";
import Background from "../background";
import Hero from "../hero";
import generateMonster, { BaseMonster } from "../monsters";

export default class Level {
  private readonly bindedSpawnMonster;
  private readonly bindedDestroyMonster;
  private readonly speed: number;
  private readonly language: Language;
  private readonly frequency: number;
  private monsterGenerator: Iterator<BaseMonster, void, void>;
  private monsters: BaseMonster[];
  private readonly background: Background;
  private isAccomplished: boolean;

  constructor({ speed, language, frequency }: LevelParams) {
    this.bindedSpawnMonster = this.spawnMonster.bind(this);
    this.bindedDestroyMonster = this.destroyMonster.bind(this);

    this.speed = speed;
    this.language = language;
    this.frequency = frequency;
    this.isAccomplished = false;
    this.background = new Background(this.language);
    this.initializeMonsterGenerator();
    this.attachEventListeners();
  }

  render(): void {
    this.background.render();
    this.monsters.forEach((monster: BaseMonster) => monster.render());
  }

  update(hero: Hero): void {
    this.background.update();
    this.monsters.forEach((monster: BaseMonster) => {
      monster.fall(hero);
      hero.killOnCollide(monster);
    });
  }

  destroy(): void {
    this.removeEventListeners();
  }

  private attachEventListeners() {
    on("callNextMonster", this.bindedSpawnMonster);
    on("destroyMonster", this.bindedDestroyMonster);
  }

  private removeEventListeners() {
    off("callNextMonster", this.bindedSpawnMonster);
    off("destroyMonster", this.bindedDestroyMonster);
  }

  private initializeMonsterGenerator() {
    this.monsterGenerator = generateMonster({
      speed: this.speed,
      frequency: this.frequency,
    });
    this.monsters = [];
    this.spawnMonster();
  }

  private spawnMonster(): void {
    const { value, done } = this.monsterGenerator.next();
    if (done === false) {
      this.monsters.unshift(value);
    } else {
      this.isAccomplished = true;
    }
  }

  private destroyMonster() {
    this.monsters.pop();
    if (this.isAccomplished) {
      emit("levelAccomplished");
    }
  }
}
