export default <T>(key: any, target: any): Array<T> => {
  return Reflect.getOwnMetadata(key, target) || [];
};
