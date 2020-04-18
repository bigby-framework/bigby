import { Behavior, signal } from "@bigby/core";
import { clamp } from "@bigby/math";

class Ticker extends Behavior {
  static displayName = "Ticker";
  static icon = "⌚️";
  static description = "Implements a game ticker.";

  onTick = signal<number>();

  callbackFn: (dt: number) => void;

  awake() {
    let lastTime = Date.now();

    const animate = () => {
      /* Calculate delta time */
      const newTime = Date.now();
      const deltaMs = clamp(newTime - lastTime, 0, 1000);
      const deltaTime = deltaMs / 1000;
      lastTime = newTime;

      /* Update our entity */
      if (this.callbackFn) this.callbackFn(deltaTime);
      else this.entity.update(deltaTime);

      /* Trigger next frame */
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

export default Ticker;
