import { Class, ClassDecorator } from "../../src/decorators/types";

export const initializerFor =
  (classDef: Class<unknown>) => (initializer: Function) =>
    initializer.call(classDef);

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

export const itCreatesClassInstanceInInitHook = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>
) =>
  it("initialization hook to create instance of class", () => {
    const spy = jest.fn();

    classDecorator(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind: "class",
        name,
        addInitializer: jest.fn(
          initializerFor(
            class {
              constructor() {
                spy();
              }
            }
          )
        ),
        metadata: {},
      }
    );

    expect(spy).toHaveBeenCalled();
  });
