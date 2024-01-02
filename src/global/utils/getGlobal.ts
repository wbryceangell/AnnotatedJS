export default <T>(key: string) => {
  return Reflect.getOwnMetadata(key, globalThis) as T;
};
