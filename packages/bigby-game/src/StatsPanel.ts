import { Behavior, $up } from "@bigby/core";
import Stats from "stats.js";
import Ticker from "./Ticker";

/**
 * Provides a runtime statistics panel powered by mrdoob's excellent Stats.js.
 * You will typically want to put this into your root entity alongside your
 * Renderer and Ticker behaviors.
 */
export default class StatsPanel extends Behavior {
  private stats = new Stats();

  awake() {
    document.body.appendChild(this.stats.dom);
    this.stats.showPanel(1);

    /* Look for a nearby Ticker instance and hook into it. */
    const ticker = $up(this, Ticker);
    if (ticker) {
      ticker.beforeTick(() => this.stats.begin());
      ticker.afterTick(() => this.stats.end());
    } else {
      console.warn("StatsPanel requires a Ticker instance to function.");
    }
  }

  destroy() {
    document.body.removeChild(this.stats.dom);
  }
}
