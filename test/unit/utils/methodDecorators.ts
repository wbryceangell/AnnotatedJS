import { ClassMethodDecorator } from "../../../src/decorators/types";

export const itThrowsErrorIfNotAClassMethod = <T>(
  methodDecorator: ClassMethodDecorator<() => T>,
) =>
  it("throws an error when not used on a class method", () => {
    expect(() =>
      methodDecorator((() => {}) as () => T, {
        // @ts-expect-error checking invalid context kind
        kind: "class",
      }),
    ).toThrow();
  });
