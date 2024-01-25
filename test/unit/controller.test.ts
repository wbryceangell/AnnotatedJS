import { Controller } from "../../src/index";

describe("Controller", () => {
  it("creates an instance of the controller class", () => {
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

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  it("initialization hook to create instance of class", () => {
    const spy = jest.fn();

    class ControllerClass {
      constructor() {
        spy();
      }
    }

    Controller("path", { Router: {} })(ControllerClass, {
      kind: "class",
      name: "Controller",
      addInitializer: jest.fn((initializer: Function) => {
        initializer.call(ControllerClass);
      }),
      metadata: {},
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
