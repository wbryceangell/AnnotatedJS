export const validateKind = (
  annotationName: string,
  context: ClassDecoratorContext | ClassMemberDecoratorContext,
  expectedKind: string
) => {
  if (!context?.kind || context.kind !== expectedKind) {
    throw new Error(`${annotationName} must be used on a ${expectedKind}`);
  }
};
