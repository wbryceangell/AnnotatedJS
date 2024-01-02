import { container } from "../../global/container";

export const Inject = (constructor: Function) =>
  ((target: Object, propertyKey) => {
    const injectable = Reflect.getOwnMetadata(constructor.name, container);
    //@ts-ignore
    target[propertyKey] = injectable;
  }) as PropertyDecorator;
