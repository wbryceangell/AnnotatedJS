import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedDatastore } from "../../interfaces/annotatedDatastore";
import { Class, ClassDecorator } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";
import { getInitializer } from "./getInitializer";

export const Datastore = <T>(container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = Datastore.name;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);

    context.addInitializer(getInitializer(annotationName, context, container));

    addClassToContainer(container, keys.datastoreClasses, constructor);
  }) as ClassDecorator<Class<AnnotatedDatastore<T>>>;
