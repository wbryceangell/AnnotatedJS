import { keys } from "../../src/container/keys";
import { CacheStorage } from "../../src/decorators/cache/cacheStorage";
import {
  itAddsClassInstanceToContainerOnInit,
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
  itCreatesClassInstanceInInitHook,
  itHasInitializationHook,
  itSetsInjectablesOnInstance,
} from "./utils";

describe("@CacheStorage", () => {
  const name = "CacheStorage";

  itAddsClassToContainer(name, CacheStorage, keys.cacheStorageClass);
  itAddsClassToContainerOnlyOnce(name, CacheStorage);
  itHasInitializationHook(name, CacheStorage({}));
  itCreatesClassInstanceInInitHook(name, CacheStorage({}));
  itAddsClassInstanceToContainerOnInit(name, CacheStorage, keys.cacheStorage);

  const container = {};
  itSetsInjectablesOnInstance(name, CacheStorage(container), container);
});