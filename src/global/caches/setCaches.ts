import { cachesKey } from "../../keys";
import setGlobal from "../utils/setGlobal";

export default (caches: CacheStorage) => setGlobal(cachesKey, caches);
