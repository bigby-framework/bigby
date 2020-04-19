import {
  AutoRotate3D,
  CubeMesh3D,
  Renderer3D,
  Transform3D,
  AmbientLight3D,
  DirectionalLight3D,
} from "@bigby/3d";
import { with3DEditor } from "@bigby/3d-editor";
import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity } from "@bigby/core";
import * as random from "@bigby/random";
import cubes from "./cubes";

const game = new Entity("Test 3D Game");
game.addBehavior(Transform3D);
game.addBehavior(Ticker);
game.addBehavior(Renderer3D);
game.addBehavior(AmbientLight3D);

const light = new Entity("Light");
light.addBehavior(Transform3D, { position: { x: -70, y: 15, z: -18 } });
light.addBehavior(DirectionalLight3D);
game.addChild(light);

game.addChild(cubes(50));

export default with3DEditor(game);
// export default game;
