import { cachesKey } from "../../keys";
import getGlobal from "../utils/getGlobal";

export default () => <CacheStorage>getGlobal(cachesKey);
