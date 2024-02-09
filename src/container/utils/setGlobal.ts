export const setGlobal = <T>(
  container: Record<string, T>,
  key: string,
  value: T,
) => {
  if (typeof container[key] !== "undefined") {
    throw new Error(`Global key ${key.toString()} has already been set`);
  }
  container[key] = value;
};
