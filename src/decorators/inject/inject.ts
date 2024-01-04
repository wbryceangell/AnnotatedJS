import getGlobal from "../../global/utils/getGlobal";

export const Inject = (constructor: Function | symbol) =>
  ((target: Object, propertyKey) => {
    const key =
      constructor instanceof Function ? constructor.name : constructor;
    const injectable = getGlobal(key);
    //@ts-ignore
    target[propertyKey] = injectable;
  }) as PropertyDecorator;
