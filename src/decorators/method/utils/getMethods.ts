export default (
  key: any,
  target: Object
): Array<{ path: string; property: string | symbol }> => {
  return Reflect.getOwnMetadata(key, target) || [];
};
