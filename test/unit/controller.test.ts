import { keys } from "../../src/container/keys";
import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { Controller } from "../../src/index";
import {
  initializerFor,
  itCreatesClassInstanceInInitHook,
  itCreatesInstanceOfClass,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils";

describe("@Controller", () => {
  const name = "Controller";
  const path = "path";

  itCreatesInstanceOfClass(name, Controller(path, {}));
  itHasInitializationHook(name, Controller(path, {}));
  itCreatesClassInstanceInInitHook(
    name,
    Controller(path, { [keys.router]: {} })
  );

  let container = { [keys.router]: {} };
  itSetsInjectablesOnInstance(name, Controller(path, container), container);

  it("configures router with annotated methods", () => {
    const get = jest.fn();
    const controllerPath = "controller";
    const methodPath = "method";
    const handler = () => {};
    const boundFunction = jest.fn();
    const bind = jest.fn(() => boundFunction);
    handler.bind = bind;
    class ControllerClass {}

    Controller(controllerPath, { [keys.router]: { get } })(class {}, {
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
      `/${controllerPath}/${methodPath}`,
      boundFunction
    );
    expect(bind).toHaveBeenCalledWith(expect.any(ControllerClass));
  });
});
