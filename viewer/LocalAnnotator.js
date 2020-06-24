var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** Annotator that stores annotations locally, in the browser. */
export default class LocalAnnotator {
    constructor(config) {
        this.store = config.store;
    }
    getLastReadingPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            const positionString = yield this.store.get(LocalAnnotator.LAST_READING_POSITION);
            if (positionString) {
                const position = JSON.parse(positionString);
                return new Promise(resolve => resolve(position));
            }
            return new Promise(resolve => resolve());
        });
    }
    saveLastReadingPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const positionString = JSON.stringify(position);
            yield this.store.set(LocalAnnotator.LAST_READING_POSITION, positionString);
            return new Promise(resolve => resolve());
        });
    }
}
LocalAnnotator.LAST_READING_POSITION = "last-reading-position";
//# sourceMappingURL=LocalAnnotator.js.map