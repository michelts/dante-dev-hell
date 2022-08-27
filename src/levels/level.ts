export default class Level {
  protected speed: number;

  constructor({ speed }: { speed: number }) {
    this.speed = speed;
  }

  getSpeed(): number {
    return this.speed;
  }
}
