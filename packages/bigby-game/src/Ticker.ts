import { Behavior, Signal } from "@bigby/core";
import * as PIXI from "pixi.js";

export default class Ticker extends Behavior {
  private tickerFn?: (dt: number) => void;

  beforeTick = Signal<number>();
  afterTick = Signal<number>();

  get ticker() {
    return PIXI.Ticker.shared;
  }

  awake() {
    this.tickerFn = () => {
      const dt = this.ticker.deltaMS / 1000;
      this.beforeTick.emit(dt);
      this.entity.update(dt);
      this.afterTick.emit(dt);
    };

    this.ticker.add(this.tickerFn);
  }

  destroy() {
    if (this.tickerFn) {
      this.ticker.remove(this.tickerFn);
    }
  }
}
