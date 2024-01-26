import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { MetadataProperties as injectMetadataProperties } from "../../src/decorators/inject/metadataProperties";
import { Controller } from "../../src/index";

describe("Controller", () => {
  it("creates an instance of the controller class", () => {
    const spy = jest.fn();

    Controller("path", { Router: {} })(
      class {
        constructor() {
          spy();
        }
      },
      {
        kind: "class",
        name: "Controller",
        addInitializer: () => {},
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalled();
  });

  it("has an initialization hook", () => {
    const spy = jest.fn();

    Controller("path", { Router: {} })(class {}, {
      kind: "class",
      name: "Controller",
      addInitializer: spy,
      metadata: {},
    });

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  it("initialization hook to create instance of class", () => {
    const spy = jest.fn();

    class ControllerClass {
      constructor() {
        spy();
      }
    }

    Controller("path", { Router: {} })(ControllerClass, {
      kind: "class",
      name: "Controller",
      addInitializer: jest.fn((initializer: Function) => {
        initializer.call(ControllerClass);
      }),
      metadata: {},
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("sets injectables on class instance", () => {
    const key = "key";
    const value = null;
    const set = jest.fn();
    class ControllerClass {}

    Controller("path", { Router: {}, [key]: value })(class {}, {
      kind: "class",
      name: "Controller",
      addInitializer: (initializer: Function) =>
        initializer.call(ControllerClass),
      metadata: {
        [injectMetadataProperties.injectables]: [{ key, set }],
      },
    });

    expect(set).toHaveBeenCalledWith(expect.any(ControllerClass), value);
  });

  it("configures router with annotated methods", () => {
    const get = jest.fn();
    const controllerPath = "controller";
    const methodPath = "method";
    const handler = () => {};
    const boundFunction = jest.fn();
    const bind = jest.fn(() => boundFunction);
    handler.bind = bind;
    class ControllerClass {}

    Controller(controllerPath, { Router: { get } })(class {}, {
      kind: "class",
      name: "Controller",
      addInitializer: (initializer: Function) =>
        initializer.call(ControllerClass),
      metadata: {
        [MetadataProperties.methods]: [
          { path: methodPath, httpMethod: "Get", handler },
        ],
      },
    });

    expect(get).toHaveBeenCalledWith(
      `/${controllerPath}/${methodPath}`,
      boundFunction
    );
    expect(bind).toHaveBeenCalledWith(expect.any(ControllerClass));
  });
});
