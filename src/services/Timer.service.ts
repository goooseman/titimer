import { EventEmitter } from "events";

class Timer extends EventEmitter {
  public msLeft: number;
  private interval: NodeJS.Timer;

  constructor(ms: number) {
    super();
    this.msLeft = ms;
    this.interval = setInterval(this.updateCounter, 1000);
    this.updateCounter();
  }

  private updateCounter = () => {
    if (this.msLeft <= 0) {
      this.finishCounter();
      return;
    }
    this.emit("change", this.msLeft);
    this.msLeft -= 1000;
  };

  private finishCounter = () => {
    this.emit("finish");
    clearInterval(this.interval);
  };
}

export default Timer;
