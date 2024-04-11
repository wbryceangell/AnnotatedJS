/* eslint-disable @typescript-eslint/no-unused-vars */

import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { getGlobal } from "../../container/utils/getGlobal";
import { validateContainer } from "../../container/utils/validateContainer";
import { Class, ClassDecorator } from "../types";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";

export const RequestScope = <T extends Class<object>>(
  container: Record<string, Array<T>> = defaultContainer,
) =>
  ((_constructor, context) => {
    validateContainer(container);

    const annotationName = `@${RequestScope.name}`;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);

    const configClasses = getGlobal(container, keys.configClasses);
    if (
      !Array.isArray(configClasses) ||
      !configClasses.find((config) => config.name === context.name)
    ) {
      throw new Error(
        `${annotationName} must be used on an existing configuration class`,
      );
    }

    context.addInitializer(function () {});
  }) as ClassDecorator<T>;
