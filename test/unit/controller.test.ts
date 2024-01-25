import { Controller } from "../../src/index";

describe("Controller", () => {
  it("creates an instance of a class", () => {
    const spy = jest.fn();

    Controller("path", { Router: {} })(
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

  it("has an initialization hook", () => {
    const spy = jest.fn();

    Controller("path", { Router: {} })(class {}, {
      kind: "class",
      name: "Controller",
      addInitializer: spy,
      metadata: {},
    });

    expect(spy).toHaveBeenCalled();
  });
});
