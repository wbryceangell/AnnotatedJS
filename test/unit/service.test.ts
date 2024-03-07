import { keys } from "../../src/container/keys";
import { Service } from "../../src/index";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToArrayInContainer,
  itCreatesClassInstanceInInitHook,
  itExpectsAValidContainer,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
  itThrowsErrorIfNotUsedOnAClass,
  itThrowsWhenUsedOnAnUnnamedClass,
} from "./utils/classDecorators";

describe("@Service", () => {
  const name = "Service";

  itExpectsAValidContainer(Service);
  itThrowsErrorIfNotUsedOnAClass(Service);
  itThrowsWhenUsedOnAnUnnamedClass(Service);
  itAddsClassToArrayInContainer(Service, keys.serviceClasses);
  itHasInitializationHook(Service);
  itCreatesClassInstanceInInitHook(Service);
  itAddsClassInstanceToContainerOnInit(name, Service, name);

  const container = {};
  itSetsInjectablesOnInstance(name, Service(container), container);
});
