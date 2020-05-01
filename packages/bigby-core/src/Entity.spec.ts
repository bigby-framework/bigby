import { expect } from "chai";
import { it } from "mocha";
import Behavior from "./Behavior";
import Entity from "./Entity";

describe("Entity", () => {
  describe("constructor", () => {
    it("returns an instance", () => {
      const instance = new Entity();
      expect(instance).to.be.instanceOf(Entity);
    });

    it("accepts an Entity Description", () => {
      const instance = new Entity({ name: "A Name" });
      expect(instance.name).to.equal("A Name");
    });
  });

  describe("addChild", () => {
    let entity: Entity;
    let child: Entity;

    beforeEach(() => {
      entity = new Entity();
      child = new Entity();
    });

    it("adds another entity to the list of children", () => {
      expect(entity.children).not.to.include(child);
      entity.addChild(child);
      expect(entity.children).to.include(child);
    });

    it("changes the child's parent to the owning entity", () => {
      expect(child.parent).to.eq(null);
      entity.addChild(child);
      expect(child.parent).to.eq(entity);
    });

    it("returns the child entity", () => {
      expect(entity.addChild(child)).to.eq(child);
    });

    it("dosn't add the child twice", () => {
      entity.addChild(child);
      expect(entity.children).to.deep.eq([child]);
      entity.addChild(child);
      expect(entity.children).to.deep.eq([child]);
    });

    it("accepts an Entity Description", () => {
      child = entity.addChild({ name: "Child Entity" });
      expect(child.name).to.eq("Child Entity");
    });

    it("accepts an Entity Constructor", () => {
      class SomeEntity extends Entity {}

      child = entity.addChild(SomeEntity);
      expect(child).to.be.instanceof(SomeEntity);
    });
  });

  describe("addBehavior", () => {
    let entity: Entity;

    class Button extends Behavior {
      label = "Default Label";
    }

    beforeEach(() => {
      entity = new Entity();
    });

    it("accepts a Behavior instance", () => {
      const behavior = new Button();
      entity.addBehavior(behavior);

      expect(entity.behaviors).to.deep.equal([behavior]);
    });

    it("accepts a Behavior Description", () => {
      const behavior = entity.addBehavior(Button, { label: "My Label" });

      expect(behavior).to.be.instanceOf(Button);
      expect(behavior.label).to.eq("My Label");
      expect(entity.behaviors).to.deep.equal([behavior]);
    });

    it("doesn't add the same behavior twice", () => {
      const behavior = new Button();
      entity.addBehavior(behavior);
      expect(entity.behaviors).to.deep.equal([behavior]);
      entity.addBehavior(behavior);
      expect(entity.behaviors).to.deep.equal([behavior]);
    });
  });

  describe("hasBehavior", () => {
    class Button extends Behavior {
      label = "Default Label";
    }

    let entity: Entity;
    let behavior: Button;

    beforeEach(() => {
      entity = new Entity();
      behavior = new Button();
    });

    context("when passed a behavior instance", () => {
      it("returns true if it is in the list of this entitys behaviors", () => {
        entity.addBehavior(behavior);
        expect(entity.hasBehavior(behavior)).to.be.true;
      });

      it("returns false if it is not in the list of behaviors", () => {
        expect(entity.hasBehavior(behavior)).to.be.false;
      });
    });

    context("when passed a behavior constructor", () => {
      it("returns true if the entity has 1 or more behaviors of this type", () => {
        entity.addBehavior(behavior);
        expect(entity.hasBehavior(Button)).to.be.true;
      });

      it("returns false if the type is not in the list of behaviors", () => {
        expect(entity.hasBehavior(Button)).to.be.false;
      });
    });
  });

  describe("awake", () => {
    it("calls the awake method on all of its behaviors");
    it("calls the awake method on all of its children");
  });
});
