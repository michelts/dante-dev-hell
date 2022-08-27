import { init, GameLoop, initKeys, on, onKey } from "kontra";
import Splash from "./splash";
import generateMonster, { BaseMonster } from "./monsters";
import Character from "./character";
import Lifes from "./lifes";

function initCanvas() {
  const { canvas } = init();
  initKeys();
  return canvas;
}

enum GameStatus {
  Play,
  Pause,
  Stop,
}

class App {
  gameStatus: GameStatus = GameStatus.Stop;
  splash: Splash;
  monster: BaseMonster;
  monsterGenerator: generateMonster;
  character: Character;
  lifes: Lifes;

  init() {
    this.splash = new Splash();
    const loop = GameLoop({
      update: this.update.bind(this),
      render: this.render.bind(this),
    });
    loop.start();
    this.attachEventListeners();
  }

  render() {
    if (this.gameStatus === GameStatus.Stop) {
      this.splash.render();
    } else {
      this.monster.render();
      this.character.render();
      this.lifes.render();
    }
  }

  update() {
    if (this.gameStatus === GameStatus.Play) {
      this.monster.fall();
      this.character.killOnCollide(this.monster);
      this.character.update();
      this.lifes.update();
    }
  }

  attachEventListeners() {
    onKey("space", this.playPauseGame.bind(this));
    onKey("esc", this.stopGame.bind(this));
    on("killed", this.handleHeroKilled.bind(this));
    on("monsterDead", this.respawnMonster.bind(this));
  }

  playPauseGame() {
    if (this.gameStatus === GameStatus.Stop) {
      this.initializeObjects();
    }
    if (this.gameStatus === GameStatus.Play) {
      this.gameStatus = GameStatus.Pause;
    } else {
      this.gameStatus = GameStatus.Play;
    }
  }

  stopGame() {
    this.gameStatus = GameStatus.Stop;
  }

  initializeObjects() {
    this.monsterGenerator = generateMonster();
    this.monster = this.monsterGenerator.next().value;
    this.character = new Character();
    this.lifes = new Lifes();
  }

  handleHeroKilled() {
    this.lifes.discountLife();
    if (!this.lifes.isLive()) {
      this.stopGame();
    }
  }

  respawnMonster() {
    this.monster = this.monsterGenerator.next().value;
  }
}

declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement;
  }
}

window.gameCanvas = initCanvas();
const app = new App();
app.init();
