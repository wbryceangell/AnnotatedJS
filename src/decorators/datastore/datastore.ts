import { container as defaultContainer } from "../../container/container";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedDatastore } from "../../interfaces/annotatedDatastore";
import { Class, ClassDecorator } from "../types";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";

export const Datastore = <T>(container = defaultContainer) =>
  ((_constructor, context) => {
    validateContainer(container);

    const annotationName = Datastore.name;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);
  }) as ClassDecorator<Class<AnnotatedDatastore<T>>>;
