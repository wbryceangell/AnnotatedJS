export const getMetadata = (
  annotationName: string,
  context: ClassDecoratorContext | ClassMemberDecoratorContext
) => {
  const { metadata } = context;
  if (!metadata) {
    throw new Error(
      `${annotationName} failed to access metadata. You may need to try compiling your code using the latest proposal for decorators`
    );
  }
  return metadata;
};
