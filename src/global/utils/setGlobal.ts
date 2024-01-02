import { container } from "../container";

export default <T>(key: string, value: T) => {
  return Reflect.defineMetadata(key, value, container);
};
