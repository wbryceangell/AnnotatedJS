import { CacheStorage } from "../../src";
import { keys } from "../../src/container/keys";

describe("@CacheStorage", () => {
  it("adds class to container", () => {
    const kind = "class";
    const name = "CacheStorage";
    const container = {};

    CacheStorage(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: () => {},
        metadata: {},
      },
    );

    expect(container[keys.cacheStorageClass]).toBeDefined();
  });
});
