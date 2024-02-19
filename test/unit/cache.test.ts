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
});
