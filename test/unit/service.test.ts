import { keys } from "../../src/container/keys";
import { Service } from "../../src/index";
import {
  itAddsClassToArrayInContainer,
  itAddsInjectableToContainerOnInit,
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
  itAddsInjectableToContainerOnInit(name, Service);
  itSetsInjectablesOnInstance(Service);
});
