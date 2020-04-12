import * as React from "react";
import * as ReactDOM from "react-dom";

import { Entity } from "@bigby/core";
import { Game2D, Renderable2D } from "@bigby/2d";

import { Application, with2DEditor } from "@bigby/editor";

/* Get root element */
const el = document.getElementById("app");

/* Set up game */
const game = new Entity();
game.name = "Bigby Sample Game";
game.addBehavior(Game2D).element = el;
game.addBehavior(Renderable2D);

/* Let's get this thing on the road */
ReactDOM.render(<Application root={with2DEditor(game)} />, el);
