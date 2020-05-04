import { Behavior } from "@bigby/core";
import * as PIXI from "pixi.js";

export default class Ticker extends Behavior {
  private tickerFn?: (dt: number) => void;

  get ticker() {
    return PIXI.Ticker.shared;
  }

  awake() {
    this.tickerFn = () => {
      /* Update all entities starting from our owning entity */
      this.entity.update(this.ticker.deltaMS / 1000);
    };

    this.ticker.add(this.tickerFn);
  }

  destroy() {
    if (this.tickerFn) {
      this.ticker.remove(this.tickerFn);
    }
  }
}
