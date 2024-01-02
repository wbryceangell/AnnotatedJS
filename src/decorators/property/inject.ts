export const Inject = (constructor: Function) =>
  ((target: Object, propertyKey) => {
    const injectable = Reflect.getOwnMetadata(constructor.name, globalThis);
    //@ts-ignore
    target[propertyKey] = injectable;
  }) as PropertyDecorator;
