import { expect } from "chai";
import { it } from "mocha";
import Behavior from "./Behavior";
import Entity from "./Entity";

describe("Behavior", () => {
  class Button extends Behavior {
    label = "Default Label";

    awake() {
      this.label = "I am awake";
    }
  }

  it("can be instantiated directly", () => {
    const entity = new Entity();
    const behavior = new Button(entity);
    expect(entity.hasBehavior(Button)).to.be.true;
    expect(behavior.label).to.eq("Default Label");
  });

  describe("Behavior.make", () => {
    it("creates a behavior instance", () => {
      const entity = new Entity();
      const behavior = Behavior.make(entity, Button, { label: "Custom Label" });
      expect(behavior).to.be.instanceOf(Button);
      expect(behavior.label).to.eq("Custom Label");
    });

    context("when the entity is already awake", () => {
      it("also awakes the behavior", () => {
        const entity = new Entity();
        entity.awake();

        const behavior = Behavior.make(entity, Button);
        expect(behavior.label).to.eq("I am awake");
      });
    });
  });
});
