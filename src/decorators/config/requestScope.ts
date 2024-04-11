/* eslint-disable @typescript-eslint/no-unused-vars */

import { container as defaultContainer } from "../../container/container";
import { validateContainer } from "../../container/utils/validateContainer";
import { Class, ClassDecorator } from "../types";

export const RequestScope = <T extends Class<object>>(
  container: Record<string, Array<T>> = defaultContainer,
) =>
  ((_constructor, _context) => {
    validateContainer(container);
  }) as ClassDecorator<T>;
