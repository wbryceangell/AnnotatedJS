export const validateName = (
  annotationName: string,
  context: ClassDecoratorContext,
) => {
  if (typeof context.name !== "string") {
    throw new Error(`${annotationName} must be used on a named class`);
  }
};
