import { Behavior, signal } from "@bigby/core";
import * as PIXI from "pixi.js";
import Renderable2D from "./Renderable2D";

export default class Game2D extends Behavior {
  static icon = "🕹";
  static displayName = "Game2D";
  static description =
    "Powers a 2D game and should be added to your top-most entity.";

  /* We emit this signal when the game is mounted into a HTML DOM element. Other
  behaviors can use this to initialize behavior that involves listening to DOM
  events and similar. */
  onMounted = signal<HTMLElement>();

  /* The PIXI Application instance. */
  app: PIXI.Application;

  /* Properties */
  backgroundColor = 0x000000;

  awake() {
    /* Create a PIXI application */
    this.app = new PIXI.Application({
      backgroundColor: this.backgroundColor,
      autoStart: true,
      antialias: true,
    });

    /* Find our Renderable2D and add its container to our stage */
    const r2d = this.getBehavior(Renderable2D);
    this.app.stage.addChild(r2d.container);

    /* Mount ourselves to a #bigby element */
    const el = document.getElementById("bigby");
    if (el) this.mount(el);
  }

  mount(el: HTMLElement) {
    console.log("Mounting!");
    el.appendChild(this.app.view);
    this.app.resizeTo = el;

    this.onMounted.emit(el);
  }
}
