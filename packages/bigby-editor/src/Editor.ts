import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./app";
import { Behavior, inspect } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";

export default class Editor extends Behavior<{ element: HTMLElement }> {
  static displayName = "Editor";
  static icon = "🛠";
  static description = "Controls the editor UI.";

  /* The DIV element we're mounting our React app into. */
  element: HTMLElement;

  /* Edit Mode Toggle */
  private _isEditing = true;

  @inspect()
  get isEditing() {
    return this._isEditing;
  }

  set isEditing(v) {
    this._isEditing = v;
    v ? this.entity.enterEditMode() : this.entity.enterPlayMode();
  }

  awake() {
    /* If no HTML element was given, create one and inject it into the page body */
    if (!this.element) {
      this.element = document.createElement("div");
      document.body.appendChild(this.element);
    }

    /* Start the editor */
    ReactDOM.render(
      React.createElement(Application, { root: this.entity }, null),
      this.element
    );

    /* Give everyone a chance to run enterEditMode and enterPlayMode functions */
    this.isEditing ? this.entity.enterEditMode() : this.entity.enterPlayMode();
  }

  enterEditMode() {
    /* Find our ticker and override its callback function */
    const ticker = this.getBehavior(Ticker);
    ticker.callbackFn = (dt: number) => this.entity.editorUpdate(dt);
  }

  enterPlayMode() {
    /* Find our ticker and clear its callback function */
    const ticker = this.getBehavior(Ticker);
    ticker.callbackFn = null;
  }
}
