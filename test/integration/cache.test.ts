/* eslint-disable @typescript-eslint/no-unused-vars */

import { CacheStorage } from "../../src";

describe("Cache", () => {
  it("errors when @CacheStorage is used with invalid container", () => {
    expect(() => {
      // @ts-expect-error testing invalid container
      @CacheStorage(null)
      class TestCacheStorage {}
    }).toThrow();
  });

  it("error when @CacheStorage is used on something other than a class", () => {
    expect(() => {
      class TestClass {
        // @ts-expect-error using on something other than a class
        @CacheStorage({})
        notClass() {}
      }
    }).toThrow();
  });
});
