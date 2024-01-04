import { container } from "../container";

export default <T>(key: string | symbol, value: T) => {
  return Reflect.defineMetadata(key, value, container);
};
