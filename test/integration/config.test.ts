import { Config, Property } from "../../src";

describe("Config", () => {
  it("should not work when getRouter is missing", () => {
    expect(() => {
      // @ts-ignore
      @Config
      class Configuration {}
    }).toThrow();
  });

  it("should not work when router is not an object", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return null;
        }
      }
    }).toThrow();
  });

  it("should work when router is an object", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return {};
        }
      }
    }).not.toThrow();
  });

  it("should not work when @Property arg is not a symbol", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return {};
        }

        //@ts-ignore
        @Property("") getProp() {}
      }
    }).toThrow();
  });

  it("should not work when property is undefined", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return {};
        }

        @Property(Symbol.for("prop")) getProp() {}
      }
    }).toThrow();
  });

  it("should work when property is null", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return {};
        }

        @Property(Symbol.for("prop")) getProp() {
          return null;
        }
      }
    }).not.toThrow();
  });

  it("should not work when @Property is not used on a function", () => {
    expect(() => {
      @Config
      class Configuration {
        getRouter() {
          return {};
        }

        // @ts-ignore
        @Property(Symbol.for("prop")) private prop: any;
      }
    }).toThrow();
  });
});
