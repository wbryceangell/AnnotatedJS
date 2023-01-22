import { controllersKey } from "../keys";
export const controller: (path: string) => ClassDecorator = (path) => {
  return (controller) => {
    const controllers: Array<{ path: string; controller: typeof controller }> =
      Reflect.getOwnMetadata(controllersKey, self) || [];
    controllers.push({ path, controller });
    Reflect.defineMetadata(controllersKey, controllers, self);
  };
};
