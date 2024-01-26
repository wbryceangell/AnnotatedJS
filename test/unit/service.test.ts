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
});
