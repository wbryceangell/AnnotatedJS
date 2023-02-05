import { deleteKey } from "../../../keys.js";
import getMethodDecorator from "../utils/getHttpMethod.js";

export const Delete = getMethodDecorator(deleteKey);
