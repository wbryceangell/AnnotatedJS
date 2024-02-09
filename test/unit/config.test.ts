import { keys } from "../../src/container/keys";
import { MetadataProperties } from "../../src/decorators/config/metadataProperties";
import { Config } from "../../src/index";
import {
  initializerFor,
  itAddsClassToContainer,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
} from "./utils";

describe("@Config", () => {
  const name = "Config";
  const kind = "class";

  itAddsClassToContainer(name, Config, keys.configClasses);
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
      kind,
      name,
      addInitializer: initializerFor(ConfigClass),
      metadata: {
        [MetadataProperties.properties]: [[key, getter]],
      },
    });

    expect(callGetter).toHaveBeenCalledWith(expect.any(ConfigClass));
    expect(container[key]).toBe(value);
  });

  it("errors if property is undefined", () => {
    expect(() =>
      Config({})(class {}, {
        kind,
        name,
        addInitializer: initializerFor(class {}),
        metadata: {
          [MetadataProperties.properties]: [["key", () => undefined]],
        },
      }),
    ).toThrow();
  });

  it("can use properties in other properties", () => {
    const firstKey = "firstKey";
    const firstGetter = () => {};
    const value = null;
    const callFirstGetter = jest.fn(() => value);
    firstGetter.call = callFirstGetter;

    const secondKey = "secondKey";
    const secondGetter = () => {};
    const callSecondGetter = jest.fn((that) => {
      return that.firstGetter();
    });
    secondGetter.call = callSecondGetter;

    const container = {};
    class ConfigClass {}

    Config(container)(class {}, {
      kind,
      name,
      addInitializer: initializerFor(ConfigClass),
      metadata: {
        [MetadataProperties.properties]: [
          [firstKey, firstGetter],
          [secondKey, secondGetter],
        ],
      },
    });

    expect(callFirstGetter).toHaveBeenCalledTimes(1);
    expect(callFirstGetter).toHaveBeenCalledWith(expect.any(ConfigClass));
    expect(callSecondGetter).toHaveBeenCalledWith(expect.any(ConfigClass));

    expect(container[firstKey]).toBe(value);
    expect(container[secondKey]).toBe(value);
  });

  it("can use properties in other properties when declared in order", () => {
    const firstGetter = () => {};
    const callFirstGetter = jest.fn(() => null);
    firstGetter.call = callFirstGetter;

    const secondGetter = () => {};
    const callSecondGetter = jest.fn((that) => {
      return that.firstGetter();
    });
    secondGetter.call = callSecondGetter;

    const container = {};
    class ConfigClass {}

    expect(() =>
      Config(container)(class {}, {
        kind,
        name,
        addInitializer: initializerFor(ConfigClass),
        metadata: {
          [MetadataProperties.properties]: [
            ["secondKey", secondGetter],
            ["firstKey", firstGetter],
          ],
        },
      }),
    ).toThrow();

    expect(callFirstGetter).not.toHaveBeenCalled();
    expect(callSecondGetter).toHaveBeenCalledWith(expect.any(ConfigClass));
  });

  it("cannot set the same property twice", () => {
    const property = ["key", () => null];

    expect(() =>
      Config({})(class {}, {
        kind,
        name,
        addInitializer: initializerFor(class {}),
        metadata: {
          [MetadataProperties.properties]: [property, property],
        },
      }),
    ).toThrow();
  });
});
