import { expect } from "chai";
import { it } from "mocha";
import Transform from "./Transform";
import { Entity } from "@bigby/core";

describe("Transform", () => {
  it("automatically adds its container to the nearest transform", () => {
    const root = new Entity({ behaviors: [Transform] });
    const other = root.addChild({ behaviors: [Transform] });
  });
});
