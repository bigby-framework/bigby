import { expect } from "chai";
import { it } from "mocha";
import * as vec2 from "./vec2";

describe("vec2", () => {
  describe("fromAngle", () => {
    it("returns a vector representing a given angle", () => {
      expect(vec2.fromAngle(0)).to.eql({ x: 1, y: 0 });

      expect(vec2.fromAngle(Math.PI)).to.eql({
        x: Math.cos(Math.PI),
        y: Math.sin(Math.PI),
      });
    });
  });

  describe("toAngle", () => {
    it("returns the angle (in radians) of a vector", () => {
      expect(vec2.toAngle({ x: 1, y: 0 })).to.eq(0);
      expect(vec2.toAngle({ x: -1, y: 0 })).to.eq(Math.PI);
    });
  });

  describe("subtract", () => {
    it("subtracts two vectors", () => {
      const a = { x: 5, y: 10 };
      const b = { x: 2, y: 12 };
      expect(vec2.subtract(a, b)).to.eql({ x: 3, y: -2 });
    });
  });

  describe("distance", () => {
    it("returns the distance between two vectors", () => {
      const a = { x: 5, y: 10 };
      const b = { x: 2, y: 12 };
      expect(vec2.distance(a, b)).to.eql({ x: -3, y: 2 });
    });
  });
});
