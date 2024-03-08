import { keys } from "../../container/keys";
import { setGlobal } from "../../container/utils/setGlobal";
import { AnnotatedRouter } from "../../interfaces/annotatedRouter";
import { setInjectables } from "../inject/setInjectables";
import { Class } from "../types";
import { getMetadata } from "../utils/getMetadata";

export function getInitializer(
  annotationName: string,
  context: ClassDecoratorContext<Class<AnnotatedRouter>>,
  container: Record<string, unknown>,
): (this: Class<AnnotatedRouter>) => void {
  return function () {
    const router = new this();
    const metadata = getMetadata(annotationName, context);
    setInjectables(container, router, metadata);
    setGlobal(container, keys.router, router);
  };
}
