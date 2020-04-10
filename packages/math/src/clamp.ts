/**
 * Clamps the given value between a minimum and maximum boundary.
 *
 * @param value The number to clamp between the given boundaries.
 * @param min Minimum boundary.
 * @param max Maximum boundary.
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Clamps the given value between 0 and 1.
 *
 * @param value The number to clamp.
 */
export const clamp01 = (value: number) => clamp(value, 0, 1);
