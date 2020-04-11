import { Vec2 } from "planck-js";

export const vec2unit = (vec2: Vec2) => {
  const unit = vec2.clone();
  unit.normalize(); /* Yup, it mutates... */
  return unit;
};
