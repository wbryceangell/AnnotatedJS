import { keys } from "../../src/container/keys";
import { Service } from "../../src/index";
import {
  initializerFor,
  itAddsClassToContainer,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils";

describe("@Service", () => {
  const kind = "class";
  const name = "Service";

  itAddsClassToContainer(name, Service, keys.serviceClasses);
  itHasInitializationHook(name, Service({}));
  itCreatesClassInstanceInInitHook(name, Service({}));

  let container = {};
  itSetsInjectablesOnInstance(name, Service(container), container);

  it("sets global value to class instance", () => {
    const container = {};
    const name = "ServiceClass";
    class ServiceClass {}

    Service(container)(class {}, {
      kind,
      name,
      addInitializer: initializerFor(ServiceClass),
      metadata: {},
    });

    expect(container[name]).toStrictEqual(expect.any(ServiceClass));
  });

  it("errors if context name is undefined", () => {
    expect(() =>
      Service({})(class {}, {
        kind,
        name: undefined,
        addInitializer: () => {},
        metadata: {},
      })
    ).toThrow();
  });
});
