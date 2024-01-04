import { getKey } from "../../../keys";
import getMethodDecorator from "./getHttpMethod";

export const Get = getMethodDecorator(getKey);
