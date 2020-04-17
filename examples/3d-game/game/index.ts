import { Game3D, Transform3D, ITransform3D } from "@bigby/3d";
import { Entity, Behavior } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";
import { with3DEditor } from "@bigby/3d-editor";

class Light extends Behavior {
  awake() {
    const light = new BABYLON.PointLight(
      "",
      new BABYLON.Vector3(0, 0, 0),
      null
    );

    /* Parent to the nearest T3D */
    const t3d = this.getNearestBehavior(Transform3D);
    light.parent = t3d.node;
  }
}

class RenderGround extends Behavior {
  awake() {
    const ground = BABYLON.Mesh.CreateGround(null, 6, 6, 2, null, false);

    /* Parent to the nearest T3D */
    const t3d = this.getNearestBehavior(Transform3D);
    ground.parent = t3d.node;
  }
}

class RenderSphere extends Behavior {
  awake() {
    const sphere = BABYLON.Mesh.CreateSphere(
      null,
      16,
      4,
      null,
      false,
      BABYLON.Mesh.FRONTSIDE
    );

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
