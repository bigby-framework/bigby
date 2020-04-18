import { Behavior, signal } from "@bigby/core";
import { clamp } from "@bigby/math";

class Ticker extends Behavior {
  static displayName = "Ticker";
  static icon = "⌚️";
  static description =
    "Implements a game ticker. Will emit its onTick signal once per frame.";

  onTick = signal<number>();

  awake() {
    let lastTime = Date.now();

    const animate = () => {
      /* Calculate delta time */
      const newTime = Date.now();
      const deltaMs = clamp(newTime - lastTime, 0, 1000);
      const deltaTime = deltaMs / 1000;
      lastTime = newTime;

      /* Update our entity */
      this.entity.update(deltaTime);
      /* TODO: if we're editing, invoke editorUpdate instead */

      /* Trigger next frame */
      requestAnimationFrame(animate);
    };

    animate();
  }
}

export default Ticker;
