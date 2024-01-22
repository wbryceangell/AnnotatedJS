import { Config, Inject, Property } from "../../src/index";

describe("Injection", () => {
  it("should not work when property is configured and undefined", () => {
    expect(() => {
      const prop = "prop";

      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        @Property(prop)
        getProp() {}
      }

      class Test {
        @Inject(prop)
        private accessor prop: unknown;
      }
    }).toThrow();
  });

  it("should work when property is configured and null", () => {
    expect(() => {
      const prop = "prop";

      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }
        @Property(prop)
        getProp() {
          return null;
        }
      }

      class Test {
        @Inject(prop)
        private accessor prop: unknown;
      }
    }).not.toThrow();
  });

  it("should work when property is configured and defined", () => {
    expect(() => {
      const prop = "prop";

      // @ts-ignore
      @Config({})
      class Configuration {
        getRouter() {
          return {};
        }

        @Property(prop)
        getProp() {
          return {};
        }
      }

      class Test {
        @Inject(prop)
        private accessor prop: unknown;
      }
    }).not.toThrow();
  });
});
