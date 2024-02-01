import { Config, Property } from "../../src";

describe("Config", () => {
  it("should not work when @Property arg is not a string", () => {
    expect(() => {
      @Config({})
      class Configuration {
        //@ts-ignore
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
        // @ts-ignore
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
});
