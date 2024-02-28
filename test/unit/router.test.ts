import { Router } from "../../src";
import { keys } from "../../src/container/keys";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils/classDecorators";

describe("@Router", () => {
  const name = "Router";

  itAddsClassToContainer(name, Router, keys.routerClass);
  itAddsClassToContainerOnlyOnce(name, Router);
  itHasInitializationHook(name, Router({}));
  itCreatesClassInstanceInInitHook(name, Router({}));
  itAddsClassInstanceToContainerOnInit(name, Router, keys.router);

  const container = {};
  itSetsInjectablesOnInstance(name, Router(container), container);
});
