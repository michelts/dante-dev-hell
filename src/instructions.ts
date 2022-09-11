type TimeoutId = ReturnType<typeof setTimeout>;

export default class InstructionsLib {
  private container: HTMLElement;
  private readonly timeoutInSeconds = 650;
  private readonly staleTimeInSeconds = 2000;
  private readonly timeoutIds: TimeoutId[] = [];
  private readonly hasBeenShownKey = "instrunctionsHaveBeenShown";

  private get hasBeenShown(): boolean {
    return Boolean(window.localStorage.getItem(this.hasBeenShownKey));
  }

  private set hasBeenShown(value: boolean) {
    window.localStorage.setItem(this.hasBeenShownKey, true);
  }

  constructor() {
    this.container = document.getElementById("instructions") as HTMLElement;
    this.container.style.transition = `opacity ${this.timeoutInSeconds}ms`;
  }

  toggle({ onDone }: { onDone: () => void }): void {
    if (this.hasBeenShown) {
      onDone();
    } else {
      this.toggleAnimation(onDone);
    }
  }

  reset(): void {
    this.timeoutIds.forEach((timeoutId: TimeoutId) => clearTimeout(timeoutId));
    this.removeInstructions();
    this.hasBeenShown = false;
  }

  private toggleAnimation(onDone: () => void) {
    this.addInstructions("left");

    this.timeoutIds.push(
      setTimeout(() => {
        this.addInstructions("right");
      }, this.timeoutInSeconds + this.staleTimeInSeconds)
    );

    this.timeoutIds.push(
      setTimeout(() => {
        this.hasBeenShown = true;
        onDone();
      }, this.timeoutInSeconds * 2 + this.staleTimeInSeconds * 2)
    );
  }

  private addInstructions(direction: string) {
    this.container.appendChild(this.getContent(direction));
    this.container.style.opacity = "1";

    this.timeoutIds.push(
      setTimeout(() => {
        this.container.style.opacity = "0";
      }, this.staleTimeInSeconds)
    );

    this.timeoutIds.push(
      setTimeout(() => {
        this.container.innerHTML = "";
      }, this.staleTimeInSeconds + this.timeoutInSeconds)
    );
  }

  private removeInstructions() {
    this.container.style.opacity = "0";
    this.container.innerHTML = "";
  }

  private getContent(direction: string) {
    const div = document.createElement("div");
    div.innerText = `Click/Tap anywhere ${direction} or use ${direction} arrow to move ${direction}`;
    div.style.gridArea = direction;
    return div;
  }
}
