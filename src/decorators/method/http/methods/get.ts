import { getKey } from "../../../keys.js";
import getMethodDecorator from "../utils/getHttpMethod.js";

export const Get = getMethodDecorator(getKey);
