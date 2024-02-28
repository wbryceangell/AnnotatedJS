import { keys } from "../../src/container/keys";
import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { Purge } from "../../src/decorators/controller/purge/purge";
import { HttpMethodMetadata } from "../../src/decorators/types";
import { RequestHandler } from "../../src/interfaces/types";
import {
  itThrowsErrorWhenCacheNameIsAnEmptyString,
  itThrowsErrorWhenCacheNameIsNotAString,
  itThrowsErrorWhenMethodMetadataIsMissing,
} from "./utils/cacheMethods";
import { itThrowsErrorIfNotAClassMethod } from "./utils/methodDecorators";

describe("@Purge", () => {
  const name = "Purge";
  const cacheName = "cacheName";

  itThrowsErrorIfNotAClassMethod(Purge(cacheName));
  itThrowsErrorWhenCacheNameIsNotAString(name, Purge);
  itThrowsErrorWhenCacheNameIsAnEmptyString(name, Purge);
  itThrowsErrorWhenMethodMetadataIsMissing(name, Purge);

  it("adds purge handler to controller metadata that does nothing if there is not a cache", async () => {
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
    const requestHandler = (() => {}) as unknown as RequestHandler;

    Purge(cacheName)(requestHandler, {
      kind: "method",
      metadata,
      addInitializer: () => {},
      name: methodName,
      static: false,
      private: false,
      access: { has: () => false, get: () => requestHandler },
    });

    const deleteCache = jest.fn();
    const has = jest.fn(async () => false);

    const container = { [keys.cacheStorage]: { has, delete: deleteCache } };
    const controller = {};
    const request = new Request("https://test.com");

    await expect(
      methodMetadata.getHandler(container, controller)(request),
    ).resolves.toBe(expectedResponse);

    expect(has).toHaveBeenCalledWith(cacheName);
    expect(handler).toHaveBeenCalledWith(request);
    expect(deleteCache).not.toHaveBeenCalled();
  });

  it("adds purge handler to controller metadata that clears cache if it exists", async () => {
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
    const requestHandler = (() => {}) as unknown as RequestHandler;

    Purge(cacheName)(requestHandler, {
      kind: "method",
      metadata,
      addInitializer: () => {},
      name: methodName,
      static: false,
      private: false,
      access: { has: () => false, get: () => requestHandler },
    });

    const deleteCache = jest.fn();
    const has = jest.fn(async () => true);

    const container = { [keys.cacheStorage]: { has, delete: deleteCache } };
    const controller = {};
    const request = new Request("https://test.com");

    await expect(
      methodMetadata.getHandler(container, controller)(request),
    ).resolves.toBe(expectedResponse);

    expect(has).toHaveBeenCalledWith(cacheName);
    expect(handler).toHaveBeenCalledWith(request);
    expect(deleteCache).toHaveBeenCalledWith(cacheName);
  });
});
