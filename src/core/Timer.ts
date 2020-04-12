import { Behavior } from "./Behavior";
import { signal } from "./signal";
import { inspect } from "./inspect";

export interface ITimer {
  duration: number;
}

export class Timer extends Behavior<ITimer> implements ITimer {
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
