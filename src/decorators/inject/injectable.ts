import setGlobal from "../../global/utils/setGlobal";

export default ((constructor) => {
  setGlobal(constructor.name, constructor.prototype);
}) as ClassDecorator;
