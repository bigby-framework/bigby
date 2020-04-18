import { AutoRotate3D, Game3D, ITransform3D, Transform3D } from "@bigby/3d";
import { with3DEditor } from "@bigby/3d-editor";
import { Ticker } from "@bigby/behaviors";
import { Behavior, Entity } from "@bigby/core";

import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Materials/standardMaterial";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

class Light extends Behavior {
  static displayName = "Dummy Light";

  awake() {
    const light = new PointLight("", new Vector3(0, 0, 0), null);

    /* Parent to the nearest T3D */
    const t3d = this.getNearestBehavior(Transform3D);
    light.parent = t3d.node;
  }
}

class RenderSphere extends Behavior {
  static displayName = "Sphere";

  awake() {
    const sphere = Mesh.CreateSphere(null, 16, 4, null, false, Mesh.FRONTSIDE);

    /* Parent to the nearest T3D */
    const t3d = this.getNearestBehavior(Transform3D);
    sphere.parent = t3d.node;
  }
}

const game = new Entity("Test 3D Game");
game.addBehavior(Transform3D);
game.addBehavior(Ticker);
game.addBehavior(Game3D);

const light = new Entity("Light");
light.addBehavior(Transform3D, { position: { x: -70, y: 15, z: -18 } });
light.addBehavior(Light);
game.addChild(light);

const sphere = (t3d?: Partial<ITransform3D>) => {
  const sphere = new Entity("Sphere");
  sphere.addBehavior(Transform3D, t3d);
  sphere.addBehavior(RenderSphere);
  return sphere;
};

const sculpture = new Entity("Sculpture");
sculpture.addBehavior(Transform3D);
sculpture.addBehavior(AutoRotate3D, { speed: { x: 2.7, y: 3.9, z: 1 } });
game.addChild(sculpture);

sculpture.addChild(sphere({ position: { x: 0, y: 0, z: 0 } }));
sculpture.addChild(
  sphere({
    position: { x: -2, y: 1, z: 1 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },
  })
);
sculpture.addChild(
  sphere({
    position: { x: 2, y: -2, z: -1 },
    scale: { x: 0.7, y: 0.7, z: 0.7 },
  })
);

export default with3DEditor(game);
// export default game;
