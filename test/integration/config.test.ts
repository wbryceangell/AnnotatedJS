import { Config, Property } from "../../src";

describe("Config", () => {
  it("should not work when @Property arg is not a string", () => {
    expect(() => {
      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        //@ts-ignore
        @Property(0)
        getProp() {}
      }
    }).toThrow();
  });

  it("should not work when property is undefined", () => {
    expect(() => {
      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        @Property("prop")
        getProp() {}
      }
    }).toThrow();
  });

  it("should work when property is null", () => {
    expect(() => {
      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        @Property("prop")
        getProp() {
          return null;
        }
      }
    }).not.toThrow();
  });

  it("should not work when @Property is not used on a function", () => {
    expect(() => {
      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        // @ts-ignore
        @Property("prop")
        private prop: unknown;
      }
    }).toThrow();
  });
});
