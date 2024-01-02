import { container } from "../../../global/container";

export default ((constructor) => {
  Reflect.defineMetadata(constructor.name, constructor.prototype, container);
}) as ClassDecorator;
