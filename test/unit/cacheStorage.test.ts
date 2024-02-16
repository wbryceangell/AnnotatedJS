import { keys } from "../../src/container/keys";
import { CacheStorage } from "../../src/decorators/cache/cacheStorage";
import {
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
} from "./utils";

describe("@CacheStorage", () => {
  const name = "CacheStorage";

  itAddsClassToContainer(name, CacheStorage, keys.cacheStorageClass);
  itAddsClassToContainerOnlyOnce(name, CacheStorage);
});
