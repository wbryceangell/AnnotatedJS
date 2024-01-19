import { InjectableMetadata } from "./types";
import { getMetadata } from "./utils/getMetadata";
import { getMetadataProperty } from "./utils/getMetadataProperty";
import { validateKind } from "./utils/validateKind";

export const Inject =
  <T, K>(key: FunctionConstructor | string) =>
  (
    target: ClassAccessorDecoratorTarget<T, K>,
    context: ClassAccessorDecoratorContext
  ) => {
    const annotationName = `@${Inject.name}`;
    validateKind(annotationName, context, "accessor");

    const metadata = getMetadata(annotationName, context);
    const injectables = <Array<InjectableMetadata>>(
      getMetadataProperty(metadata, "injectables", [])
    );
		
    injectables.push({
      target: context.name.toString(),
      key: key instanceof Function ? key.name : key,
      set: context.access.set,
    });
  };
