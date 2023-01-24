export default ((constructor) => {
  Reflect.defineMetadata(constructor.name, constructor.prototype, self);
}) as ClassDecorator;
