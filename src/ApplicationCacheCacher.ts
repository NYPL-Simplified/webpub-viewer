import Cacher from "./Cacher";
import Store from "./Store";
import Manifest from "./Manifest";
import * as HTMLUtilities from "./HTMLUtilities";

const template = (bookCacheUrl: URL) => `
    <div class="cache-status"></div>
    <iframe style="display: none" src="${bookCacheUrl.href}">
    </iframe>
`;

/** Class that caches files using the (deprecated) application cache API. 
    This is necessary until Service Worker support improves.
    
    This class expects the application to have _two_ cache manifest files - 
    one containing the application files (currently index.html, sw.js, fetch.js,
    and webpub-viewer.js), and one containing all the book content. For everything to
    work offline, The html page that loads the application must include the 
    manifest with the application files, and there must _also_ be an html file
    that includes the manifest with the book files. That second html file can be empty
    except for the html tag linking to the manifest, and its location should be used
    as the ApplicationCacheCacher's bookCacheUrl.

    The application files will be automatically downloaded when the page loads, and
    the ApplicationCacheCacher will create an iframe with the bookCacheUrl to start
    the download of book content. Since the book's html files are in the manifest,
    once the cache is ready any of those files will be loaded from the cache.

    There are a couple advantages to breaking up the manifest. When a page with a
    manifest loads, it won't be available until all the entries in the manifest are
    downloaded. With two caches, the application can start and load the first spine
    item before the book cache has been downloaded. In addition, when there's an update
    to the manifest, the application cache has to redownload every file in the cache.
    With two manifests, the book and the app can be updated independently.
    */
export default class ApplicationCacheCacher implements Cacher {
    private readonly store: Store;
    private readonly bookCacheUrl: URL;
    private statusElement: HTMLDivElement;
    private bookCacheElement: HTMLIFrameElement;

    public constructor(store: Store, bookCacheUrl: URL) {
        this.store = store;
        this.bookCacheUrl = bookCacheUrl;
    }

    public async getManifest(manifestUrl: URL): Promise<Manifest> {
        try {
            const response = await window.fetch(manifestUrl.href)
            const manifestJSON = await response.json();
            await this.store.set("manifest", JSON.stringify(manifestJSON));
            return new Manifest(manifestJSON, manifestUrl);
        } catch (err) {
            // We couldn't fetch the response, but there might be a cached version.
            const manifestString = await this.store.get("manifest");
            if (manifestString) {
                const manifestJSON = JSON.parse(manifestString);
                return new Manifest(manifestJSON, manifestUrl);
            } else {
                throw err;
            }
        }
    }

    public renderStatus(element: HTMLElement): Promise<void> {
        element.innerHTML = template(this.bookCacheUrl);
        this.statusElement = HTMLUtilities.findRequiredElement(element, "div[class=cache-status]") as HTMLDivElement;
        this.bookCacheElement = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
        this.updateStatus();

        const mainCache = window.applicationCache;

        mainCache.oncached = this.updateStatus.bind(this);
        mainCache.onchecking = this.updateStatus.bind(this);
        mainCache.ondownloading = this.updateStatus.bind(this);
        mainCache.onerror = this.updateStatus.bind(this);
        mainCache.onnoupdate = this.updateStatus.bind(this);
        mainCache.onupdateready = this.updateStatus.bind(this);

        this.bookCacheElement.addEventListener("load", () => {
            console.log("iframe loading");
            this.updateStatus();

            const bookCache = this.bookCacheElement.contentWindow.applicationCache;

            bookCache.oncached = this.updateStatus.bind(this);
            bookCache.onchecking = this.updateStatus.bind(this);
            bookCache.ondownloading = this.updateStatus.bind(this);
            bookCache.onerror = this.updateStatus.bind(this);
            bookCache.onnoupdate = this.updateStatus.bind(this);
            bookCache.onupdateready = this.updateStatus.bind(this);
        });

        return new Promise<void>(resolve => resolve());
    }

    private updateStatus() {
        let status = "";
        const mainCacheStatus = window.applicationCache.status;
        let bookCacheStatus;
        if (this.bookCacheElement.contentWindow.applicationCache) {
            bookCacheStatus = this.bookCacheElement.contentWindow.applicationCache.status;
        }
        console.log(mainCacheStatus);
        console.log(bookCacheStatus);

        if (bookCacheStatus === window.applicationCache.UPDATEREADY ||
            mainCacheStatus === window.applicationCache.UPDATEREADY) {
            status = "Update available";
        } else if (
            bookCacheStatus === window.applicationCache.DOWNLOADING ||
            mainCacheStatus === window.applicationCache.DOWNLOADING) {
            status = "Downloading for offline use";
        } else if (
            bookCacheStatus === window.applicationCache.UNCACHED ||
            mainCacheStatus === window.applicationCache.UNCACHED ||
            bookCacheStatus === window.applicationCache.OBSOLETE ||
            mainCacheStatus === window.applicationCache.OBSOLETE) {
            status = "Not available offline";
        } else if (
            bookCacheStatus === window.applicationCache.CHECKING ||
            mainCacheStatus === window.applicationCache.CHECKING) {
            status = "Checking for update";
        } else {
            status = "Downloaded for offline use";
        }
        this.statusElement.innerHTML = status;
    }
}