import { Config, Inject, Property } from "../../src/index";

describe("Injection", () => {
  it("should not work when symbol is not configured", () => {
    expect(() => {
      class Test {
        @Inject(Symbol.for("injected")) public accessor injected: any;
      }
    }).toThrow();
  });

  it("should not work when symbol is configured and undefined", () => {
    expect(() => {
      const prop = Symbol.for("prop");
      @Config
      class Configuration {
        getRouter() {
          return {};
        }
        @Property(prop) getProp() {}
      }
      class Test {
        @Inject(prop) public accessor prop: any;
      }
    }).toThrow();
  });

  it("should work when symbol is configured and null", () => {
    expect(() => {
      const prop = Symbol.for("prop");
      @Config
      class Configuration {
        getRouter() {
          return {};
        }
        @Property(prop) getProp() {
          return null;
        }
      }
      class Test {
        @Inject(prop) public accessor prop: any;
      }
    }).not.toThrow();
  });

  it("should work when symbol is configured and defined", () => {
    expect(() => {
      const prop = Symbol.for("prop");
      @Config
      class Configuration {
        getRouter() {
          return {};
        }
        @Property(prop) getProp() {
          return {};
        }
      }
      class Test {
        @Inject(prop) public accessor prop: any;
      }
    }).not.toThrow();
  });
});
