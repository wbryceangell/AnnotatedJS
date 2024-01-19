import { container as defaultContainer } from "../global/container";
import { setGlobal } from "../global/utils/setGlobal";
import { validateContainer } from "../global/utils/validateContainer";
import { validateKind } from "./utils/validateKind";

export const Component =
  (container = defaultContainer) =>
  (constructor: FunctionConstructor, context: ClassDecoratorContext) => {
    validateContainer(container);
    validateKind("@Component", context, "class");
    setGlobal(container, constructor.name, constructor.prototype);
  };
