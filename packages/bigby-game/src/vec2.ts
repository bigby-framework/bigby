/**
 * This interface describes a simple 2D vector, represented by any object with
 * numerical `x` and `y` properties. With the dependencies we're using, we're
 * dealing with different implementations of these (`PIXI.IPoint` and
 * `planck.Vec2`, specifically), while we want to provide some common vector
 * math functionality that works with either of these.
 *
 * @export
 * @interface IVec2
 */
export interface IVec2 {
  x: number;
  y: number;
}

export type Vec2 = IVec2;

export const make = (x = 0, y = 0): Vec2 => ({ x, y });

/**
 * Returns a normalized 2D vector representing the specified angle.
 *
 * @param radians Angle (in radians)
 */
export const fromRadians = (radians: number): IVec2 => ({
  x: Math.cos(radians),
  y: Math.sin(radians),
});

/**
 * Returns the angle (in radians) of the given 2D vector.
 *
 * @param vec2 A 2D vector
 */
export const toRadians = (vec2: IVec2) => Math.atan2(vec2.y, vec2.x);

export const add = (a: IVec2, b: IVec2): IVec2 => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const subtract = (a: IVec2, b: IVec2): IVec2 => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const distance = (a: IVec2, b: IVec2) => subtract(b, a);

export const multiply = (a: IVec2, n: number): IVec2 => ({
  x: a.x * n,
  y: a.y * n,
});

export const length = (a: IVec2): number => Math.sqrt(a.x * a.x + a.y * a.y);
