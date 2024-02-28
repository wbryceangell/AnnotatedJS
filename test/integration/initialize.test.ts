/* eslint-disable @typescript-eslint/no-unused-vars */

import { Router as IttyRouter, RouterType } from "itty-router";
import {
  AnnotatedCache,
  AnnotatedCacheStorage,
  AnnotatedRouter,
  Cache,
  CacheStorage,
  Config,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Property,
  Purge,
  Put,
  RequestHandler,
  Router,
  initialize,
} from "../../src";

describe("Initialization", () => {
  it("fails when router is not configured", () => {
    expect(() => initialize({})).toThrow();
  });

  it("works when router is configured", () => {
    const container = {};

    @Router(container)
    class TestRouter implements AnnotatedRouter {
      get(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      put(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      post(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      patch(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      delete(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      all(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      handle(_req: Request): Promise<Response> {
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
        this.ittyRouter.put(uri, handler);
        return this;
      }

      post(uri: string, handler: RequestHandler): AnnotatedRouter {
        this.ittyRouter.post(uri, handler);
        return this;
      }

      patch(uri: string, handler: RequestHandler): AnnotatedRouter {
        this.ittyRouter.patch(uri, handler);
        return this;
      }

      delete(uri: string, handler: RequestHandler): AnnotatedRouter {
        this.ittyRouter.delete(uri, handler);
        return this;
      }

      all(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
    }

    const cacheHeader = "cached";

    class TestCache implements AnnotatedCache {
      private map = new Map<string, Response>();

      async match(request: Request): Promise<Response | undefined> {
        let response = this.map.get(request.url);

        if (response) {
          response = new Response(response.body, {
            headers: { [cacheHeader]: "true" },
          });
        }

        return response;
      }

      async put(request: Request, response: Response): Promise<undefined> {
        this.map.set(request.url, response);
      }

      async delete(request: Request): Promise<boolean> {
        return this.map.delete(request.url);
      }
    }

    @CacheStorage(container)
    class TestCacheStorage implements AnnotatedCacheStorage {
      private map = new Map<string, AnnotatedCache>();

      async has(cacheName: string): Promise<boolean> {
        return this.map.has(cacheName);
      }

      async open(cacheName: string): Promise<AnnotatedCache> {
        if (this.map.has(cacheName)) {
          return this.map.get(cacheName) as AnnotatedCache;
        }

        const cache = new TestCache();
        this.map.set(cacheName, cache);
        return cache;
      }

      async delete(cacheName: string): Promise<boolean> {
        return this.map.delete(cacheName);
      }
    }

    const expectedGetBody = "get";
    const expectedGetAllBody = "getAll";
    const cacheName = "cacheName";

    @Controller("/controller", container)
    class TestController {
      @Get()
      async getAll() {
        return new Response(expectedGetAllBody);
      }

      @Cache(cacheName)
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

      @Post()
      async post() {
        return new Response(null, { status: 201 });
      }

      @Purge(cacheName)
      @Put()
      async put() {
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

    let getResponse = await handle(
      new Request("https://test.com/controller/get"),
    );
    expect(getResponse).toBeDefined();
    expect(getResponse.headers.get(cacheHeader)).toBeFalsy();

    getResponse = await handle(new Request("https://test.com/controller/get"));
    expect(getResponse).toBeDefined();
    expect(getResponse.headers.get(cacheHeader)).toBeTruthy();

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

    const postResponse: Response = await handle(
      new Request("https://test.com/controller", { method: "POST" }),
    );

    expect(postResponse).toBeDefined();
    expect(postResponse.status).toBe(201);

    const putResponse: Response = await handle(
      new Request("https://test.com/controller", { method: "PUT" }),
    );

    expect(putResponse).toBeDefined();
    expect(putResponse.status).toBe(204);

    getResponse = await handle(new Request("https://test.com/controller/get"));
    expect(getResponse).toBeDefined();
    expect(getResponse.headers.get(cacheHeader)).toBeFalsy();
  });
});
