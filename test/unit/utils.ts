import { MetadataProperties } from "../../src/decorators/inject/metadataProperties";
import { Class, ClassDecorator } from "../../src/decorators/types";
import {keys} from "../../src/container/keys";

export const initializerFor =
  (classDef: Class<unknown>) => (initializer: () => void) =>
    initializer.call(classDef);

const kind = "class";
class ExampleClass {}

export const itCreatesInstanceOfClass = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>,
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
      },
    );

    expect(spy).toHaveBeenCalled();
  });

export const itHasInitializationHook = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>,
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
      },
    );

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  export const itDoesNotCreateClassIntanceBeforeInit = <T extends Class<object>>(
    name: string,
    getClassDecorator: (container: Record<string, any>) => ClassDecorator<T>,
    prefilledContainer?: Record<string, any>
  ) =>
    it("does not create class instance before initialization", () => {
      const spy = jest.fn();
  
      getClassDecorator(Object.assign({}, prefilledContainer, {[keys.initializing]: false}))(
        // @ts-expect-error Class type is too broad for anonymous class
        class {},
        {
          kind,
          name,
          addInitializer: initializerFor(
              class {
                constructor() {
                  spy();
                }
              },
            ),
          metadata: {},
        },
      );
  
      expect(spy).not.toHaveBeenCalled();
    });

export const itCreatesClassInstanceInInitHook = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, any>) => ClassDecorator<T>,
  prefilledContainer?: Record<string, any>
) =>
  it("initialization hook to create instance of class", () => {
    const spy = jest.fn();

    getClassDecorator(Object.assign({}, prefilledContainer, {[keys.initializing]: true}))(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: initializerFor(
            class {
              constructor() {
                spy();
              }
            },
          ),
        metadata: {},
      },
    );

    expect(spy).toHaveBeenCalled();
  });

export const itDoesNotSetInjectablesBeforeInit = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, any>) => ClassDecorator<T>,
  prefilledContainer?: Record<string, any>
) =>
  it("does not set injectables before initialization", () => {
    const set = jest.fn();
    class ExampleClass {}

    getClassDecorator(Object.assign({}, prefilledContainer, {[keys.initializing]: false}))(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: initializerFor(ExampleClass),
        metadata: {
          [MetadataProperties.injectables]: [{ key: "key", set }],
        },
      },
    );

    expect(set).not.toHaveBeenCalled();
  });

export const itSetsInjectablesOnInstance = <T extends Class<object>>(
  name: string,
  classDecorator: ClassDecorator<T>,
  container: object,
) =>
  it("sets injectables on class instance", () => {
    console.log("it sets injectable");
    const key = "key";
    const value = null;

    container[key] = value;
    container[keys.initializing] = true;

    const set = jest.fn();
    class ExampleClass {}

    classDecorator(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: initializerFor(ExampleClass),
        metadata: {
          [MetadataProperties.injectables]: [{ key, set }],
        },
      },
    );

    expect(set).toHaveBeenCalledWith(expect.any(ExampleClass), value);
  });

export const itAddsClassToArrayInContainer = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, Array<T>>) => ClassDecorator<T>,
  key: string,
) =>
  it("adds class to array in container", () => {
    const container = {};

    getClassDecorator(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      class {},
      {
        kind,
        name,
        addInitializer: () => {},
        metadata: {},
      },
    );

    expect(container[key]).toStrictEqual(
      expect.arrayContaining([expect.anything()]),
    );
  });

export const itAddsClassToContainer = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, Array<T>>) => ClassDecorator<T>,
  key: string,
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
      },
    );

    expect(container[key]).toBeDefined();
  });

export const itAddsClassToContainerOnlyOnce = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, Array<T>>) => ClassDecorator<T>,
) =>
  it("adds class to container only once", () => {
    const container = {};
    const addInitializer = () => {};
    const metadata = {};

    getClassDecorator(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      ExampleClass,
      {
        kind,
        name,
        addInitializer,
        metadata,
      },
    );

    expect(() =>
      getClassDecorator(container)(
        // @ts-expect-error Class type is too broad for anonymous class
        ExampleClass,
        { kind, name, addInitializer, metadata },
      ),
    ).toThrow();
  });

export const itAddsClassInstanceToContainerOnInit = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, unknown>) => ClassDecorator<T>,
  key: string,
) =>
  it("adds class instance to container when initialized", () => {
    console.log("addsclassinstancetoconainteroninit: \n   ")
    const container = {[keys.initializing]: true};

    getClassDecorator(container)(
      // @ts-expect-error Class type is too broad for anonymous class
      ExampleClass,
      {
        kind,
        name,
        addInitializer: initializerFor(ExampleClass),
        metadata: {},

      },
    );

    expect(container[key]).toStrictEqual(expect.any(ExampleClass));
  });

export const itDoesNotAddClassInstanceBeforeInit = <T extends Class<object>>(
  name: string,
  getClassDecorator: (container: Record<string, unknown>) => ClassDecorator<T>,
  key: string,
) =>   it("does not add class instance to container before initialization", () => {
  const container = {};

  getClassDecorator(container)(
    // @ts-expect-error Class type is too broad for anonymous class
    class {}, {
    kind,
    name,
    addInitializer: initializerFor(class {}),
    metadata: {},
  });

  expect(container[key]).not.toBeDefined();
});

