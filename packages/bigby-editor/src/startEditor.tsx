import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application";
import { with2DEditor } from "./util/withEditor";
import { Entity } from "@bigby/core";

export const startEditor = (root: Entity, el?: HTMLElement) => {
  /* If no HTML element was specified, create one and inject it into the page body */
  if (!el) {
    el = document.createElement("div");
    el.className = "app";
    document.body.appendChild(el);
  }

  /* Start the editor */
  ReactDOM.render(<Application root={with2DEditor(root)} />, el);
};
