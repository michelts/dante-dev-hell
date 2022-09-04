import { Language } from "../types";
import generateMonster, { BaseMonster } from "../monsters";

export default class Level {
  private readonly speed: number;
  private readonly language: Language;
  private readonly frequency: number;
  private readonly monsterGenerator: Iterator<BaseMonster, void, void>;
  private readonly monsters: BaseMonster[];

  constructor({
    speed,
    language,
    frequency,
  }: {
    speed: number;
    language: Language;
    frequency: number;
  }) {
    this.speed = speed;
    this.language = language;
    this.frequency = frequency;
    this.monsterGenerator = generateMonster({
      speed: this.speed,
      frequency: this.frequency,
    });
    this.monsters = [];
    this.spawnMonster();
    this.isAccomplished = false;
  }

  renderMonsters(): void {
    this.monsters.forEach((monster: BaseMonster) => monster.render());
  }

  updateMonsters(hero: Hero): void {
    this.monsters.forEach((monster: BaseMonster) => {
      monster.fall(hero);
      hero.killOnCollide(monster);
    });
  }

  spawnMonster(): void {
    const { value, done } = this.monsterGenerator.next();
    if (done === false) {
      this.monsters.unshift(value);
    } else {
      this.isAccomplished = true;
    }
  }

  destroyMonster(): void {
    this.monsters.pop();
  }
}
