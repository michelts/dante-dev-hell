export default class FlashLib {
  container: HTMLElement;

  constructor() {
    this.container = document.getElementById("flash") as HTMLElement;
  }

  write({
    text,
    timeInSeconds,
    onDone,
  }: {
    text: string;
    timeInSeconds: number;
    onDone: () => void;
  }): void {
    this.container.style.transition = `opacity ${timeInSeconds}s`;
    this.container.innerText = text;
    this.container.style.opacity = "1";

    setTimeout(() => {
      this.container.style.opacity = "0";
    }, (timeInSeconds / 2) * 1000);

    setTimeout(() => {
      onDone();
    }, timeInSeconds * 1000);
  }
}
