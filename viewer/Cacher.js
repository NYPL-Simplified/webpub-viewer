export var CacheStatus;
(function (CacheStatus) {
    /** The book has not been cached. */
    CacheStatus[CacheStatus["Uncached"] = 0] = "Uncached";
    /** There is a new version available (Application Cache only - refresh the page to update). */
    CacheStatus[CacheStatus["UpdateAvailable"] = 1] = "UpdateAvailable";
    /** The app is checking for a new version (Application Cache only). */
    CacheStatus[CacheStatus["CheckingForUpdate"] = 2] = "CheckingForUpdate";
    /** The cache is downloading. */
    CacheStatus[CacheStatus["Downloading"] = 3] = "Downloading";
    /** The cache is fully downloaded and the book is available offline. */
    CacheStatus[CacheStatus["Downloaded"] = 4] = "Downloaded";
    /** There was an error downloading the cache, and the book is not available offline. */
    CacheStatus[CacheStatus["Error"] = 5] = "Error";
})(CacheStatus || (CacheStatus = {}));
//# sourceMappingURL=Cacher.js.map