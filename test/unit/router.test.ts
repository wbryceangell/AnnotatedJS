import { Router } from "../../src";
import { keys } from "../../src/container/keys";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
  itDoesNotAddClassInstanceBeforeInit,
} from "./utils";

describe("@Router", () => {
  const name = "Router";

  itAddsClassToContainer(name, Router, keys.routerClass);
  itAddsClassToContainerOnlyOnce(name, Router);
  itHasInitializationHook(name, Router({}));
  itCreatesClassInstanceInInitHook(name, Router);
  itAddsClassInstanceToContainerOnInit(name, Router, name);

  const container = {};
  itSetsInjectablesOnInstance(name, Router(container), container);

  itDoesNotAddClassInstanceBeforeInit(name, Router, keys.router);
});
