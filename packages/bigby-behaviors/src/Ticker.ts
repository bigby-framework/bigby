import { Behavior } from "@bigby/core";
import { clamp } from "@bigby/math";

class Ticker extends Behavior {
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

      /* Trigger next frame */
      requestAnimationFrame(animate);
    };

    animate();
  }
}

export default Ticker;
