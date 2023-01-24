export default ((constructor) => {
  //@ts-ignore
  Reflect.defineMetadata(constructor.name, constructor.prototype, self);
}) as ClassDecorator;
