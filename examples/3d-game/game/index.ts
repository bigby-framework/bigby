import { AutoRotate3D, ITransform3D, Renderer3D, Transform3D } from "@bigby/3d";
import { with3DEditor } from "@bigby/3d-editor";
import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity } from "@bigby/core";
import { BoxGeometry, Mesh, MeshNormalMaterial, Vector3 } from "three";

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

const cube = (t3d?: Partial<ITransform3D>) => {
  const sphere = new Entity("Sphere");
  sphere.addBehavior(Transform3D, t3d);
  sphere.addBehavior(CubeMesh);
  return sphere;
};

const sculpture = new Entity("Sculpture");
sculpture.addBehavior(Transform3D);
sculpture.addBehavior(AutoRotate3D, { speed: { x: 2.7, y: 3.9, z: 1 } });
game.addChild(sculpture);

sculpture.addChild(cube({ position: { x: 0, y: 0, z: 0 } }));
sculpture.addChild(
  cube({
    position: { x: -2, y: 1, z: 1 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },
  })
);
sculpture.addChild(
  cube({
    position: { x: 2, y: -2, z: -1 },
    scale: { x: 0.7, y: 0.7, z: 0.7 },
  })
);

export default with3DEditor(game);
// export default game;
