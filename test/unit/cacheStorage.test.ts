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
  itAddsClassToContainer(name, CacheStorage, keys.cacheStorageClass);
  itAddsClassToContainerOnlyOnce(name, CacheStorage);
  itHasInitializationHook(CacheStorage);
  itCreatesClassInstanceInInitHook(name, CacheStorage({}));
  itAddsClassInstanceToContainerOnInit(name, CacheStorage, keys.cacheStorage);

  const container = {};
  itSetsInjectablesOnInstance(name, CacheStorage(container), container);
});
