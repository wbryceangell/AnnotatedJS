import { setGlobal } from "../../container/utils/setGlobal";
import { setInjectables } from "../inject/setInjectables";
import { Class } from "../types";
import { getMetadata } from "../utils/getMetadata";

export function getInitializer<T extends Class<object>>(
  annotationName: string,
  context: ClassDecoratorContext<T>,
  container: Record<string, unknown>,
): (this: T) => void {
  return function () {
    const datastore = new this();

    const metadata = getMetadata(annotationName, context);
    setInjectables(container, datastore, metadata);

    // @ts-expect-error we need to use object type but it is actually a class
    setGlobal(container, context.name, datastore);
  };
}
