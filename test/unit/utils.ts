import { Class } from "../../src/decorators/types";

export const itCreatesInstanceOfClass = <T extends Class<object>>(
  name: string,
  classDecorator: (constructor: T, context: ClassDecoratorContext<T>) => void
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
