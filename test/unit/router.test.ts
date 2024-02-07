import { Router } from "../../src";
import { keys } from "../../src/container/keys";

describe("@Router", () => {
  it("adds class to container", () => {
    const kind = "class";
    const name = "Router";
    class RouterClass {}
    const container = {};

    Router(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      RouterClass,
      {
        kind,
        name,
        addInitializer: () => {},
        metadata: {},
      },
    );

    expect(container[keys.routerClass]).toBeDefined();
  });

  it("allows setting only one router", () => {
    const kind = "class";
    const name = "Router";
    const addInitializer = () => {};
    const metadata = {};
    class RouterClass {}
    const container = {};

    Router(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      RouterClass,
      {
        kind,
        name,
        addInitializer,
        metadata,
      },
    );

    expect(() =>
      Router(container)(
        // @ts-expect-error Class type is too broad for anonymous class
        RouterClass,
        { kind, name, addInitializer, metadata },
      ),
    ).toThrow();
  });
});
