require(["LocalStorageStore", "ServiceWorkerCacher", "IFrameNavigator", "PublisherFont", "SerifFont", "SansFont", "DayTheme", "SepiaTheme", "NightTheme", "ColumnsPaginatedBookView", "ScrollingBookView", "LocalAnnotator", "BookSettings"],
    function (LocalStorageStore, ServiceWorkerCacher, IFrameNavigator, PublisherFont, SerifFont, SansFont, DayTheme, SepiaTheme, NightTheme, ColumnsPaginatedBookView, ScrollingBookView, LocalAnnotator, BookSettings) {
      var element = document.getElementById("viewer");
      var webpubManifestUrl = new URL("manifest.json", window.location.href);
      var store = new LocalStorageStore.default({ prefix: webpubManifestUrl.href });
      var cacher = new ServiceWorkerCacher.default({
        store: store,
        manifestUrl: webpubManifestUrl,
        serviceWorkerUrl: new URL("sw.js", window.location.href),
        staticFileUrls: [
          new URL(window.location.href),
          new URL("index.html", window.location.href),
          new URL("main.css", window.location.href),
          new URL("require.js", window.location.href),
          new URL("fetch.js", window.location.href),
          new URL("webpub-viewer.js", window.location.href)
        ]
      });
      var publisher = new PublisherFont.default();
      var serif = new SerifFont.default();
      var sans = new SansFont.default();
      var fontSizes = [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32 ];
      var defaultFontSize = 20;
      var day = new DayTheme.default();
      var sepia = new SepiaTheme.default();
      var night = new NightTheme.default();
      var paginator = new ColumnsPaginatedBookView.default();
      var scroller = new ScrollingBookView.default();
      var annotator = new LocalAnnotator.default({ store: store });
      var settingsStore = new LocalStorageStore.default({ prefix: "webpub-viewer" });
      var upLink = {url: new URL("https://github.com/edrlab/webpub-viewer"), label: "My Library", ariaLabel: "Go back to the Github repository"};
      BookSettings.default.create({
        store: settingsStore,
        bookFonts: [publisher, serif, sans],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: defaultFontSize,
        bookThemes: [day, sepia, night],
        bookViews: [paginator, scroller]
      }).then(function (settings) {
        IFrameNavigator.default.create({
          element: element,
          manifestUrl: webpubManifestUrl,
          store: store,
          cacher: cacher,
          settings: settings,
          annotator: annotator,
          publisher: publisher,
          serif: serif,
          sans: sans,
          day: day,
          sepia: sepia,
          night: night,
          paginator: paginator,
          scroller: scroller,
          upLink: upLink,
          allowFullscreen: true
        });
      });
    });