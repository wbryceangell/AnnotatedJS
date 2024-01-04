import { postKey } from "../../../keys";
import getMethodDecorator from "./getHttpMethod";

export const Post = getMethodDecorator(postKey);
