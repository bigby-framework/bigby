import { Behavior } from "@bigby/core";
import Transform3D from "./Transform3D";
import {
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshBasicMaterial,
} from "three";

export default class CubeMesh3D extends Behavior {
  static displayName = "CubeMesh3D";
  static icon = "❇️";
  static description = "Renders a cube mesh.";

  static geometry = new BoxGeometry();

  awake() {
    /* Add some dummy stuff */
    const phongMat = new MeshPhongMaterial({
      color: 0x000000,
      specular: 0x666666,
      emissive: 0xff0000,
      shininess: 10,
      opacity: 0.9,
      transparent: true,
    });

    const phongMat2 = new MeshPhongMaterial({
      color: 0xdddddd,
      specular: 0xffffff,
      shininess: 30,
      flatShading: true,
    });

    const basicMat = new MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
    });

    const lambertMat = new MeshLambertMaterial({ color: 0xdddddd });

    const cube = new Mesh(CubeMesh3D.geometry, phongMat2);

    /* Add the cube to our local Transform3D */
    this.getBehavior(Transform3D).add(cube);
  }
}
