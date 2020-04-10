const add = (a: number, b: number) => a + b;

test("adds numbers", () => {
  expect(add(1, 2)).toBe(3);
});
