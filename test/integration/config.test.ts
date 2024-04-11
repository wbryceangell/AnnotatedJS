/* eslint-disable @typescript-eslint/no-unused-vars */

import { Config, Property, RequestScope } from "../../src";

describe("Config", () => {
  it("should not work when @Property arg is not a string", () => {
    expect(() => {
      @Config({})
      class Configuration {
        // @ts-expect-error property arg is not a string
        @Property(0)
        getProp() {}
      }
    }).toThrow();
  });

  it("should not work when property is undefined", () => {
    expect(() => {
      @Config({})
      class Configuration {
        @Property("prop")
        getProp() {}
      }
    }).toThrow();
  });

  it("should work when property is null", () => {
    expect(() => {
      @Config({})
      class Configuration {
        @Property("prop")
        getProp() {
          return null;
        }
      }
    }).not.toThrow();
  });

  it("should not work when @Property is not used on a function", () => {
    expect(() => {
      @Config({})
      class Configuration {
        // @ts-expect-error annotation used on a non-method
        @Property("prop")
        private prop: unknown;
      }
    }).toThrow();
  });

  it("should work when a property is used in another property", () => {
    expect(() => {
      @Config({})
      class Configuration {
        @Property("propOne")
        getPropOne() {
          return null;
        }

        @Property("propTwo")
        getPropTwo() {
          return this.getPropOne();
        }
      }
    }).not.toThrow();
  });

  it("should not work when property tries to access another property before it is declared", () => {
    expect(() => {
      @Config({})
      class Configuration {
        @Property("propOne")
        getPropOne() {
          return this.getPropTwo();
        }

        @Property("propTwo")
        getPropTwo() {
          return null;
        }
      }
    }).toThrow();
  });

  it("should not work when @RequestScope is used on a class that is not a configuration", () => {
    expect(() => {
      @RequestScope({})
      class NotConfig {}
    }).toThrow();
  });

  it("should not work when @RequestScope is used on a class before @Config", () => {
    expect(() => {
      const container = {};

      @Config(container)
      @RequestScope(container)
      class Configuration {}
    }).toThrow();
  });

  it("should work when @RequestScope is used on an existing configuration class", () => {
    expect(() => {
      const container = {};

      @RequestScope(container)
      @Config(container)
      class Configuration {}
    }).not.toThrow();
  });
});
