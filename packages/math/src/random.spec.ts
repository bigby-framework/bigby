import * as random from "./random";

describe(random.number, () => {
  test("returns a random number", () => {
    expect(typeof random.number() === "number").toBe(true);
  });
});
