import { initialize, Router } from "../../src/index";

describe("Initialization", () => {
  it("fails when router is not configured", () => {
    expect(() => initialize({})).toThrow();
  });

  it("works when router is configured", () => {
    const container = {};

    // @ts-ignore
    @Router(container)
    class TestRouter {}

    expect(() => initialize(container)).not.toThrow();
  });
});
