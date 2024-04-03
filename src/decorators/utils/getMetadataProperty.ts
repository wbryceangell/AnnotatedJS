export const getMetadataProperty = <T>(
  metadata: DecoratorMetadataObject,
  property: string,
  defaultValue: T,
) => {
  return <T>metadata[property] || defaultValue;
};
