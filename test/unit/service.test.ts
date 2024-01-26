import { MetadataProperties } from "../../src/decorators/inject/metadataProperties";
import { Service } from "../../src/index";

describe("Service", () => {
  it("creates an instance of the service class", () => {
    const spy = jest.fn();

    Service({ Router: {} })(
      class {
        constructor() {
          spy();
        }
      },
      {
        kind: "class",
        name: "Service",
        addInitializer: () => {},
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalled();
  });

  it("has an initialization hook", () => {
    const spy = jest.fn();

    Service({ Router: {} })(class {}, {
      kind: "class",
      name: "Service",
      addInitializer: spy,
      metadata: {},
    });

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  it("initialization hook creates an instance of the class", () => {
    const spy = jest.fn();

    Service({ Router: {} })(class {}, {
      kind: "class",
      name: "Service",
      addInitializer: jest.fn((initializer: Function) => {
        initializer.call(
          class {
            constructor() {
              spy();
            }
          }
        );
      }),
      metadata: {},
    });

    expect(spy).toHaveBeenCalled();
  });

  it("sets injectables on class instance", () => {
    const key = "key";
    const value = null;
    const set = jest.fn();
    class ServiceClass {}

    Service({ Router: {}, [key]: value })(class {}, {
      kind: "class",
      name: "Controller",
      addInitializer: (initializer: Function) => initializer.call(ServiceClass),
      metadata: {
        [MetadataProperties.injectables]: [{ key, set }],
      },
    });

    expect(set).toHaveBeenCalledWith(expect.any(ServiceClass), value);
  });
});
