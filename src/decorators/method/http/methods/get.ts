import { getKey } from "../../../keys";
import getMethodDecorator from "../utils/getHttpMethod";

export const Get = getMethodDecorator(getKey);
