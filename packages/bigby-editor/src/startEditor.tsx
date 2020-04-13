import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application";
import { with2DEditor } from "./util/withEditor";
import { Entity } from "@bigby/core";

export const startEditor = (el: HTMLElement, root: Entity) => {
  ReactDOM.render(<Application root={with2DEditor(root)} />, el);
};
