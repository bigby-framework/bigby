import { Game3D } from "@bigby/3d";
import "./index.css";

const game = Game3D.make({
  canvas: document.getElementById("game") as HTMLCanvasElement,
});

game.awake();
