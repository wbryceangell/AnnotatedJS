import { keys } from "../keys";

export const isInitializing = (container: Record<string, boolean>) => {
  return Boolean(container[keys.initializing]);
};
