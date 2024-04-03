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
  itThrowsErrorIfNotUsedOnAClass,
} from "./utils/classDecorators";

describe("@CacheStorage", () => {
  const name = "CacheStorage";

  itExpectsAValidContainer(CacheStorage);
  itThrowsErrorIfNotUsedOnAClass(CacheStorage);
  itAddsClassToContainer(CacheStorage, keys.cacheStorageClass);
  itAddsClassToContainerOnlyOnce(CacheStorage);
  itHasInitializationHook(CacheStorage);
  itCreatesClassInstanceInInitHook(CacheStorage);
  itAddsClassInstanceToContainerOnInit(name, CacheStorage, keys.cacheStorage);
  itSetsInjectablesOnInstance(CacheStorage);
});
