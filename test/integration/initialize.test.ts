import { Config, initialize } from "../../src/index";

describe("Initialization", () => {
  it("fails when there isn't a config", () => {
    expect(() => initialize()).toThrow();
  });

  it("should work when router is configured", () => {
    @Config
    class Configuration {
      getRouter() {
        return {};
      }
    }
    expect(() => initialize()).not.toThrow();
  });
});
