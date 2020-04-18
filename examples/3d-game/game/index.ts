import { AutoRotate3D, ITransform3D, Renderer3D, Transform3D } from "@bigby/3d";
import { with3DEditor } from "@bigby/3d-editor";
import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity } from "@bigby/core";
import { BoxGeometry, Mesh, MeshNormalMaterial, Vector3 } from "three";
import * as random from "@bigby/random";

class Light extends Behavior {
  static displayName = "Dummy Light";

  awake() {}
}

class CubeMesh extends Behavior {
  static displayName = "CubeMesh";

  awake() {
    const t3d = this.getBehavior(Transform3D);

    /* Add some dummy stuff */
    var geometry = new BoxGeometry();
    var mat = new MeshNormalMaterial({});
    var cube = new Mesh(geometry, mat);

    t3d.group.add(cube);
  }
}

const game = new Entity("Test 3D Game");
game.addBehavior(Transform3D);
game.addBehavior(Ticker);
game.addBehavior(Renderer3D);

const light = new Entity("Light");
light.addBehavior(Transform3D, { position: { x: -70, y: 15, z: -18 } });
light.addBehavior(Light);
game.addChild(light);

const cube = () => {
  const cube = new Entity("Sphere");
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
  cube.addBehavior(CubeMesh);
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
