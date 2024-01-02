export default ((constructor) => {
  Reflect.defineMetadata(constructor.name, constructor.prototype, globalThis);
}) as ClassDecorator;
