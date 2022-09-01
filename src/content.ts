import { GameStatus } from "./types";

const renderers = {
  [GameStatus.Stop]: renderNotStarted,
  [GameStatus.Complete]: renderComplete,
  [GameStatus.GameOver]: renderGameOver,
};

export default class Content {
  constructor() {
    this.container = document.getElementById("info");
  }

  toggle(gameStatus: GameStatus): void {
    const renderFunc = renderers[gameStatus];
    if (renderFunc !== undefined) {
      this.container.innerHTML = renderFunc();
    }
  }
}

function renderNotStarted() {
  return `
    <h1>Dante's Dev Hell</h1>
    <p>You are Dante, a developer who died and went to <b>the Developer's Hell</b>.</p>
    <p>Yeah, how could you imagine those <u>silly jokes</u> about javascript would bring you there?</p>
    <p>With the help of your mentor Virgilio, <i>seek your redemption</i> sailing the Acheron river through the deeps of the programming hell!</p>
    <p><u>Tap or press any key to start</u></p>
  `;
}

function renderGameOver() {
  return `
    <h1>Dante's Dev Hell</h1>
    <p>No good! Your soul were consumed by the hatred against <i>PHP typing system</i>.</p>
    <p><u>Tap or press any key to try again</u></p>
  `;
}

function renderComplete() {
  return `
    <h1>Dante's Dev Hell</h1>
    <p>Congratulations! You crossed the <b>deeps of the Programming Hell</b> with resilience and perseverance.
    <p>You got <i>your redemption</i> and may now live your life with kindness and respect to all the languages, even PHP.</p>
    <p><u>Tap or press any key to play again</u></p>
  `;
}
