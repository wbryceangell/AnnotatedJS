import { patchKey } from "../../../../keys";
import getMethodDecorator from "../utils/getHttpMethod";

export const Patch = getMethodDecorator(patchKey);
