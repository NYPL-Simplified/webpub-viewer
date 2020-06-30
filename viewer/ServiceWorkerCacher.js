var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CacheStatus } from "./Cacher";
import Manifest from "./Manifest";
/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
export default class ServiceWorkerCacher {
    /** Create a ServiceWorkerCacher. */
    constructor(config) {
        this.cacheStatus = CacheStatus.Uncached;
        this.statusUpdateCallback = () => { };
        this.serviceWorkerUrl =
            config.serviceWorkerUrl || new URL("sw.js", config.manifestUrl.href);
        this.staticFileUrls = config.staticFileUrls || [];
        this.store = config.store;
        this.manifestUrl = config.manifestUrl;
        const protocol = window.location.protocol;
        this.areServiceWorkersSupported =
            !!navigator.serviceWorker && !!window.caches && protocol === "https:";
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.areServiceWorkersSupported &&
                this.cacheStatus !== CacheStatus.Downloaded) {
                this.cacheStatus = CacheStatus.Downloading;
                this.updateStatus();
                navigator.serviceWorker.register(this.serviceWorkerUrl.href);
                try {
                    yield this.verifyAndCacheManifest(this.manifestUrl);
                    this.cacheStatus = CacheStatus.Downloaded;
                    this.updateStatus();
                }
                catch (err) {
                    this.cacheStatus = CacheStatus.Error;
                    this.updateStatus();
                }
            }
            return new Promise((resolve) => resolve());
        });
    }
    verifyAndCacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield navigator.serviceWorker.ready;
            try {
                // Invoke promises concurrently...
                const urlsToCache = [manifestUrl.href];
                for (const url of this.staticFileUrls) {
                    urlsToCache.push(url.href);
                }
                const promises = [
                    this.cacheManifest(manifestUrl),
                    this.cacheUrls(urlsToCache, manifestUrl),
                ];
                // then wait for all of them to resolve.
                for (const promise of promises) {
                    yield promise;
                }
                return new Promise((resolve) => resolve());
            }
            catch (err) {
                return new Promise((_, reject) => reject(err));
            }
        });
    }
    cacheUrls(urls, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield window.caches.open(manifestUrl.href);
            return cache.addAll(urls.map((url) => new URL(url, manifestUrl.href).href));
        });
    }
    cacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const manifest = yield Manifest.getManifest(this.manifestUrl, this.store);
            const promises = [
                this.cacheSpine(manifest, manifestUrl),
                this.cacheResources(manifest, manifestUrl),
            ];
            for (const promise of promises) {
                yield promise;
            }
            return new Promise((resolve) => resolve());
        });
    }
    cacheSpine(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.spine) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    cacheResources(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.resources) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    onStatusUpdate(callback) {
        this.statusUpdateCallback = callback;
        this.updateStatus();
    }
    getStatus() {
        return this.cacheStatus;
    }
    updateStatus() {
        this.statusUpdateCallback(this.cacheStatus);
    }
}
//# sourceMappingURL=ServiceWorkerCacher.js.map