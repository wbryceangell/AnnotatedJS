import { Controller, Get } from "../../src/index";

describe("Controller", () => {
  it("should not work when path argument is not a string", () => {
    expect(() => {
      // @ts-ignore
      @Controller({})
      class TestController {}
    }).toThrow();
  });

  it("should not work when path argument is an empty string", () => {
    expect(() => {
      @Controller("")
      class TestController {}
    }).toThrow();
  });

  it("should not work when method argument is not a string", () => {
    expect(() => {
      @Controller("test")
      class TestController {
        // @ts-ignore
        @Get({})
        get() {}
      }
    }).toThrow();
  });

  it("should not work when method argument is an empty string", () => {
    expect(() => {
      @Controller("test")
      class TestController {
        // @ts-ignore
        @Get("")
        get() {}
      }
    }).toThrow();
  });

  it("should not work when annotated method is not a function", () => {
    expect(() => {
      @Controller("test")
      class TestController {
        // @ts-ignore
        @Get()
        private notMethod: any;
      }
    }).toThrow();
  });
});
