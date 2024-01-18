import setGlobal from "../../global/utils/setGlobal";

export default ((constructor: Function, {}: ClassDecoratorContext) => {
  setGlobal(constructor.name, constructor.prototype);
}) as ClassDecorator;
