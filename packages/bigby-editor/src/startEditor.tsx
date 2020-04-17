import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./app";
import { with2DEditor } from "./with2DEditor";
import { Entity } from "@bigby/core";

export const startEditor = (root: Entity, el?: HTMLElement) => {
  /* If no HTML element was specified, create one and inject it into the page body */
  if (!el) {
    el = document.createElement("div");
    el.className = "app";
    document.body.appendChild(el);
  }

  const editorRoot = with2DEditor(root);

  /* Start the editor */
  ReactDOM.render(<Application root={editorRoot} />, el);
};
