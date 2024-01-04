import { patchKey } from "../../../keys";
import getMethodDecorator from "./getHttpMethod";

export const Patch = getMethodDecorator(patchKey);
