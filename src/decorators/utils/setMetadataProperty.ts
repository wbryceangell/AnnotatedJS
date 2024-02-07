export const setMetadataProperty = (
  metadata: DecoratorMetadataObject,
  key: string,
  value: unknown,
) => {
  metadata[key] = value;
};
