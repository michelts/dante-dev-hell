import {
  Sprite,
  keyPressed,
  emit,
  track,
  pointerOver,
  pointerPressed,
} from "kontra";

export default class MovementDetector {
  leftArea: Sprite;
  rightArea: Sprite;

  constructor() {
    const width = window.gameCanvas.width / 2;
    const height = window.gameCanvas.height;
    this.leftArea = Sprite({ x: 0, y: 0, width, height });
    this.rightArea = Sprite({ x: width, y: 0, width, height });
    track(this.leftArea, this.rightArea);
  }

  render(): void {
    this.leftArea.render();
    this.rightArea.render();
  }

  update(): void {
    if (pointerPressed("left")) {
      if (pointerOver(this.leftArea)) {
        emit("heroMoved", -1);
      } else if (pointerOver(this.rightArea)) {
        emit("heroMoved", 1);
      }
    }

    if (keyPressed("arrowleft")) {
      emit("heroMoved", -1);
    }
    if (keyPressed("arrowright")) {
      emit("heroMoved", 1);
    }
  }
}
