import { Cache } from "../../src/decorators/controller/cache/cache";
import { RequestHandler } from "../../src/interfaces/types";

describe("@Cache", () => {
  const requestHandler = (() => {}) as unknown as RequestHandler;
  const name = "Cache";
  const kind = "method";
  const staticValue = false;
  const privateValue = false;
  const metadata = {};
  const addInitializer = () => {};
  const access = { has: () => false, get: () => requestHandler };

  it("throws an error when not used on a class method", () => {
    expect(() =>
      Cache()(requestHandler, {
        // @ts-expect-error checking invalid context kind
        kind: "class",
      }),
    ).toThrow();
  });

  it("throws an error when the cache name is not a string", () => {
    expect(() =>
      // @ts-expect-error testing invalid cache name
      Cache(null)(requestHandler, {
        kind,
        metadata,
        addInitializer,
        name,
        static: staticValue,
        private: privateValue,
        access,
      }),
    ).toThrow();
  });

  it("throws an error when the cache name is an empty string", () => {
    expect(() =>
      Cache("")(requestHandler, {
        kind,
        metadata,
        addInitializer,
        name,
        static: staticValue,
        private: privateValue,
        access,
      }),
    ).toThrow();
  });

  it("throws an error when method is not in metadata", () => {
    expect(() =>
      Cache("cacheName")(requestHandler, {
        kind,
        metadata,
        addInitializer,
        name,
        static: staticValue,
        private: privateValue,
        access,
      }),
    ).toThrow();
  });
});
