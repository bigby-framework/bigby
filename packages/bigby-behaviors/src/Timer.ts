import { Behavior, inspect, signal } from "@bigby/core";

class Timer extends Behavior<{
  duration: number;
}> {
  static displayName = "Timer";
  static icon = "⏰";
  static description =
    "Counts down the time for the specified duration and emits a signal once it runs out.";

  /* Duration until timeout, in seconds. */
  @inspect() duration: number;
  @inspect() timeLeft: number;

  /* The onTimeout signal is sent when this timer times out. */
  onTimeout = signal();

  awake() {
    this.timeLeft = this.duration;
  }

  update(dt: number) {
    if (this.timeLeft > 0) {
      this.timeLeft -= dt;

      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.onTimeout.emit();
      }
    }
  }
}

export default Timer;
