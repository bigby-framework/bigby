import { Behavior, Signal } from "@bigby/core";

export default class Timer extends Behavior {
  /**
   * The duration after which onTimeout is emitted.
   *
   * @memberof Timer
   */
  duration = 1;

  /**
   * This signal is emitted once the timeout is reached.
   *
   * @memberof Timer
   */
  onTimeout = Signal();

  private remaining = 0;

  awake() {
    this.reset();
  }

  update(dt: number) {
    if (this.remaining > 0) {
      this.remaining -= dt;

      if (this.remaining <= 0) {
        this.remaining = 0;
        this.onTimeout.emit(undefined);
      }
    }
  }

  reset() {
    this.remaining = this.duration;
  }
}
