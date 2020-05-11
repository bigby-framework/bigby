import Timer from "./Timer";

export default class Cooldown extends Timer {
  awake() {
    super.awake();
  }

  /**
   * Returns `true` if cooldown is ready.
   *
   * @returns
   * @memberof Cooldown
   */
  isReady() {
    return this.remaining <= 0;
  }

  /**
   * Checks if cooldown is ready; if it is, executes the given function, and
   * resets the cooldown.
   *
   * @param {() => void} fn
   * @memberof Cooldown
   */
  ifReady(fn: () => void) {
    if (this.isReady()) {
      this.reset();
      fn();
    }
  }
}
