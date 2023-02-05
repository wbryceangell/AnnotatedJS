import getMethodDecorator from "../utils/getHttpMethod.js";
import { patchKey } from "../../../keys.js";

export const Patch = getMethodDecorator(patchKey);
