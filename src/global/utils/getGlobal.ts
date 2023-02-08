export default <T>(key: string) => {
  return Reflect.getOwnMetadata(key, self) as T;
};
