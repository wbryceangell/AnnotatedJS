import R from "ramda";
import { keys } from "../../src/container/keys";
import { MetadataProperties } from "../../src/decorators/controller/metadataProperties";
import { Controller } from "../../src/index";
import {
  initializerFor,
  itAddsClassToArrayInContainer,
  itCreatesClassInstanceInInitHook,
  itExpectsAValidContainer,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
  itThrowsErrorIfNotUsedOnAClass,
} from "./utils/classDecorators";

describe("@Controller", () => {
  const name = "Controller";
  const path = "path";
  const methodPath = "method";
  const controllerWithPath = R.curryN(2, Controller)(path);

  itExpectsAValidContainer(controllerWithPath);
  itThrowsErrorIfNotUsedOnAClass(controllerWithPath);
  itAddsClassToArrayInContainer(controllerWithPath, keys.controllerClasses);
  itHasInitializationHook(controllerWithPath);
  itCreatesClassInstanceInInitHook(controllerWithPath);

  const container = { [keys.router]: {} };
  itSetsInjectablesOnInstance(name, Controller(path, container), container);

  it("configures router with annotated methods", () => {
    const get = jest.fn();
    const handler = () => {};
    class ControllerClass {}

    Controller(path, { [keys.router]: { get } })(class {}, {
      kind: "class",
      name,
      addInitializer: initializerFor(ControllerClass),
      metadata: {
        [MetadataProperties.methods]: [
          { path: methodPath, httpMethod: "Get", getHandler: () => handler },
        ],
      },
    });

    expect(get).toHaveBeenCalledWith(`/${path}/${methodPath}`, handler);
  });
});
