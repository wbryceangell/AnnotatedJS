import getMethodDecorator from "../utils/getHttpMethod.js";
import { postKey } from "../../../keys.js";

export const Post = getMethodDecorator(postKey);
