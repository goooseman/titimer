import { EventEmitter } from "events";

export class ZeroTimerError extends Error {}

class Timer extends EventEmitter {
  public msLeft: number;
  private interval: NodeJS.Timer;

  constructor(ms: number) {
    super();
    if (ms <= 0) {
      throw new ZeroTimerError();
    }
    this.msLeft = ms;
    this.interval = setInterval(this.updateCounter, 1000);
  }

  public start() {
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
