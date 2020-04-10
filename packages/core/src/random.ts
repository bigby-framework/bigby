export const variance = (base: number, amplitude: number) =>
  base + minusPlus(amplitude);

export const minusPlus = (range = 1) => between(-range, range);

export const minusPlusOne = () => minusPlus(1);

export const number = (max = 1) => Math.random() * max;

export const between = (min: number, max: number) => min + number(max - min);

export const pick = <T>(from: Array<T>): T =>
  from[Math.floor(number(from.length))];

export const chance = (threshold = 0.5) => Math.random() < threshold;

export const radian = () => number(Math.PI * 2);

export const degree = () => number(360);
