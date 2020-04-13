import { Entity } from "./Entity";

describe("Entity", () => {
  test("dummy test", () => {
    const entity = new Entity("foobar");
    expect(entity.name).toBe("foobar");
  });
});
