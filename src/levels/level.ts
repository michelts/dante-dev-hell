import { on, off, emit } from "kontra";
import * as types from "../types";
import Background from "../background";
import generateMonster from "../monsters";

export default class Level {
  private readonly bindedSpawnMonster;
  private readonly bindedDestroyMonster;
  private readonly speed: number;
  private readonly language: types.Language;
  private readonly frequency: number;
  private readonly monsterCount: number;
  private readonly monsterLevelDistribution: [number, number];
  private monsterTypeGenerator: Iterator<types.MonsterConstructor, void, void>;
  private monsters: types.Monster[];
  private readonly background: Background;
  private isAccomplished: boolean;

  constructor({
    language,
    speed,
    frequency,
    monsterCount,
    monsterLevelDistribution,
  }: types.LevelParams) {
    this.bindedSpawnMonster = this.spawnMonster.bind(this);
    this.bindedDestroyMonster = this.destroyMonster.bind(this);

    this.language = language;
    this.speed = speed;
    this.frequency = frequency;
    this.monsterCount = monsterCount;
    this.monsterLevelDistribution = monsterLevelDistribution;
    this.isAccomplished = false;
    this.background = new Background(this.language);
    window.flashLib.write({
      text: `${types.Language[this.language]} Hell`,
      timeInSeconds: 2,
      onDone: () => this.initializeMonsterGenerator(),
    });
    this.monsters = [];
    this.attachEventListeners();
  }

  render(): void {
    this.background.render();
    this.monsters.forEach((monster: types.Monster) => monster.render());
  }

  update(hero: types.Hero): void {
    this.background.update();
    this.monsters.forEach((monster: types.Monster) => {
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
    this.monsterTypeGenerator = generateMonster<types.MonsterConstructor>({
      count: this.monsterCount,
      levelDistribution: this.monsterLevelDistribution,
    });
    this.monsters = [];
    this.spawnMonster();
  }

  private spawnMonster(): void {
    const { value: MonsterType, done } = this.monsterTypeGenerator.next();
    if (done === false) {
      this.monsters.unshift(
        new MonsterType({
          speed: this.speed,
          frequency: this.frequency,
        })
      );
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
