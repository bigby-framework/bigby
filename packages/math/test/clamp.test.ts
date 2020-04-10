import { clamp, clamp01 } from "../src/clamp";

describe("clamp", () => {
  test("respects minimum boundary", () => expect(clamp(3, 4, 6)).toBe(4));
  test("respects maximum boundary", () => expect(clamp(7, 4, 6)).toBe(6));
  test("returns the value when within boundaries", () =>
    expect(clamp(5, 4, 6)).toBe(5));
});

describe("clamp01", () => {
  test("respects minimum boundary", () => expect(clamp01(-1)).toBe(0));
  test("respects maximum boundary", () => expect(clamp01(2)).toBe(1));
  test("returns the value when within boundaries", () =>
    expect(clamp01(0.5)).toBe(0.5));
});
