import { Router as IttyRouter, RouterType } from "itty-router";
import { RequestHandler } from "../../src/decorators/types";
import {
  AnnotatedRouter,
  Config,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
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
        this.ittyRouter.patch(uri, handler);
        return this;
      }

      delete(uri: string, handler: RequestHandler): AnnotatedRouter {
        this.ittyRouter.delete(uri, handler);
        return this;
      }

      all(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
    }

    const expectedGetBody = "get";
    const expectedGetAllBody = "getAll";

    @Controller("/controller", container)
    class TestController {
      @Get()
      async getAll() {
        return new Response(expectedGetAllBody);
      }

      @Get("get")
      async get() {
        return new Response(expectedGetBody);
      }

      @Delete()
      async delete() {
        return new Response(null, { status: 204 });
      }

      @Patch()
      async patch() {
        return new Response(null, { status: 204 });
      }
    }

    const handle = initialize(container);

    const getAllResponse = await handle(
      new Request("https://test.com/controller"),
    );
    expect(getAllResponse).toBeDefined();

    const getAllBody = await getAllResponse.text();
    expect(getAllBody).toBe(expectedGetAllBody);

    const getResponse = await handle(
      new Request("https://test.com/controller/get"),
    );
    expect(getResponse).toBeDefined();

    const getBody = await getResponse.text();
    expect(getBody).toBe(expectedGetBody);

    const deleteResponse: Response = await handle(
      new Request("https://test.com/controller", { method: "DELETE" }),
    );

    expect(deleteResponse).toBeDefined();
    expect(deleteResponse.status).toBe(204);

    const patchResponse: Response = await handle(
      new Request("https://test.com/controller", { method: "PATCH" }),
    );

    expect(patchResponse).toBeDefined();
    expect(patchResponse.status).toBe(204);
  });
});
