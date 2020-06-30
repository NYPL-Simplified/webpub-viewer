var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function xmlToJson(xml) {
    let obj = {};
    // process ELEMENT_NODE
    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    }
    // process TEXT_NODE
    else if (xml.nodeType == 3) {
        obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            }
            else {
                //@ts-ignore
                if (typeof obj[nodeName].push == "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    //@ts-ignore
                    obj[nodeName].push(old);
                }
                //@ts-ignore
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}
export default class Manifest {
    constructor(manifestJSON, manifestUrl) {
        const isJSONManifest = Boolean(manifestUrl.href.endsWith(".json"));
        if (isJSONManifest) {
            this.metadata = manifestJSON.metadata || {};
            this.links = manifestJSON.links || [];
            this.spine = manifestJSON.readingOrder || manifestJSON.spine || [];
            this.resources = manifestJSON.resources || [];
            this.toc = manifestJSON.toc || [];
        }
        else {
            this.metadata = this.parseMetaData(manifestJSON);
            //links format should be updated to point to manifest.json
            this.links = this.parseTOC(manifestJSON);
            this.spine = this.parseSpine(manifestJSON);
            this.resources = this.parseResources(manifestJSON);
            this.toc = this.parseTOC(manifestJSON);
        }
        this.manifestUrl = manifestUrl;
    }
    static getManifest(manifestUrl, store) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchManifest = () => __awaiter(this, void 0, void 0, function* () {
                const isJSONManifest = Boolean(manifestUrl.href.endsWith(".json"));
                const manifestJSON = isJSONManifest
                    ? yield window
                        .fetch(manifestUrl.href)
                        .then((response) => response.json())
                    : yield window
                        .fetch(manifestUrl.href)
                        .then((response) => response.text())
                        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
                        .then((data) => JSON.stringify(xmlToJson(data)));
                if (store) {
                    yield store.set("manifest", JSON.stringify(manifestJSON));
                }
                return new Manifest(isJSONManifest ? manifestJSON : JSON.parse(manifestJSON), manifestUrl);
            });
            const tryToUpdateManifestButIgnoreResult = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fetchManifest();
                }
                catch (err) {
                    // Ignore errors.
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
    parseMetaData(manifestJSON) {
        var _a;
        return ((_a = manifestJSON === null || manifestJSON === void 0 ? void 0 : manifestJSON.package) === null || _a === void 0 ? void 0 : _a.metadata) ? {
            title: manifestJSON.package.metadata["dc:title"]["#text"],
        }
            : {};
    }
    parseTOC(manifestJSON) {
        var _a, _b;
        const emptySpine = [];
        return (((_b = (_a = manifestJSON === null || manifestJSON === void 0 ? void 0 : manifestJSON.package) === null || _a === void 0 ? void 0 : _a.manifest) === null || _b === void 0 ? void 0 : _b.item) || emptySpine).reduce((acc, chapter) => {
            acc.push({
                //@ts-ignore
                href: chapter["@attributes"]["href"],
                //@ts-ignore
                title: chapter["@attributes"]["id"],
            });
            return acc;
        }, []);
    }
    parseSpine(manifestJSON) {
        var _a, _b;
        const emptySpine = [];
        return (((_b = (_a = manifestJSON === null || manifestJSON === void 0 ? void 0 : manifestJSON.package) === null || _a === void 0 ? void 0 : _a.spine) === null || _b === void 0 ? void 0 : _b.itemref) || emptySpine).reduce((acc, chapter) => {
            var _a, _b;
            acc.push({
                type: "application/xhtml+xml",
                href: (_b = (_a = manifestJSON === null || manifestJSON === void 0 ? void 0 : manifestJSON.package) === null || _a === void 0 ? void 0 : _a.manifest) === null || _b === void 0 ? void 0 : _b.item.filter(
                //@ts-ignore
                (item) => 
                //@ts-ignore
                item["@attributes"]["id"] === chapter["@attributes"]["idref"] &&
                    item["@attributes"]["href"])[0]["@attributes"]["href"],
            });
            return acc;
        }, []);
    }
    parseResources(manifestJSON) {
        var _a, _b;
        return (((_b = (_a = manifestJSON === null || manifestJSON === void 0 ? void 0 : manifestJSON.package) === null || _a === void 0 ? void 0 : _a.manifest) === null || _b === void 0 ? void 0 : _b.item) || []).reduce((acc, current) => {
            acc.push({
                href: current["@attributes"]["href"],
                id: current["@attributes"]["id"],
            });
            return acc;
        }, []);
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
//# sourceMappingURL=Manifest.js.map