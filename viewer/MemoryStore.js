"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class that stores key/value pairs in memory. */
class MemoryStore {
    constructor() {
        this.store = {};
    }
    get(key) {
        const value = this.store[key] || null;
        return new Promise(resolve => resolve(value));
    }
    set(key, value) {
        this.store[key] = value;
        return new Promise(resolve => resolve());
    }
}
exports.default = MemoryStore;
//# sourceMappingURL=MemoryStore.js.map