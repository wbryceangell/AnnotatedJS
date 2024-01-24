export const getGlobal = <T>(container: Record<string, T>, key: string) => {
  return container[key];
};
