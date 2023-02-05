import getMethodDecorator from "../utils/getHttpMethod.js";
import { putKey } from "../../../keys.js";

export const Put = getMethodDecorator(putKey);
