import { Behavior } from "@bigby/core";
import Renderer from "./Renderer";

export default class Ticker extends Behavior {
  private renderer?: Renderer;

  awake() {
    this.renderer = this.getNearestBehavior(Renderer);

    if (!this.renderer)
      throw "Ticker needs a Renderer behavior to function and could not find one.";

    /* Set up ticking */
    const ticker = this.renderer.app!.ticker;
    ticker.add(() => {
      /* Determine deltatime */
      const dt = ticker.deltaMS / 1000;

      /* Update all entities starting from our owning entity */
      this.entity.update(dt);
    });
  }

  destroy() {
    this.renderer?.app?.ticker.destroy();
  }
}
