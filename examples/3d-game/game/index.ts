import { Game3D } from "@bigby/3d";
import { Entity } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";
import { with3DEditor } from "@bigby/3d-editor";

const game = new Entity("Test 3D Game");
game.addBehavior(Ticker);
game.addBehavior(Game3D);

export default with3DEditor(game);
