import { InjectableMetadata } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { setMetadataProperty } from "../utils/setMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

export const Inject =
  <T, K>(key: NewableFunction | string) =>
  (
    target: ClassAccessorDecoratorTarget<T, K>,
    context: ClassAccessorDecoratorContext,
  ) => {
    const annotationName = `@${Inject.name}`;
    validateKind(annotationName, context, "accessor");

    const metadata = getMetadata(annotationName, context);
    const injectables = <Array<InjectableMetadata>>(
      getMetadataProperty(metadata, MetadataProperties.injectables, [])
    );

    injectables.push({
      key: key instanceof Function ? key.name : key,
      set: context.access.set,
    });

    setMetadataProperty(metadata, MetadataProperties.injectables, injectables);
  };
