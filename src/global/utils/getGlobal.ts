import { container } from "../container";

export default <T>(key: string) => {
  return Reflect.getOwnMetadata(key, container) as T;
};
