import { Class, ClassDecorator } from "../../src/decorators/types";

export const itCreatesInstanceOfClass = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>
) =>
  it(`creates an instance of the ${name} class`, () => {
    const spy = jest.fn();

    classDecorator(
      // @ts-expect-error Class type is too broad for anonymous class
      class {
        constructor() {
          spy();
        }
      },
      {
        kind: "class",
        name,
        addInitializer: () => {},
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalled();
  });

export const itHasInitializationHook = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>
) =>
  it("has an initialization hook", () => {
    const spy = jest.fn();

    classDecorator(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind: "class",
        name,
        addInitializer: spy,
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });
