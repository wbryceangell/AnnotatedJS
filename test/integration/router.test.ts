import { Router } from "../../src";

describe("Router", () => {
  it("should work when it is used on a class", () => {
    expect(() => {
      // @ts-ignore
      @Router({})
      class TestRouter {}
    }).not.toThrow();
  });
});
