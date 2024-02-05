import { MetadataProperties } from "../../src/decorators/inject/metadataProperties";
import { Class, ClassDecorator } from "../../src/decorators/types";

export const initializerFor =
  (classDef: Class<unknown>) => (initializer: Function) =>
    initializer.call(classDef);

const kind = "class";

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
        kind,
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
        kind,
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
        kind,
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

export const itSetsInjectablesOnInstance = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>,
  container: object
) =>
  it("sets injectables on class instance", () => {
    const key = "key";
    const value = null;

    container[key] = value;

    const set = jest.fn();
    class ServiceClass {}

    classDecorator(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: initializerFor(ServiceClass),
        metadata: {
          [MetadataProperties.injectables]: [{ key, set }],
        },
      }
    );

    expect(set).toHaveBeenCalledWith(expect.any(ServiceClass), value);
  });

export const itAddsClassToContainer = <T extends Class<object>>(
  name: string,
  getClassDecorator: (
    container: Record<string, Array<Class<unknown>>>
  ) => ClassDecorator<T>,
  key: string
) =>
  it("adds class to container", () => {
    const container = {};

    getClassDecorator(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: () => {},
        metadata: {},
      }
    );

    expect(container[key]).toStrictEqual(
      expect.arrayContaining([expect.anything()])
    );
  });
