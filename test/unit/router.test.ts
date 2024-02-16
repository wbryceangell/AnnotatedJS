import { Router } from "../../src";
import { keys } from "../../src/container/keys";
import { itAddsClassToContainer } from "./utils";

describe("@Router", () => {
  const name = "Router";

  itAddsClassToContainer(name, Router, keys.routerClass);

  it("allows setting only one router", () => {
    class RouterClass {}
    const container = {};
    const kind = "class";
    const addInitializer = () => {};
    const metadata = {};

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
