/* eslint-disable @typescript-eslint/no-unused-vars */

import { container as defaultContainer } from "../../container/container";
import { validateContainer } from "../../container/utils/validateContainer";
import { Class, ClassDecorator } from "../types";
import { validateKind } from "../utils/validateKind";

export const RequestScope = <T extends Class<object>>(
  container: Record<string, Array<T>> = defaultContainer,
) =>
  ((_constructor, context) => {
    validateContainer(container);

    const annotationName = `@${RequestScope.name}`;
    validateKind(annotationName, context, "class");
  }) as ClassDecorator<T>;
