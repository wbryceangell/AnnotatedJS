import { deleteKey } from "../../../../keys";
import getMethodDecorator from "../utils/getHttpMethod";

export const Delete = getMethodDecorator(deleteKey);
