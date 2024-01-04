import { deleteKey } from "../../../keys";
import getMethodDecorator from "./getHttpMethod";

export const Delete = getMethodDecorator(deleteKey);
