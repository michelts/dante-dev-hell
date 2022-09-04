import { GameLoop, on, onKey, onPointer } from "kontra";
import { GameStatus } from "./types";
import Screen from "./screen";
import Levels from "./levels";
import MovementDetector from "./movementDetector";
import Hero from "./hero";
import Lifes from "./lifes";

export default class App {
  private gameStatus: GameStatus = GameStatus.Stop;
  private screen: Screen;

  private readonly movementDetector: MovementDetector;
  private hero: Hero;
  private levels: Levels;
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
    this.levels.render();
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
    this.levels.update(this.hero);
    this.lifes.update();
  }

  private attachEventListeners() {
    onPointer("down", this.begin.bind(this));
    onKey("space", this.playPauseGame.bind(this));
    onKey("esc", this.stopGame.bind(this));
    on("gameOver", this.gameOver.bind(this));
    on("gameComplete", this.completeGame.bind(this));
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
        this.reinitializeObjects();
      }
      this.gameStatus = GameStatus.Play;
    }
  }

  private reinitializeObjects() {
    console.log('Reinitialize');
    if (this.levels) {
      this.levels.destroy();
    }
    if (this.hero) {
      this.hero.destroy();
    }
    if (this.lifes) {
      this.lifes.destroy();
    }

    this.movementDetector = new MovementDetector();
    this.levels = new Levels();
    this.hero = new Hero();
    this.lifes = new Lifes();
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
