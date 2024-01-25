import { Controller } from "../../src/index";

describe("Controller", () => {
  it("creates an instance of a class", () => {
    const container = { Router: {} };
    const spy = jest.fn();

    Controller("path", container)(
      class {
        constructor() {
          spy();
        }
      },
      {
        kind: "class",
        name: "Controller",
        addInitializer: () => {},
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalled();
  });
});
