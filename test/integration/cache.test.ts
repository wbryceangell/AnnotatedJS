/* eslint-disable @typescript-eslint/no-unused-vars */

import { CacheStorage } from "../../src";
import { keys } from "../../src/container/keys";

describe("Cache", () => {
  it("should not have access to cache storage when not initialized", () => {
    const container = {};

    // @ts-expect-error needs to implement interface
    @CacheStorage(container)
    class TestCacheStorage {}

    expect(container[keys.cacheStorage]).not.toBeDefined();
  });

  it("should have access to cache storage when initialized", () => {
    const container = { [keys.initializing]: true };

    // @ts-expect-error needs to implement interface
    @CacheStorage(container)
    class TestCacheStorage {}

    expect(container[keys.cacheStorage]).toBeDefined();
  });
});
