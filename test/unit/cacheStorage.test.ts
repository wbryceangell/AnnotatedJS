import { CacheStorage } from "../../src";
import { keys } from "../../src/container/keys";

describe("@CacheStorage", () => {
  const kind = "class";
  const name = "CacheStorage";

  it("adds class to container", () => {
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

  it("allows setting only one cache storage", () => {
    const addInitializer = () => {};
    const metadata = {};
    const container = {};

    CacheStorage(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer,
        metadata,
      },
    );

    expect(() =>
      CacheStorage(container)(
        // @ts-expect-error Class type is too broad for anonymous class
        class {},
        { kind, name, addInitializer, metadata },
      ),
    ).toThrow();
  });
});
