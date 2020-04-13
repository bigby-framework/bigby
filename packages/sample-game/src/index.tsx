import { Application, with2DEditor } from "@bigby/editor";
import * as React from "react";
import * as ReactDOM from "react-dom";
import game from "./game";
import ship from "./ship";

/* Get app element */
const el = document.getElementById("app");

/* Set up game */
const root = game("Bigby Sample Game", el);
root.addChild(ship());

/* Let's get this thing on the road */
ReactDOM.render(<Application root={with2DEditor(root)} />, el);
