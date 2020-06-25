var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MemoryStore from "./MemoryStore";
/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
export default class LocalStorageStore {
    constructor(config) {
        this.prefix = config.prefix;
        try {
            // In some browsers (eg iOS Safari in private mode),
            // localStorage exists but throws an exception when
            // you try to write to it.
            const testKey = config.prefix + "-" + String(Math.random());
            window.localStorage.setItem(testKey, "test");
            window.localStorage.removeItem(testKey);
            this.fallbackStore = null;
        }
        catch (e) {
            this.fallbackStore = new MemoryStore();
        }
    }
    getLocalStorageKey(key) {
        return this.prefix + "-" + key;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = null;
            if (!this.fallbackStore) {
                value = window.localStorage.getItem(this.getLocalStorageKey(key));
            }
            else {
                value = yield this.fallbackStore.get(key);
            }
            return new Promise((resolve) => resolve(value));
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fallbackStore) {
                window.localStorage.setItem(this.getLocalStorageKey(key), value);
            }
            else {
                yield this.fallbackStore.set(key, value);
            }
            return new Promise((resolve) => resolve());
        });
    }
}
//# sourceMappingURL=LocalStorageStore.js.map