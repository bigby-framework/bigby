import { Entity } from "@bigby/core";
import { expect } from "chai";
import { it } from "mocha";
import Transform from "./Transform";

describe("Transform", () => {
  it("automatically adds its container to the nearest transform", () => {
    /* Create a root entity with a Transform */
    const root = new Entity({ behaviors: [Transform] });
    root.awake();

    /* Add another entity with a Transform */
    const other = root.addChild({ behaviors: [Transform] });

    /* Check if everything connected as expected */
    const rootTransform = root.$(Transform)!;
    const otherTransform = other.$(Transform)!;

    expect(rootTransform.container.children).to.include(
      otherTransform.container
    );
  });
});
