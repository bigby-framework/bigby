import { describe, it } from "mocha";
import { expect } from "chai";
import Timer from "./Timer";
import { Entity } from "@bigby/core";

describe("Timer", () => {
  it("emits its onTimeout signal after timing out", () => {
    const entity = new Entity();
    const timer = entity.addBehavior(Timer, { duration: 1 });

    let counts = 0;
    timer.onTimeout(() => counts++);

    entity.awake();

    /* Within the time limit... */
    entity.update(0.5);
    expect(counts).to.eq(0);

    /* Once we hit the limit... */
    entity.update(0.5);
    expect(counts).to.eq(1);

    /* The callback should only ever be triggered once */
    entity.update(10);
    expect(counts).to.eq(1);

    /* Unless we reset it */
    timer.reset();
    entity.update(1);
    expect(counts).to.eq(2);
  });
});
