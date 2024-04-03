/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, Router } from "../../src";

describe("Controller", () => {
  it("should not work when path argument is not a string", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {}

      // @ts-expect-error invalid path argument
      @Controller({}, container)
      class TestController {}
    }).toThrow();
  });

  it("should not work when path argument is an empty string", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {}

      @Controller("", container)
      class TestController {}
    }).toThrow();
  });

  it("should not work when method argument is not a string", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-expect-error invalid method argument
        @Get({})
        get() {}
      }
    }).toThrow();
  });

  it("should not work when method argument is an empty string", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-expect-error method is not a request handler
        @Get("")
        get() {}
      }
    }).toThrow();
  });

  it("should not work when annotated method is not a function", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-expect-error annotated something that is not a method
        @Get()
        private notMethod: unknown;
      }
    }).toThrow();
  });

  it("should work when annotated method is a function", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-expect-error method is not a request handler
        @Get()
        get() {}
      }
    }).not.toThrow();
  });

  it("should work when annotated method is a function and method path is included", () => {
    expect(() => {
      const container = {};

      // @ts-expect-error invalid router implementation
      @Router(container)
      class TestRouter {
        get() {}
      }

      @Controller("test", container)
      class TestController {
        // @ts-expect-error method is not a request handler
        @Get("path")
        get() {}
      }
    }).not.toThrow();
  });
});
