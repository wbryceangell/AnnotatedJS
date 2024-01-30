import { MetadataProperties } from "../../src/decorators/config/metadataProperties";
import { Config } from "../../src/index";
import {
  initializerFor,
  itCreatesClassInstanceInInitHook,
  itCreatesInstanceOfClass,
  itHasInitializationHook,
} from "./utils";

describe("@Config", () => {
  const name = "Config";

  itCreatesInstanceOfClass(name, Config({}));
  itHasInitializationHook(name, Config({}));
  itCreatesClassInstanceInInitHook(name, Config({}));

  it("adds properties to the container", () => {
    const key = "key";
    const value = null;
    const getter = () => {};
    const callGetter = jest.fn(() => value);
    getter.call = callGetter;
    const container = {};
    class ConfigClass {}

    Config(container)(class {}, {
      kind: "class",
      name,
      addInitializer: initializerFor(ConfigClass),
      metadata: {
        [MetadataProperties.properties]: [[key, getter]],
      },
    });

    expect(callGetter).toHaveBeenCalledWith(expect.any(ConfigClass));
    expect(container[key]).toBe(value);
  });
});
