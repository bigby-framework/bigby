import "./global.css";
import { Entity } from "@bigby/core";
import { Renderer } from "@bigby/game";

const root = new Entity({ name: "Game Root", behaviors: [Renderer] });
root.awake();

console.log(root);
