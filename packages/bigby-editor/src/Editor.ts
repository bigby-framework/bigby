import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./app";
import { Behavior } from "@bigby/core";

export default class Editor extends Behavior<{ element: HTMLElement }> {
  static displayName = "Editor";
  static icon = "🛠";
  static description = "Controls the editor UI.";

  element: HTMLElement;

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
  }
}
