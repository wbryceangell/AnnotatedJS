import { ClassMethodDecorator } from "../../../src/decorators/types";
import { RequestHandler } from "../../../src/interfaces/types";

const requestHandler = (() => {}) as unknown as RequestHandler;
const kind = "method";
const staticValue = false;
const privateValue = false;
const metadata = {};
const addInitializer = () => {};
const access = { has: () => false, get: () => requestHandler };

export const itThrowsErrorWhenCacheNameIsNotAString = (
  name: string,
  getCacheDecorator: (
    cacheName: string,
  ) => ClassMethodDecorator<RequestHandler>,
) =>
  it("throws an error when the cache name is not a string", () => {
    expect(() =>
      // @ts-expect-error testing invalid cache name
      getCacheDecorator(null)(requestHandler, {
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
