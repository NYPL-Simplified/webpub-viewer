var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LocalStorageStore from "./LocalStorageStore";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import PublisherFont from "./PublisherFont";
import SerifFont from "./SerifFont";
import SansFont from "./SansFont";
import DayTheme from "./DayTheme";
import SepiaTheme from "./SepiaTheme";
import NightTheme from "./NightTheme";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import BookSettings from "./BookSettings";
import LocalAnnotator from "./LocalAnnotator";
const app = (element, manifestUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const bookStore = new LocalStorageStore({ prefix: manifestUrl.href });
    const cacher = new ServiceWorkerCacher({ store: bookStore, manifestUrl });
    const annotator = new LocalAnnotator({ store: bookStore });
    const publisher = new PublisherFont();
    const serif = new SerifFont();
    const sans = new SansFont();
    const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const day = new DayTheme();
    const sepia = new SepiaTheme();
    const night = new NightTheme();
    const paginator = new ColumnsPaginatedBookView();
    const scroller = new ScrollingBookView();
    const settingsStore = new LocalStorageStore({ prefix: "cassis-reader" });
    const settings = yield BookSettings.create({
        store: settingsStore,
        bookFonts: [publisher, serif, sans],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: 20,
        bookThemes: [day, sepia, night],
        bookViews: [paginator, scroller]
    });
    return yield IFrameNavigator.create({
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
export default app;
//# sourceMappingURL=app.js.map