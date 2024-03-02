import { container as defaultContainer } from "../../container/container";
import { validateContainer } from "../../container/utils/validateContainer";

export const Datastore =
  (container = defaultContainer) =>
  () => {
    validateContainer(container);
  };
