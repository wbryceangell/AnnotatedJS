import { keys } from "../../src/container/keys";
import { Cache } from "../../src/decorators/controller/cache/cache";
import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { HttpMethodMetadata } from "../../src/decorators/types";
import { RequestHandler } from "../../src/interfaces/types";
import { itThrowsErrorWhenCacheNameIsNotAString } from "./utils/cacheMethods";
import { itThrowsErrorIfNotAClassMethod } from "./utils/methodDecorators";

describe("@Cache", () => {
  const requestHandler = (() => {}) as unknown as RequestHandler;
  const name = "Cache";
  const cacheName = "cacheName";
  const kind = "method";
  const staticValue = false;
  const privateValue = false;
  const metadata = {};
  const addInitializer = () => {};
  const access = { has: () => false, get: () => requestHandler };

  itThrowsErrorIfNotAClassMethod(Cache(cacheName));
  itThrowsErrorWhenCacheNameIsNotAString(name, Cache);

  it("throws an error when the cache name is an empty string", () => {
    expect(() =>
      Cache("")(requestHandler, {
        kind,
        metadata,
        addInitializer,
        name,
        static: staticValue,
        private: privateValue,
        access,
      }),
    ).toThrow();
  });

  it("throws an error when method is not in metadata", () => {
    expect(() =>
      Cache(cacheName)(requestHandler, {
        kind,
        metadata,
        addInitializer,
        name,
        static: staticValue,
        private: privateValue,
        access,
      }),
    ).toThrow();
  });

  it("adds cache handler to controller metadata that caches response", async () => {
    const expectedResponse = new Response();
    const handler = jest.fn(async () => expectedResponse);
    const methodName = "methodName";
    const methodMetadata: HttpMethodMetadata = {
      methodName,
      path: "",
      httpMethod: "",
      getHandler: () => handler,
    };
    const metadata = { [MetadataProperties.methods]: [methodMetadata] };

    Cache(cacheName)(requestHandler, {
      kind,
      metadata,
      addInitializer,
      name: methodName,
      static: staticValue,
      private: privateValue,
      access,
    });

    const put = jest.fn();
    const open = jest.fn(async () => ({
      put,
      match: async () => undefined,
    }));

    const container = { [keys.cacheStorage]: { open } };
    const controller = {};
    const request = new Request("https://test.com");

    await expect(
      methodMetadata.getHandler(container, controller)(request),
    ).resolves.toBe(expectedResponse);

    expect(open).toHaveBeenCalledWith(cacheName);
    expect(handler).toHaveBeenCalledWith(request);
    expect(put).toHaveBeenCalledWith(request, expectedResponse);
  });

  it("adds cache handler to controller metadata that serves cached response", async () => {
    const handler = jest.fn();
    const methodName = "methodName";
    const methodMetadata: HttpMethodMetadata = {
      methodName,
      path: "",
      httpMethod: "",
      getHandler: () => handler,
    };
    const metadata = { [MetadataProperties.methods]: [methodMetadata] };

    Cache(cacheName)(requestHandler, {
      kind,
      metadata,
      addInitializer,
      name: methodName,
      static: staticValue,
      private: privateValue,
      access,
    });

    const expectedResponse = new Response();

    const match = jest.fn(async () => expectedResponse);
    const open = jest.fn(async () => ({
      match,
    }));

    const container = { [keys.cacheStorage]: { open } };
    const controller = {};
    const request = new Request("https://test.com");

    await expect(
      methodMetadata.getHandler(container, controller)(request),
    ).resolves.toBe(expectedResponse);

    expect(open).toHaveBeenCalledWith(cacheName);
    expect(match).toHaveBeenCalledWith(request);
    expect(handler).not.toHaveBeenCalled();
  });
});
