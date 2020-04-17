import { Game3D, Transform3D } from "@bigby/3d";
import { Entity, Behavior } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";
import { with3DEditor } from "@bigby/3d-editor";

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

const sphere = new Entity("Sphere");
sphere.addBehavior(Transform3D);
sphere.addBehavior(RenderSphere);
game.addChild(sphere);

const ground = new Entity("Ground");
ground.addBehavior(Transform3D);
ground.addBehavior(RenderGround);
game.addChild(ground);

export default with3DEditor(game);
