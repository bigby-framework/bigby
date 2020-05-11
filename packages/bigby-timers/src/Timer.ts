import { Behavior, Signal } from "@bigby/core";

/**
 * A utility behavior that implements a timer. After waking up, the timer will
 * count down the number of seconds defined in its `duration` property, and then
 * emit its `onTimeout` signal.
 *
 * @export
 * @class Timer
 * @extends {Behavior}
 */
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

  protected remaining = 0;

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
