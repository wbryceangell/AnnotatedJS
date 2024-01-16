import { initialize } from "../../src/index";

describe("Initialization", () => {
  it("fails when there isn't a config", () => {
    expect(() => initialize()).toThrow();
  });
});
