import { expect } from "chai";
import { stub } from "sinon";

import Manifest, { Link } from "../src/EPub";
import MemoryStore from "../src/MemoryStore";

describe("Manifest", () => {
  let manifest: Manifest;
  let emptyManifest: Manifest;

  beforeEach(() => {
    manifest = new Manifest(
      {
        package: {
          "@attributes": {
            xmlns: "http://www.idpf.org/2007/opf",
            version: "3.0",
            "xml:lang": "en",
            "unique-identifier": "pub-id",
          },

          metadata: {
            "@attributes": { "xmlns:dc": "http://purl.org/dc/elements/1.1/" },

            "dc:title": { "#text": "The Catcher in the Rye" },
            "dc:creator": {
              "@attributes": { id: "creator01" },
              "#text": "J. D. Salinger",
            },
            meta: [
              {
                "@attributes": {
                  refines: "#creator01",
                  property: "role",
                  scheme: "marc:relators",
                },
                "#text": "aut",
              },
              {
                "@attributes": { refines: "#creator01", property: "file-as" },
                "#text": "J. D. Salinger",
              },
              {
                "@attributes": {
                  refines: "#creator01",
                  property: "display-seq",
                },
                "#text": "1",
              },
              {
                "@attributes": { property: "dcterms:modified" },
                "#text": "2019-06-07T15:56:39Z",
              },
              { "@attributes": { name: "cover", content: "cover-image" } },
            ],
            "dc:publisher": {
              "#text": "Back Bay Books / Little, Brown and Company",
            },
            "dc:date": { "#text": "2001-01-01" },
            "dc:rights": {
              "#text": "Copyright 1945, 1946, 1951 by J. D. Salinger",
            },
            "dc:identifier": {
              "@attributes": { id: "pub-id" },
              "#text": "9780316460002",
            },
            "dc:language": { "#text": "en" },
          },
          manifest: {
            item: [
              {
                "@attributes": {
                  href: "titlepage.xhtml",
                  id: "titlepage",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "copyright.xhtml",
                  id: "copyright",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "dedication.xhtml",
                  id: "dedication",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "chapter001.xhtml",
                  id: "chapter001",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "chapter002.xhtml",
                  id: "chapter002",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "css/stylesheet.css",
                  id: "id_chapter_1_style_css",
                  "media-type": "text/css",
                },
              },
              {
                "@attributes": {
                  href: "images/9780316460002.jpg",
                  id: "id_Images_Page_576_jpg",
                  "media-type": "image/jpeg",
                  properties: "cover-image",
                },
              },
              {
                "@attributes": {
                  href: "images/Art_tit.jpg",
                  id: "aArt_tit",
                  "media-type": "image/jpeg",
                },
              },
              {
                "@attributes": {
                  href: "images/Art_orn.jpg",
                  id: "aArt_orn",
                  "media-type": "image/jpeg",
                },
              },
              {
                "@attributes": {
                  href: "cover.xhtml",
                  id: "id_cover_xhtml",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  href: "toc.ncx",
                  id: "ncx",
                  "media-type": "application/x-dtbncx+xml",
                },
              },
              {
                "@attributes": {
                  href: "toc.xhtml",
                  id: "toc",
                  "media-type": "application/xhtml+xml",
                },
              },
              {
                "@attributes": {
                  id: "nav",
                  properties: "nav",
                  href: "nav.xhtml",
                  "media-type": "application/xhtml+xml",
                },
              },
            ],
          },
          spine: {
            "@attributes": { "page-progression-direction": "ltr", toc: "ncx" },

            itemref: [
              { "@attributes": { idref: "id_cover_xhtml", linear: "yes" } },
              { "@attributes": { idref: "titlepage", linear: "yes" } },
              { "@attributes": { idref: "copyright", linear: "yes" } },
              { "@attributes": { idref: "toc", linear: "yes" } },
              { "@attributes": { idref: "dedication", linear: "yes" } },
              { "@attributes": { idref: "chapter001", linear: "yes" } },
              { "@attributes": { idref: "chapter002", linear: "yes" } },
            ],
          },
          guide: {
            reference: [
              {
                "@attributes": {
                  type: "copyright",
                  title: "Copyright",
                  href: "copyright.xhtml",
                },
              },
              {
                "@attributes": {
                  type: "start",
                  title: "Begin Reading",
                  href: "cover.xhtml",
                },
              },
              {
                "@attributes": {
                  type: "toc",
                  title: "Table of Contents",
                  href: "toc.xhtml",
                },
              },
              {
                "@attributes": {
                  type: "cover",
                  title: "Cover Image",
                  href: "cover.xhtml",
                },
              },
            ],
          },
        },
      },
      new URL("http://example.com/manifest.json")
    );

    emptyManifest = new Manifest(
      {},
      new URL("http://example.com/manifest.json")
    );
  });

  describe("#getManifest", () => {
    const manifestJSON = {
      metadata: {
        "dc:title": "The Catcher in the Rye",
      },
    };
    const manifest = new Manifest(
      manifestJSON,
      new URL("https://example.com/manifest.json")
    );
    let store: MemoryStore;

    beforeEach(() => {
      store = new MemoryStore();
    });

    describe("if fetching the manifest fails", () => {
      beforeEach(() => {
        window.fetch = stub().rejects();
      });

      it("should return cached manifest from local store", async () => {
        const key = "manifest";
        await store.set(key, JSON.stringify(manifestJSON));

        const response: Manifest = await Manifest.getManifest(
          new URL("https://example.com/manifest.json"),
          store
        );
        expect(response).to.deep.equal(manifest);
      });

      it("should reject promise if there's nothing in the store", async () => {
        let rejected = false;
        try {
          await Manifest.getManifest(
            new URL("https://example.com/manifest.json"),
            store
          );
        } catch (err) {
          rejected = true;
        }
        expect(rejected).to.be.true;
      });
    });

    it("should return the response from fetch, and save it to local store", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="en" unique-identifier="pub-id">
	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
		<dc:title>The Catcher in the Rye</dc:title>
		</metadata>
</package>`;

      const fetchResponse = {
        text: () => {
          return new Promise((resolve) => resolve(xml));
        },
      } as any;

      window.fetch = stub().resolves(fetchResponse);

      const response: Manifest = await Manifest.getManifest(
        new URL("https://example.com/manifest.json"),
        store
      );
      expect(response).to.deep.equal(manifest);

      const key = "manifest";
      const storedValue = await store.get(key);
      expect(storedValue).to.equal(JSON.stringify(manifestJSON));
    });
  });

  describe("#constructor", () => {
    it("should handle empty input", () => {
      expect(emptyManifest.metadata).to.deep.equal({});
      //   expect(emptyManifest.links).to.deep.equal([]);
      expect(emptyManifest.spine).to.deep.equal([]);
      expect(emptyManifest.resources).to.deep.equal([]);
    });

    it("should store metadata", () => {
      expect(manifest.metadata.title).to.equal("The Catcher in the Rye");
    });

    // it("should store links", () => {
    //   expect(manifest.links.length).to.equal(1);
    //   expect(manifest.links[0].href).to.equal("id_cover_xhtml");
    // });

    it("should store spine", () => {
      expect(manifest.spine.length).to.equal(7);
      expect(manifest.spine[0].href).to.equal("cover.xhtml");
    });

    // it("should store resources", () => {
    //   expect(manifest.resources.length).to.equal(2);
    //   expect(manifest.resources[0].href).to.equal("contents.html");
    // });

    it("should store toc", () => {
      /* this needs to be revisited because it is returning html/css files */
      expect(manifest.toc.length).to.equal(13);
      expect(manifest.toc[0].title).to.equal("titlepage");
    });
  });

  describe("#getStartLink", () => {
    it("should return the first spine item", () => {
      const start = manifest.getStartLink() as Link;
      expect(start).not.to.be.null;
      expect(start.href).to.equal("cover.xhtml");
    });

    it("should return null if spine is empty", () => {
      const start = emptyManifest.getStartLink();
      expect(start).to.be.null;
    });
  });

  describe("#getPreviousSpineItem", () => {
    it("should return previous spine item", () => {
      let previous = manifest.getPreviousSpineItem(
        "http://example.com/titlepage.xhtml"
      ) as Link;
      expect(previous).not.to.be.null;
      expect(previous.href).to.equal("cover.xhtml");

      previous = manifest.getPreviousSpineItem(
        "http://example.com/copyright.xhtml"
      ) as Link;
      expect(previous).not.to.be.null;
      expect(previous.href).to.equal("titlepage.xhtml");
    });

    it("should return null for first spine item", () => {
      const previous = manifest.getPreviousSpineItem(
        "http://example.com/id_cover_xhtml"
      );
      expect(previous).to.be.null;
    });

    it("should return null for item not in the spine", () => {
      const previous = manifest.getPreviousSpineItem(
        "http://example.com/toc.html"
      );
      expect(previous).to.be.null;
    });
  });

  describe("#getNextSpineItem", () => {
    it("should return next spine item", () => {
      let next = manifest.getNextSpineItem(
        "http://example.com/cover.xhtml"
      ) as Link;
      expect(next).not.to.be.null;
      expect(next.href).to.equal("titlepage.xhtml");

      next = manifest.getNextSpineItem(
        "http://example.com/titlepage.xhtml"
      ) as Link;
      expect(next).not.to.be.null;
      expect(next.href).to.equal("copyright.xhtml");
    });

    it("should return null for last spine item", () => {
      const next = manifest.getNextSpineItem(
        "http://example.com/chapter002.xhtml"
      );
      expect(next).to.be.null;
    });

    it("should return null for item not in the spine", () => {
      const next = manifest.getNextSpineItem(
        "http://example.com/chapter002.xhtml"
      );
      expect(next).to.be.null;
    });
  });

  describe("#getSpineItem", () => {
    it("should return correct spine item", () => {
      let item = manifest.getSpineItem(
        "http://example.com/cover.xhtml"
      ) as Link;
      expect(item).not.to.be.null;
      expect(item.href).to.equal("cover.xhtml");

      item = manifest.getSpineItem(
        "http://example.com/titlepage.xhtml"
      ) as Link;
      expect(item).not.to.be.null;
      expect(item.href).to.equal("titlepage.xhtml");
    });

    it("should return null for item not in the spine", () => {
      const item = manifest.getSpineItem("http://example.com/toc.html");
      expect(item).to.be.null;
    });
  });

  describe("#getTOCItem", () => {
    it("should return correct top-level item", () => {
      let item = manifest.getTOCItem(
        "http://example.com/titlepage.xhtml"
      ) as Link;
      expect(item).not.to.be.null;
      expect(item.href).to.equal("titlepage.xhtml");

      item = manifest.getTOCItem("http://example.com/chapter001.xhtml") as Link;
      expect(item).not.to.be.null;
      expect(item.href).to.equal("chapter001.xhtml");
    });

    it("should return correct nested item", () => {
      const item = manifest.getTOCItem(
        "http://example.com/copyright.xhtml"
      ) as Link;
      expect(item).not.to.be.null;
      expect(item.href).to.equal("copyright.xhtml");
    });

    it("should return null for item not in the toc", () => {
      const item = manifest.getTOCItem("http://example.com/toc.html");
      expect(item).to.be.null;
    });
  });
});
