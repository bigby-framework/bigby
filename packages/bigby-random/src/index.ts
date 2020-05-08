/**
 * Returns a randomly generated number between 0 (inclusive) and the specified boundary (exclusive).
 *
 * @category Number
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
 * @category Number
 * @param base The base value.
 * @param amplitude The amplitude of the random offset applied to the base value.
 */
export const variance = (base: number, amplitude: number) =>
  base + minusPlus(amplitude);

/**
 * Returns a random number between -1 and 1 (or any other range.)
 *
 * @category Number
 * @param range The (absolute) value of the range to pick from.
 */
export const minusPlus = (range = 1) => between(-range, range);

/**
 * Returns a random number between -1 and 1.
 *
 * If you need a different range, use [[minusPlus]].
 * @category Number
 */
export const minusPlusOne = () => minusPlus(1);

/**
 * Returns a random value between a specified minimum and maximum boundary.
 *
 * @category Number
 * @param min Minimum value (inclusive)
 * @param max Maximum value (exclusive)
 */
export const between = (min: number, max: number) => min + number(max - min);

/**
 * Return a random item from an array.
 *
 * @category Array
 * @param from The array to pick from.
 */
export const pick = <T>(from: Array<T>): T =>
  from[Math.floor(number(from.length))];

/**
 * Randomly returns `true` or `false`. By default, there is a 50% chance `true` will be returned; this chance can be
 * specified as a parameter.
 *
 * @category Chance
 * @param threshold The chance `true` will be returned (0 is never, 1 is always)
 */
export const chance = (threshold = 0.5) => Math.random() < threshold;

/**
 * Returns a random radian value (0 <= n < 2*PI) on a circle.
 */
export const radian = () => number(Math.PI * 2);

/**
 * Returns a random degree (0 <= n < 360) on a circle.
 */
export const degree = () => number(360);
