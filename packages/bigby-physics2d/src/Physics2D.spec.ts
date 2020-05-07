import { expect } from "chai";
import { it } from "mocha";
import Physics2D from "./Physics2D";
import { Entity } from "@bigby/core";
import * as planck from "planck-js";

describe("Physics2D", () => {
  it("uses a planck.js world to simulate physics", () => {
    const e = new Entity();
    const pw2d = new Physics2D(e);
    expect(pw2d.world).to.be.instanceOf(planck.World);
  });
});
