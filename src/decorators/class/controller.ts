import { controllersKey } from "../../keys";

export const Controller: (path: string) => ClassDecorator =
  (path) => (constructor) => {
    const controllers = getControllers();
    controllers.push({ path, prototype: constructor.prototype });
    Reflect.defineMetadata(controllersKey, controllers, globalThis);
  };

export function getControllers(): Array<{
  path: string;
  prototype: any;
}> {
  return Reflect.getOwnMetadata(controllersKey, globalThis) || [];
}
