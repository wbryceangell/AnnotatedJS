import { Controller, Get, Router } from "../../src/index";

describe("Controller", () => {
  it("should not work when path argument is not a string", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {}

      // @ts-ignore
      @Controller({}, container)
      class TestController {}
    }).toThrow();
  });

  it("should not work when path argument is an empty string", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {}

      @Controller("", container)
      class TestController {}
    }).toThrow();
  });

  it("should not work when method argument is not a string", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-ignore
        @Get({})
        get() {}
      }
    }).toThrow();
  });

  it("should not work when method argument is an empty string", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-ignore
        @Get("")
        get() {}
      }
    }).toThrow();
  });

  it("should not work when annotated method is not a function", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-ignore
        @Get()
        private notMethod: unknown;
      }
    }).toThrow();
  });

  it("should work when annotated method is a function", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-ignore
        @Get()
        get() {}
      }
    }).not.toThrow();
  });

  it("should work when annotated method is a function and method path is included", () => {
    expect(() => {
      const container = {};

      // @ts-ignore
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-ignore
        @Get("path")
        get() {}
      }
    }).not.toThrow();
  });
});
