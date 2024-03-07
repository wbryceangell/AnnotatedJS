import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedDatastore } from "../../interfaces/annotatedDatastore";
import { setInjectables } from "../inject/setInjectables";
import { Class, ClassDecorator } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { getMetadata } from "../utils/getMetadata";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";

export const Datastore = <T>(container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = Datastore.name;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);

    context.addInitializer(function () {
      const datastore = new this();

      const metadata = getMetadata(annotationName, context);
      setInjectables(container, datastore, metadata);
    });

    addClassToContainer(container, keys.datastoreClasses, constructor);
  }) as ClassDecorator<Class<AnnotatedDatastore<T>>>;
