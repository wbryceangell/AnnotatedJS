import { keys } from "../../src/container/keys";
import { CacheStorage } from "../../src/decorators/cacheStorage/cacheStorage";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
  itCreatesClassInstanceInInitHook,
  itExpectsAValidContainer,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils/classDecorators";

describe("@CacheStorage", () => {
  const name = "CacheStorage";

  itExpectsAValidContainer(CacheStorage);
  itAddsClassToContainer(name, CacheStorage, keys.cacheStorageClass);
  itAddsClassToContainerOnlyOnce(name, CacheStorage);
  itHasInitializationHook(name, CacheStorage({}));
  itCreatesClassInstanceInInitHook(name, CacheStorage({}));
  itAddsClassInstanceToContainerOnInit(name, CacheStorage, keys.cacheStorage);

  const container = {};
  itSetsInjectablesOnInstance(name, CacheStorage(container), container);
});
