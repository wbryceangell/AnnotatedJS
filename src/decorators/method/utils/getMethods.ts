export default (
  key: any,
  target: any
): Array<{ path: string; property: string | symbol }> => {
  return Reflect.getOwnMetadata(key, target) || [];
};
