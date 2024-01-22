import { Config, initialize } from "../../src/index";

describe("Initialization", () => {
  it("fails when there isn't a config", () => {
    expect(() => initialize({})).toThrow();
  });

  it("works when router is configured", () => {
    const container = {};

    //@ts-ignore
    @Config(container)
    class Configuration {
      getRouter() {
        return {};
      }
    }

    expect(() => initialize(container)).not.toThrow();
  });
});
