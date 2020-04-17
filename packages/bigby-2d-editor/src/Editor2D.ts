import React from "react";
import ReactDOM from "react-dom";
import * as editor from "@bigby/editor";
import { Behavior } from "@bigby/core";

export default class Editor2D extends Behavior<{ element: HTMLElement }> {
  static displayName = "Editor2D";
  static icon = "🛠";
  static description =
    "Controls the editor UI and configures it for editing a 2D game.";

  element: HTMLElement;

  awake() {
    /* If no HTML element was given, create one and inject it into the page body */
    if (!this.element) {
      this.element = document.createElement("div");
      document.body.appendChild(this.element);
    }

    /* Start the editor */
    ReactDOM.render(
      React.createElement(editor.app.Application, { root: this.entity }, null),
      this.element
    );
  }
}
