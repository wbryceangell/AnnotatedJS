export const validateContainer = (container: object) => {
  if (typeof container !== "object" || container === null) {
    throw new Error("Container must be an object");
  }
};
