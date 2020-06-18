"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorageStore_1 = __importDefault(require("./LocalStorageStore"));
const ServiceWorkerCacher_1 = __importDefault(require("./ServiceWorkerCacher"));
const IFrameNavigator_1 = __importDefault(require("./IFrameNavigator"));
const PublisherFont_1 = __importDefault(require("./PublisherFont"));
const SerifFont_1 = __importDefault(require("./SerifFont"));
const SansFont_1 = __importDefault(require("./SansFont"));
const DayTheme_1 = __importDefault(require("./DayTheme"));
const SepiaTheme_1 = __importDefault(require("./SepiaTheme"));
const NightTheme_1 = __importDefault(require("./NightTheme"));
const ColumnsPaginatedBookView_1 = __importDefault(require("./ColumnsPaginatedBookView"));
const ScrollingBookView_1 = __importDefault(require("./ScrollingBookView"));
const BookSettings_1 = __importDefault(require("./BookSettings"));
const LocalAnnotator_1 = __importDefault(require("./LocalAnnotator"));
const app = (element, manifestUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const bookStore = new LocalStorageStore_1.default({ prefix: manifestUrl.href });
    const cacher = new ServiceWorkerCacher_1.default({ store: bookStore, manifestUrl });
    const annotator = new LocalAnnotator_1.default({ store: bookStore });
    const publisher = new PublisherFont_1.default();
    const serif = new SerifFont_1.default();
    const sans = new SansFont_1.default();
    const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const day = new DayTheme_1.default();
    const sepia = new SepiaTheme_1.default();
    const night = new NightTheme_1.default();
    const paginator = new ColumnsPaginatedBookView_1.default();
    const scroller = new ScrollingBookView_1.default();
    const settingsStore = new LocalStorageStore_1.default({ prefix: "cassis-reader" });
    const settings = yield BookSettings_1.default.create({
        store: settingsStore,
        bookFonts: [publisher, serif, sans],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: 20,
        bookThemes: [day, sepia, night],
        bookViews: [paginator, scroller]
    });
    return yield IFrameNavigator_1.default.create({
        element,
        manifestUrl,
        store: bookStore,
        cacher,
        settings,
        annotator,
        publisher,
        serif,
        sans,
        day,
        sepia,
        night,
        paginator,
        scroller
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map