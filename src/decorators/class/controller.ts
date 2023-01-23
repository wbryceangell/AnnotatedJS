import { controllersKey } from "../keys";
export type Controller = { path: string; constructor: Function };
export const Controller: (path: string) => ClassDecorator = (path) => {
  return (constructor) => {
    const controllers: Array<Controller> =
      Reflect.getOwnMetadata(controllersKey, self) || [];
    controllers.push({ path, constructor });
    Reflect.defineMetadata(controllersKey, controllers, self);
  };
};
