import { GameStatus } from "./types";

const infoRenderers = {
  [GameStatus.Stop]: renderNotStarted,
  [GameStatus.Complete]: renderComplete,
  [GameStatus.GameOver]: renderGameOver,
  [GameStatus.Play]: null,
  [GameStatus.Pause]: null,
};

export default class Screen {
  infoLayer: HTMLDivElement;
  currentGameStatus: GameStatus;

  constructor() {
    this.infoLayer = document.getElementById("info") as HTMLDivElement;
  }

  render(newGameStatus: GameStatus): void {
    if (this.currentGameStatus === newGameStatus) {
      return;
    }
    this.currentGameStatus = newGameStatus;
    this.toggleInfoVisibility();
    this.renderInfo();
  }

  private toggleInfoVisibility() {
    const isStandBy =
      this.currentGameStatus !== GameStatus.Play &&
      this.currentGameStatus !== GameStatus.Pause;
    this.infoLayer.style.visibility = isStandBy ? "visible" : "hidden";
  }

  private renderInfo() {
    const renderFunc = infoRenderers[this.currentGameStatus];
    if (renderFunc !== null) {
      this.infoLayer.innerHTML = renderFunc();
    }
  }
}

function renderNotStarted() {
  return `
    ${title}
    <p>You are Dante, a developer who died and went to <b>the Developer's Hell</b>.</p>
    <p>Yeah, how could you imagine those <u>silly jokes</u> about javascript would bring you there?</p>
    <p>With the help of your mentor Virgilius Torvalds, <i>seek your redemption</i> by sailing the Acheron river through the deeps of the Programming Hell!</p>
    <p><u>Tap or press any key to start</u></p>
  `;
}

function renderGameOver() {
  return `
    ${title}
    <p>No good! Your soul was consumed by the hatred against languages you don't even know.</p>
    <p>You shall live in Hell refactoring the code you wrote 10 years ago... <b>FOREVER</b>!
    <p><u>Tap or press any key to try again</u></p>
  `;
}

function renderComplete() {
  return `
    ${title}
    <p>Congratulations! You crossed the <b>deeps of the Programming Hell</b> with resilience and perseverance.</p>
    <p>You got <i>your redemption</i> and may now live your life with kindness and respect to all the languages.</p>
    <p><u>Tap or press any key to play again</u></p>
  `;
}

const title = "<h1>Dante's Dev Hell</h1>";
