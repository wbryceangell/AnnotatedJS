import R from "ramda";
import { keys } from "../../src/container/keys";
import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { Controller, RequestHandler } from "../../src/index";
import {
  initializerFor,
  itAddsClassToArrayInContainer,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils";

describe("@Controller", () => {
  const name = "Controller";
  const path = "path";
  const methodPath = "method";

  itAddsClassToArrayInContainer(
    name,
    R.curryN(2, Controller)(path),
    keys.controllerClasses,
  );
  itHasInitializationHook(name, Controller(path, {}));
  itCreatesClassInstanceInInitHook(
    name,
    Controller(path, { [keys.router]: {} }),
  );

  const container = { [keys.router]: {} };
  itSetsInjectablesOnInstance(name, Controller(path, container), container);

  it("configures router with annotated methods", () => {
    const get = jest.fn();
    const handler = () => {};
    const bind = jest.fn(() => {});
    handler.bind = bind;
    class ControllerClass {}

    Controller(path, { [keys.router]: { get } })(class {}, {
      kind: "class",
      name,
      addInitializer: initializerFor(ControllerClass),
      metadata: {
        [MetadataProperties.methods]: [
          { path: methodPath, httpMethod: "Get", handler },
        ],
      },
    });

    expect(get).toHaveBeenCalledWith(
      `/${path}/${methodPath}`,
      expect.any(Function),
    );
    expect(bind).toHaveBeenCalledWith(expect.any(ControllerClass));
  });

  it("configures router with annotated method and caches the response", async () => {
    const get = jest.fn();
    const put = jest.fn();
    const open = jest.fn(async () => ({
      put,
      match: async () => undefined,
    }));
    class ControllerClass {}
    const cacheName = "cacheName";
    const expectedResponse = new Response();
    const handler = jest.fn(async () => expectedResponse);

    Controller(path, { [keys.router]: { get }, [keys.cacheStorage]: { open } })(
      class {},
      {
        kind: "class",
        name,
        addInitializer: initializerFor(ControllerClass),
        metadata: {
          [MetadataProperties.methods]: [
            {
              path: methodPath,
              httpMethod: "Get",
              handler,
              cacheName,
            },
          ],
        },
      },
    );

    const request = new Request("https://test.com");
    await expect((<RequestHandler>get.mock.lastCall[1])(request)).resolves.toBe(
      expectedResponse,
    );
    expect(open).toHaveBeenCalledWith(cacheName);
    expect(handler).toHaveBeenCalledWith(request);
    expect(put).toHaveBeenCalledWith(request, expectedResponse);
  });

  it("configures router with annotated method and serves cached response", async () => {
    const get = jest.fn();
    class ControllerClass {}
    const cacheName = "cacheName";
    const expectedResponse = new Response();
    const match = jest.fn(async () => expectedResponse);
    const open = jest.fn(async () => ({
      match,
    }));
    const handler = jest.fn();

    Controller(path, { [keys.router]: { get }, [keys.cacheStorage]: { open } })(
      class {},
      {
        kind: "class",
        name,
        addInitializer: initializerFor(ControllerClass),
        metadata: {
          [MetadataProperties.methods]: [
            {
              path: methodPath,
              httpMethod: "Get",
              handler,
              cacheName,
            },
          ],
        },
      },
    );

    const request = new Request("https://test.com");
    await expect((<RequestHandler>get.mock.lastCall[1])(request)).resolves.toBe(
      expectedResponse,
    );
    expect(open).toHaveBeenCalledWith(cacheName);
    expect(match).toHaveBeenCalledWith(request);
    expect(handler).not.toHaveBeenCalled();
  });
});
