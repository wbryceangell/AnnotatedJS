import { container } from "../container";

export default <T>(key: string | symbol) => {
  return Reflect.getOwnMetadata(key, container) as T;
};
