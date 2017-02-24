import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ApplicationCacheCacher from "../src/ApplicationCacheCacher";
import MemoryStore from "../src/MemoryStore";
import Manifest from "../src/Manifest";

describe("ApplicationCacheCacher", () => {
    let store: MemoryStore;
    let cacher: ApplicationCacheCacher;
    let element: HTMLElement;

    const mockFetchAPI = (response: Promise<Response>) => {
        window.fetch = stub().returns(response);
    };

    beforeEach(() => {
        store = new MemoryStore();
        cacher = new ApplicationCacheCacher(store, new URL("http://example.com/fallback.html"));

        const jsdomWindow = jsdom.jsdom("", ({
            // This is useful for debugging errors in an iframe load event.
            virtualConsole: jsdom.createVirtualConsole().sendTo(console),
            resourceLoader: (_: any, callback: any) => {
                // Load this HTML for every URL.
                callback(null, '<html manifest="manifest.appcache"></html>');
            },
            features: {
                FetchExternalResources: ["iframe"],
                ProcessExternalResources: ["iframe"]
            }
        } as any)).defaultView;

        element = jsdomWindow.document.createElement("div");

        // The element must be in a document for iframe load events to work.
        jsdomWindow.document.body.appendChild(element);

        (window as any).applicationCache = {
            UNCACHED: 0,
            IDLE: 1,
            CHECKING: 2,
            DOWNLOADING: 3,
            UPDATEREADY: 4,
            OBSOLETE: 5
        };
    });

    describe("#renderStatus", () => {
        it("should render status updates based on main application cache", async () => {
            (window.applicationCache as any).status = window.applicationCache.UPDATEREADY;
            await cacher.renderStatus(element);
            expect(element.innerHTML).to.contain("Update");

            (window.applicationCache as any).status = window.applicationCache.DOWNLOADING;
            window.applicationCache.ondownloading(new Event("downloading"));
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).to.contain("Downloading");

            (window.applicationCache as any).status = window.applicationCache.OBSOLETE;
            window.applicationCache.onchecking(new Event("checking"));
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).not.to.contain("Downloading");
            expect(element.innerHTML).to.contain("Not available");

            (window.applicationCache as any).status = window.applicationCache.IDLE;
            await cacher.renderStatus(element);
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).not.to.contain("Downloading");
            expect(element.innerHTML).not.to.contain("Not available");
            expect(element.innerHTML).to.contain("Downloaded");
        });

        it("should render status updates based on book application cache", async () => {
            // This isn't tested yet because I can't figure out how to manipulate
            // the application cache in the iframe and have it be available to the
            // regular code during a test.
        });
    });

    describe("#getManifest", () => {
        const manifestJSON = {
            metadata: {
                title: "Alice's Adventures in Wonderland"
            }
        };
        const manifest = new Manifest(manifestJSON, new URL("https://example.com/manifest.json"));

        describe("if fetching the manifest fails", () => {
            const fetchFailure = new Promise((_, reject) => reject());

            beforeEach(() => {
                mockFetchAPI(fetchFailure);
            })

            it("should return cached manifest from local store", async () => {
                const key = "manifest";
                await store.set(key, JSON.stringify(manifestJSON));

                const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
                expect(response).to.deep.equal(manifest);
            });
        });

        it("should return the response from fetch, and save it to local store", async () => {
            const fetchResponse = ({
                json: () => {
                    return new Promise(resolve => resolve(manifestJSON));
                }
            } as any);
            const fetchSuccess = new Promise(resolve => resolve(fetchResponse));

            mockFetchAPI(fetchSuccess);

            const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
            expect(response).to.deep.equal(manifest);

            const key = "manifest";
            const storedValue = await store.get(key);
            expect(storedValue).to.equal(JSON.stringify(manifestJSON));
        });
    });
});