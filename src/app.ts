import { GameLoop, on, onKey } from "kontra";
import Splash from "./splash";
import generateMonster, { BaseMonster } from "./monsters";
import Hero from "./hero";
import Lifes from "./lifes";

enum GameStatus {
  Play,
  Pause,
  Stop,
}

export default class App {
  gameStatus: GameStatus = GameStatus.Stop;
  splash: Splash;
  monster: BaseMonster;
  monsterGenerator: generateMonster;
  hero: Hero;
  lifes: Lifes;

  init(): void {
    this.splash = new Splash();
    const loop = GameLoop({
      update: this.update.bind(this),
      render: this.render.bind(this),
    });
    loop.start();
    this.attachEventListeners();
  }

  render(): void {
    if (this.gameStatus === GameStatus.Stop) {
      this.splash.render();
    } else {
      this.monster.render();
      this.hero.render();
      this.lifes.render();
    }
  }

  update(): void {
    if (this.gameStatus === GameStatus.Play) {
      this.monster.fall();
      this.hero.killOnCollide(this.monster);
      this.hero.update();
      this.lifes.update();
    }
  }

  attachEventListeners(): void {
    onKey("space", this.playPauseGame.bind(this));
    onKey("esc", this.stopGame.bind(this));
    on("killed", this.handleHeroKilled.bind(this));
    on("monsterLeft", this.respawnMonster.bind(this));
  }

  playPauseGame(): void {
    if (this.gameStatus === GameStatus.Stop) {
      this.initializeObjects();
    }
    if (this.gameStatus === GameStatus.Play) {
      this.gameStatus = GameStatus.Pause;
    } else {
      this.gameStatus = GameStatus.Play;
    }
  }

  stopGame(): void {
    this.gameStatus = GameStatus.Stop;
  }

  initializeObjects(): void {
    this.monsterGenerator = generateMonster();
    this.respawnMonster();
    this.hero = new Hero();
    this.lifes = new Lifes();
  }

  handleHeroKilled(): void {
    this.lifes.discountLife();
    if (!this.lifes.isLive()) {
      this.stopGame();
    }
  }

  respawnMonster(): void {
    this.monster = this.monsterGenerator.next().value;
  }
}
