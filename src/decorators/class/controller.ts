import { controllersKey } from "../keys";

export const Controller: (path: string) => ClassDecorator =
  (path) => (constructor) => {
    const controllers = getControllers();
    controllers.push({ path, constructor });
    Reflect.defineMetadata(controllersKey, controllers, self);
  };

export function getControllers(): Array<{
  path: string;
  constructor: Function;
}> {
  return Reflect.getOwnMetadata(controllersKey, self) || [];
}
