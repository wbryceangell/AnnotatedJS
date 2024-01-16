import { container } from "../../global/container";
import { controllersKey } from "../../keys";

export const Controller: (path: string) => ClassDecorator =
  (path) => (constructor) => {
    if (typeof path !== "string")
      throw new Error(
        `Invalid Controller path argument ${JSON.stringify(
          path
        )}. Argument must be a string`
      );
    if (path.length === 0)
      throw new Error("Controller path argument is an empty string");
    const controllers = getControllers();
    controllers.push({ path, prototype: constructor.prototype });
    Reflect.defineMetadata(controllersKey, controllers, container);
  };

export function getControllers(): Array<{
  path: string;
  prototype: any;
}> {
  return Reflect.getOwnMetadata(controllersKey, container) || [];
}
