import { Router as IttyRouter, RouterType } from "itty-router";
import { RequestHandler } from "../../src/decorators/types";
import {
  AnnotatedRouter,
  Config,
  Controller,
  Get,
  Inject,
  Property,
  Router,
  initialize,
} from "../../src/index";

describe("Initialization", () => {
  it("fails when router is not configured", () => {
    expect(() => initialize({})).toThrow();
  });

  it("works when router is configured", () => {
    const container = {};

    @Router(container)
    class TestRouter implements AnnotatedRouter {
      get(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      put(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      post(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      patch(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      delete(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      all(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      handle(req: Request): Promise<Response> {
        throw new Error("Method not implemented.");
      }
    }

    expect(() => initialize(container)).not.toThrow();
  });

  it("returns a functioning request handler", async () => {
    const container = {};

    @Config(container)
    class TestConfig {
      @Property("IttyRouter")
      getIttyRouter() {
        return IttyRouter();
      }
    }

    @Router(container)
    class TestRouter implements AnnotatedRouter {
      @Inject("IttyRouter")
      private accessor ittyRouter: RouterType;

      public get(uri: string, handler: RequestHandler): AnnotatedRouter {
        this.ittyRouter.get(uri, handler);
        return this;
      }

      handle(request: Request) {
        return this.ittyRouter.handle(request);
      }

      put(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }

      post(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }

      patch(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }

      delete(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }

      all(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
    }

    const responseBody = "Hello World";

    @Controller("/controller", container)
    class TestController {
      @Get("get")
      async get(req: Request) {
        return new Response(responseBody);
      }
    }

    const response = await initialize(container)(
      new Request("https://test.com/controller/get")
    );
    expect(response).toBeDefined();

    const body = await response.text();
    expect(body).toBe(responseBody);
  });
});
