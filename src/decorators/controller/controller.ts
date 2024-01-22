import { container as defaultContainer } from "../../global/container";
import { getGlobal } from "../../global/utils/getGlobal";
import { setGlobal } from "../../global/utils/setGlobal";
import { validateContainer } from "../../global/utils/validateContainer";
import { controllersKey } from "../../keys";
import { type ControllerMetadata, type HttpMethodMetadata } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { setInjectables } from "../utils/setInjectables";
import { validateKind } from "../utils/validateKind";

export const Controller =
  (path: string, container = defaultContainer) =>
  (constructor: FunctionConstructor, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Controller.name}`;
    validateKind(annotationName, context, "class");

    if (typeof path !== "string") {
      throw new Error(
        `Invalid Controller path argument ${JSON.stringify(
          path,
        )}. Argument must be a string`,
      );
    }

    if (path.length === 0) {
      throw new Error("Controller path argument is an empty string");
    }

    const metadata = getMetadata(annotationName, context);
    setInjectables(container, constructor, metadata);

    const methods = <Array<HttpMethodMetadata>>(
      getMetadataProperty(metadata, "methods", [])
    );

    const controllerMethodMetadata = methods.map((methodMetadata) => ({
      ...methodMetadata,
      handler: methodMetadata.handler.bind(constructor.prototype),
    }));

    let controllers = getGlobal<ControllerMetadata[]>(
      container,
      controllersKey
    );

    if (!controllers) {
      controllers = [];
    }

    controllers.push({ path, methodMetadata: controllerMethodMetadata });
    setGlobal(container, controllersKey, controllers);
  };
