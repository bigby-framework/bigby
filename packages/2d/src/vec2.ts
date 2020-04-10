export interface IVec2 {
  x: number;
  y: number;
}

export type IPoint = IVec2;

export const angleToVec2 = (angle: number): IVec2 => ({
  x: Math.cos(angle),
  y: Math.sin(angle),
});

export const vec2ToAngle = (vec2: IVec2) => Math.atan2(vec2.y, vec2.x);

export const vec2between = (a: IVec2, b: IVec2) =>
  <IVec2>{ x: b.x - a.x, y: b.y - a.y };
