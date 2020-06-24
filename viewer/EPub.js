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
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require("xml-js");
class Manifest {
    constructor(manifestJSON, manifestUrl) {
        const emptySpine = [];
        this.metadata =
            (manifestJSON.package && {
                title: manifestJSON.package.metadata["dc:title"],
            }) ||
                {};
        this.links = (manifestJSON.package && manifestJSON.package.links) || [];
        this.spine = ((manifestJSON.package && manifestJSON.package.spine.itemref) ||
            emptySpine).reduce((acc, chapter) => {
            acc.push({
                href: manifestJSON.package.manifest.item.filter(
                //@ts-ignore
                (item) => item["-id"] === chapter["-idref"] && item["-href"])[0]["-href"],
            });
            return acc;
        }, []);
        this.resources =
            (manifestJSON.package && manifestJSON.package.resources) || [];
        this.toc = ((manifestJSON.package && manifestJSON.package.manifest.item) ||
            emptySpine).reduce((acc, chapter) => {
            acc.push(
            //@ts-ignore
            {
                href: chapter["-href"],
                title: chapter["-id"],
            });
            return acc;
        }, []);
        this.manifestUrl = manifestUrl;
    }
    static getManifest(manifestUrl, store) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchManifest = () => __awaiter(this, void 0, void 0, function* () {
                const manifestJSON = yield window
                    .fetch(manifestUrl.href)
                    .then((response) => response.text())
                    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
                    .then((data) => convert.xml2json(data, {
                    compact: false,
                    spaces: 4,
                }));
                if (store) {
                    yield store.set("manifest", JSON.stringify(manifestJSON));
                }
                return new Manifest(manifestJSON, manifestUrl);
            });
            const tryToUpdateManifestButIgnoreResult = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fetchManifest();
                }
                catch (err) {
                    console.log("Something went wrong", err);
                }
                return new Promise((resolve) => resolve());
            });
            // Respond immediately with the manifest from the store, if possible.
            if (store) {
                const manifestString = yield store.get("manifest");
                if (manifestString) {
                    // Kick off a fetch to update the store for next time,
                    // but don't await it.
                    tryToUpdateManifestButIgnoreResult();
                    const manifestJSON = JSON.parse(manifestString);
                    return new Manifest(manifestJSON, manifestUrl);
                }
            }
            return fetchManifest();
        });
    }
    getStartLink() {
        if (this.spine.length > 0) {
            return this.spine[0];
        }
        return null;
    }
    getPreviousSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index > 0) {
            return this.spine[index - 1];
        }
        return null;
    }
    getNextSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index < this.spine.length - 1) {
            return this.spine[index + 1];
        }
        return null;
    }
    getSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null) {
            return this.spine[index];
        }
        return null;
    }
    getSpineIndex(href) {
        for (let index = 0; index < this.spine.length; index++) {
            const item = this.spine[index];
            if (item.href) {
                const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    }
    getTOCItem(href) {
        const findItem = (href, links) => {
            for (let index = 0; index < links.length; index++) {
                const item = links[index];
                if (item.href) {
                    const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                    if (itemUrl === href) {
                        return item;
                    }
                }
                if (item.children) {
                    const childItem = findItem(href, item.children);
                    if (childItem !== null) {
                        return childItem;
                    }
                }
            }
            return null;
        };
        return findItem(href, this.toc);
    }
}
exports.default = Manifest;
//# sourceMappingURL=EPub.js.map