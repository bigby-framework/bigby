import { Entity } from "@bigby/core";
import { Transform3D, CubeMesh3D, AutoRotate3D } from "@bigby/3d";
import { minusPlus, between } from "@bigby/random";

const cube = () => {
  const cube = new Entity("Cube");
  const scale = between(0.3, 2);
  cube.addBehavior(Transform3D, {
    position: {
      x: minusPlus(5),
      y: minusPlus(5),
      z: minusPlus(5),
    },
    rotation: {
      x: minusPlus(360),
      y: minusPlus(360),
      z: minusPlus(360),
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
      x: minusPlus(5),
      y: minusPlus(5),
      z: minusPlus(5),
    },
  });
  return cube;
};

const cubes = (num: number) => {
  const cubes = new Entity("Cubes");
  cubes.addBehavior(Transform3D);
  cubes.addBehavior(AutoRotate3D, { speed: { x: 2.7, y: 3.9, z: 1 } });

  for (let i = 0; i < num; i++) cubes.addChild(cube());

  return cubes;
};

export default cubes;
