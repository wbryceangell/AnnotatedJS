import getGlobal from "../../global/utils/getGlobal";

export const Inject =
  <T, K>(constructor: Function | symbol) =>
  (
    target: ClassAccessorDecoratorTarget<T, K>,
    { access: { set } }: ClassAccessorDecoratorContext
  ) => {
    const key =
      constructor instanceof Function ? constructor.name : constructor;
    const injectable = getGlobal(key);
    if (injectable === undefined)
      throw new Error(`Failed to get global value of ${key.toString()}`);
    set(target, injectable);
  };
