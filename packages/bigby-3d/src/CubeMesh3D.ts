import { Behavior } from "@bigby/core";
import * as random from "@bigby/random";
import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import Transform3D from "./Transform3D";

export default class CubeMesh3D extends Behavior {
  static displayName = "CubeMesh3D";
  static icon = "❇️";
  static description = "Renders a cube mesh.";

  static geometry = new BoxGeometry();

  awake() {
    /* Add some dummy stuff */
    const phongMat = new MeshPhongMaterial({
      color: Math.floor(random.number(0xff)) * 0xff0000,
      specular: 0x666666,
      shininess: 10,
    });

    const cube = new Mesh(CubeMesh3D.geometry, phongMat);

    /* Add the cube to our local Transform3D */
    this.getBehavior(Transform3D).add(cube);
  }
}
