import { keys } from "../../src/container/keys";
import { Service } from "../../src/index";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToArrayInContainer,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils";

describe("@Service", () => {
  const kind = "class";
  const name = "Service";

  itAddsClassToArrayInContainer(name, Service, keys.serviceClasses);
  itHasInitializationHook(name, Service({}));
  itCreatesClassInstanceInInitHook(name, Service({}));
  itAddsClassInstanceToContainerOnInit(name, Service, name);

  const container = {};
  itSetsInjectablesOnInstance(name, Service(container), container);

  it("errors if context name is undefined", () => {
    expect(() =>
      Service({})(class {}, {
        kind,
        name: undefined,
        addInitializer: () => {},
        metadata: {},
      }),
    ).toThrow();
  });
});
