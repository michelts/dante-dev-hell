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

class App {
  play: boolean | null = null;
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
    if (this.play === true) {
      this.monster.render();
      this.character.render();
      this.lifes.render();
    } else {
      this.splash.render();
    }
  }

  update() {
    if (this.play === true) {
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
    if (this.play === null) {
      this.initializeObjects();
      this.play = true;
    } else {
      this.play = !this.play;
    }
  }

  stopGame() {
    this.play = null;
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
      this.play = false;
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
