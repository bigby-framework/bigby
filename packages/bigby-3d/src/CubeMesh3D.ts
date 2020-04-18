import { Behavior } from "@bigby/core";
import Transform3D from "./Transform3D";
import {
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  MeshLambertMaterial,
} from "three";

export default class CubeMesh3D extends Behavior {
  static displayName = "CubeMesh3D";
  static icon = "❇️";
  static description = "Renders a cube mesh.";

  awake() {
    /* Add some dummy stuff */
    const geometry = new BoxGeometry();
    const mat = new MeshLambertMaterial({ color: 0xdddddd });
    const cube = new Mesh(geometry, mat);

    /* Add the cube to our local Transform3D */
    this.getBehavior(Transform3D).add(cube);
  }
}
