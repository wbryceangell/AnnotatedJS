import { getGlobal } from "../../container/utils/getGlobal";
import { setGlobal } from "../../container/utils/setGlobal";
import { Class } from "../types";

export const addClassToContainer = (
  container: Record<string, Array<Class<unknown>>>,
  key: string,
  constructor: Class<unknown>
) => {
  let containerClasses = getGlobal(container, key);

  if (!Array.isArray(containerClasses)) {
    containerClasses = [];
    setGlobal(container, key, containerClasses);
  }

  containerClasses.push(constructor);
};
