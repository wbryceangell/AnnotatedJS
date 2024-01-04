import { propertiesKey } from "../../keys";
import { PropertyMetadata } from "../types";

export default (config: Object): Array<PropertyMetadata> => {
  return Reflect.getOwnMetadata(propertiesKey, config) || [];
};
