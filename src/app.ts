import LocalStorageStore from "./LocalStorageStore.js";
import ServiceWorkerCacher from "./ServiceWorkerCacher.js";
import IFrameNavigator from "./IFrameNavigator.js";
import PublisherFont from "./PublisherFont.js";
import SerifFont from "./SerifFont.js";
import SansFont from "./SansFont.js";
import DayTheme from "./DayTheme.js";
import SepiaTheme from "./SepiaTheme.js";
import NightTheme from "./NightTheme.js";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView.js";
import ScrollingBookView from "./ScrollingBookView.js";
import BookSettings from "./BookSettings.js";
import LocalAnnotator from "./LocalAnnotator.js";

const app = async (
  element: HTMLElement,
  manifestUrl: URL
): Promise<IFrameNavigator> => {
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
  const settings = await BookSettings.create({
    store: settingsStore,
    bookFonts: [publisher, serif, sans],
    fontSizesInPixels: fontSizes,
    defaultFontSizeInPixels: 20,
    bookThemes: [day, sepia, night],
    bookViews: [paginator, scroller],
  });
  return await IFrameNavigator.create({
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
    scroller,
  });
};

export default app;
