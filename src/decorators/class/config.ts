import setGlobal from "../../global/utils/setGlobal";
import { routerKey } from "../../keys";

export const Config = ((constructor) => {
  const router = (constructor.prototype["getRouter"] as Function).call(
    constructor.prototype
  );
  setGlobal(routerKey, router);
}) as ClassDecorator;
