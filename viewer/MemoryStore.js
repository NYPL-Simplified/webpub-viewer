/** Class that stores key/value pairs in memory. */
export default class MemoryStore {
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
//# sourceMappingURL=MemoryStore.js.map