import {
  AutoRotate3D,
  CubeMesh3D,
  Renderer3D,
  Transform3D,
  AmbientLight3D,
} from "@bigby/3d";
import { with3DEditor } from "@bigby/3d-editor";
import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity } from "@bigby/core";
import * as random from "@bigby/random";

const game = new Entity("Test 3D Game");
game.addBehavior(Transform3D);
game.addBehavior(Ticker);
game.addBehavior(Renderer3D);
game.addBehavior(AmbientLight3D);

const light = new Entity("Light");
light.addBehavior(Transform3D, { position: { x: -70, y: 15, z: -18 } });
game.addChild(light);

const cube = () => {
  const cube = new Entity("Cube");
  const scale = random.between(0.3, 2);
  cube.addBehavior(Transform3D, {
    position: {
      x: random.minusPlus(5),
      y: random.minusPlus(5),
      z: random.minusPlus(5),
    },
    rotation: {
      x: random.minusPlus(360),
      y: random.minusPlus(360),
      z: random.minusPlus(360),
    },
    scale: {
      x: scale,
      y: scale,
      z: scale,
    },
  });
  cube.addBehavior(CubeMesh3D);
  cube.addBehavior(AutoRotate3D, {
    speed: {
      x: random.minusPlus(5),
      y: random.minusPlus(5),
      z: random.minusPlus(5),
    },
  });
  return cube;
};

const sculpture = new Entity("Sculpture");
sculpture.addBehavior(Transform3D);
sculpture.addBehavior(AutoRotate3D, { speed: { x: 2.7, y: 3.9, z: 1 } });
game.addChild(sculpture);

for (let i = 0; i < 50; i++) sculpture.addChild(cube());

export default with3DEditor(game);
// export default game;
