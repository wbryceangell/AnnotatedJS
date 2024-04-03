/* eslint-disable @typescript-eslint/no-unused-vars */

import { Router } from "../../src";

describe("Router", () => {
  it("should work when it is used on a class", () => {
    expect(() => {
      // @ts-expect-error testing invalid router implementation
      @Router({})
      class TestRouter {}
    }).not.toThrow();
  });
});
