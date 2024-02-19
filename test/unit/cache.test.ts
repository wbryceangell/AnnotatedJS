import { Cache } from "../../src/decorators/controller/cache/cache";
import { RequestHandler } from "../../src/interfaces/types";

describe("@Cache", () => {
  const requestHandler = (() => {}) as unknown as RequestHandler;

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
        kind: "method",
        metadata: {},
        addInitializer: () => {},
        name: "Cache",
        static: false,
        private: false,
        access: { has: () => false, get: () => requestHandler },
      }),
    ).toThrow();
  });

  it("throws an error when the cache name is an empty string", () => {
    expect(() =>
      Cache("")(requestHandler, {
        kind: "method",
        metadata: {},
        addInitializer: () => {},
        name: "Cache",
        static: false,
        private: false,
        access: { has: () => false, get: () => requestHandler },
      }),
    ).toThrow();
  });
});
