import { GameLoop, on, onKey, onPointer } from "kontra";
import { GameStatus } from "./types";
import Screen from "./screen";
import { BaseMonster } from "./monsters";
import generateLevel, { Level } from "./levels";
import MovementDetector from "./movementDetector";
import Hero from "./hero";
import Lifes from "./lifes";

export default class App {
  private gameStatus: GameStatus = GameStatus.Stop;
  private screen: Screen;

  private levelGenerator: Iterator<Level, void, void>;

  private level: Level;
  private readonly movementDetector: MovementDetector;
  private hero: Hero;
  private readonly monsters: BaseMonster[] = [];
  private lifes: Lifes;

  init(): void {
    this.screen = new Screen();
    const loop = GameLoop({
      update: this.update.bind(this),
      render: this.render.bind(this),
    });
    loop.start();
    this.attachEventListeners();
  }

  private render() {
    this.screen.render(this.gameStatus);
    if (
      this.gameStatus === GameStatus.Play ||
      this.gameStatus === GameStatus.Pause
    ) {
      this.renderGameObjects();
    }
  }

  private renderGameObjects() {
    this.movementDetector.render();
    this.hero.render();
    this.level.renderMonsters();
    this.lifes.render();
  }

  private update() {
    if (this.gameStatus === GameStatus.Play) {
      this.updateGameObjects();
    }
  }

  private updateGameObjects() {
    this.movementDetector.update();
    this.hero.update();
    this.level.updateMonsters(this.hero);
    this.lifes.update();
  }

  private attachEventListeners() {
    onPointer("down", this.begin.bind(this));
    onKey("space", this.playPauseGame.bind(this));
    onKey("esc", this.stopGame.bind(this));
    on("heroMoved", this.handleHeroMoved.bind(this));
    on("killed", this.handleHeroKilled.bind(this));
    on("callNextMonster", this.spawnMonster.bind(this));
    on("destroyMonster", this.destroyMonster.bind(this));
  }

  private begin(evt, obj) {
    if (
      this.gameStatus !== GameStatus.Play &&
      this.gameStatus !== GameStatus.Pause
    ) {
      this.playPauseGame();
    }
  }

  private playPauseGame() {
    if (this.gameStatus === GameStatus.Play) {
      this.gameStatus = GameStatus.Pause;
    } else {
      if (this.gameStatus !== GameStatus.Pause) {
        this.initializeObjects();
      }
      this.gameStatus = GameStatus.Play;
    }
  }

  private initializeObjects() {
    this.levelGenerator = generateLevel();
    this.advanceLevel();
    this.movementDetector = new MovementDetector();
    this.hero = new Hero();
    this.lifes = new Lifes();
  }

  private handleHeroMoved(direction) {
    if (direction === 1) {
      this.hero.moveRight();
    } else {
      this.hero.moveLeft();
    }
  }

  private handleHeroKilled() {
    this.lifes.discountLife();
    if (!this.lifes.isLive()) {
      this.gameOver();
    }
  }

  private spawnMonster() {
    this.level.spawnMonster();
  }

  private destroyMonster() {
    this.level.destroyMonster();
    if (this.level.isAccomplished === true) {
      this.advanceLevel();
    }
  }

  private advanceLevel() {
    const { value, done } = this.levelGenerator.next();
    if (done === false) {
      this.level = value;
    } else {
      this.completeGame();
    }
  }

  private stopGame() {
    this.gameStatus = GameStatus.Stop;
  }

  private gameOver() {
    this.gameStatus = GameStatus.GameOver;
  }

  private completeGame() {
    this.gameStatus = GameStatus.Complete;
  }
}
