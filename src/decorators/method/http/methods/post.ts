import { postKey } from "../../../keys";
import getMethodDecorator from "../utils/getHttpMethod";

export const Post = getMethodDecorator(postKey);
