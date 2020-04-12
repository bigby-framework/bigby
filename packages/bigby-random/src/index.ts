/**
 * Returns a randomly generated number between 0 (inclusive) and the specified boundary (exclusive).
 * @param max Upper boundary (exclusive) of random number to generate.
 */
export const number = (max = 1) => Math.random() * max;

/**
 * Returns a random number based on a specific value with a random offset applied.
 *
 * ```
 * // returns a random number between 400 and 600
 * variance(500, 100)
 * ```
 *
 * @param base The base value.
 * @param amplitude The amplitude of the random offset applied to the base value.
 */
export const variance = (base: number, amplitude: number) =>
  base + minusPlus(amplitude);

export const minusPlus = (range = 1) => between(-range, range);

export const minusPlusOne = () => minusPlus(1);

export const between = (min: number, max: number) => min + number(max - min);

export const pick = <T>(from: Array<T>): T =>
  from[Math.floor(number(from.length))];

export const chance = (threshold = 0.5) => Math.random() < threshold;

export const radian = () => number(Math.PI * 2);

export const degree = () => number(360);
