/* eslint-disable @typescript-eslint/no-unused-vars */

import { CacheStorage } from "../../src";

describe("Cache", () => {
  it("cache storage errors with invalid container", () => {
    expect(() => {
      // @ts-expect-error testing invalid container
      @CacheStorage(null)
      class TestCacheStorage {}
    }).toThrow();
  });
});
