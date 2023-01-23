import getMethods from "./getMethods";

export default (key: string) =>
  (path = "/") =>
    ((target, property) => {
      const methods = getMethods(key, target);
      methods.push({ path, property });
      Reflect.defineMetadata(key, methods, target);
    }) as MethodDecorator;
