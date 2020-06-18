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
          "-xmlns": "http://www.idpf.org/2007/opf",
          "-version": "3.0",
          "-xml:lang": "en",
          "-unique-identifier": "pub-id",
          metadata: {
            "-xmlns:dc": "http://purl.org/dc/elements/1.1/",
            "dc:title": "The Catcher in the Rye",
            "dc:creator": {
              "-id": "creator01",
              "#text": "J. D. Salinger",
            },
            meta: [
              {
                "-refines": "#creator01",
                "-property": "role",
                "-scheme": "marc:relators",
                "#text": "aut",
              },
              {
                "-refines": "#creator01",
                "-property": "file-as",
                "#text": "J. D. Salinger",
              },
              {
                "-refines": "#creator01",
                "-property": "display-seq",
                "#text": "1",
              },
              {
                "-property": "dcterms:modified",
                "#text": "2019-06-07T15:56:39Z",
              },
              {
                "-name": "cover",
                "-content": "cover-image",
              },
            ],
            "dc:publisher": "Back Bay Books / Little, Brown and Company",
            "dc:date": "2001-01-01",
            "dc:rights": "Copyright 1945, 1946, 1951 by J. D. Salinger",
            "dc:identifier": {
              "-id": "pub-id",
              "#text": "9780316460002",
            },
            "dc:language": "en",
          },
          manifest: {
            item: [
              {
                "-href": "titlepage.xhtml",
                "-id": "titlepage",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-href": "copyright.xhtml",
                "-id": "copyright",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-href": "dedication.xhtml",
                "-id": "dedication",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-href": "chapter001.xhtml",
                "-id": "chapter001",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-href": "chapter002.xhtml",
                "-id": "chapter002",
                "-media-type": "application/xhtml+xml",
              },

              {
                "-href": "css/stylesheet.css",
                "-id": "id_chapter_1_style_css",
                "-media-type": "text/css",
              },
              {
                "-href": "images/9780316460002.jpg",
                "-id": "id_Images_Page_576_jpg",
                "-media-type": "image/jpeg",
                "-properties": "cover-image",
              },
              {
                "-href": "images/Art_tit.jpg",
                "-id": "aArt_tit",
                "-media-type": "image/jpeg",
              },
              {
                "-href": "images/Art_orn.jpg",
                "-id": "aArt_orn",
                "-media-type": "image/jpeg",
              },
              {
                "-href": "cover.xhtml",
                "-id": "id_cover_xhtml",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-href": "toc.ncx",
                "-id": "ncx",
                "-media-type": "application/x-dtbncx+xml",
              },
              {
                "-href": "toc.xhtml",
                "-id": "toc",
                "-media-type": "application/xhtml+xml",
              },
              {
                "-id": "nav",
                "-properties": "nav",
                "-href": "nav.xhtml",
                "-media-type": "application/xhtml+xml",
              },
            ],
          },
          spine: {
            "-page-progression-direction": "ltr",
            "-toc": "ncx",
            itemref: [
              {
                "-idref": "id_cover_xhtml",
                "-linear": "yes",
              },
              {
                "-idref": "titlepage",
                "-linear": "yes",
              },
              {
                "-idref": "copyright",
                "-linear": "yes",
              },
              {
                "-idref": "toc",
                "-linear": "yes",
              },
              {
                "-idref": "dedication",
                "-linear": "yes",
              },
              {
                "-idref": "chapter001",
                "-linear": "yes",
              },
              {
                "-idref": "chapter002",
                "-linear": "yes",
              },
            ],
          },
          guide: {
            reference: [
              {
                "-type": "copyright",
                "-title": "Copyright",
                "-href": "copyright.xhtml",
              },
              {
                "-type": "start",
                "-title": "Begin Reading",
                "-href": "cover.xhtml",
              },
              {
                "-type": "toc",
                "-title": "Table of Contents",
                "-href": "toc.xhtml",
              },
              {
                "-type": "cover",
                "-title": "Cover Image",
                "-href": "cover.xhtml",
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

    it.skip("should return the response from fetch, and save it to local store", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="en" unique-identifier="pub-id">
	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
		<dc:title>The Catcher in the Rye</dc:title>
		<dc:creator id="creator01">J. D. Salinger</dc:creator>
		<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>
		<meta refines="#creator01" property="file-as">J. D. Salinger</meta>
		<meta refines="#creator01" property="display-seq">1</meta>
		<dc:publisher>Back Bay Books / Little, Brown and Company</dc:publisher>
		<dc:date>2001-01-01</dc:date>
		<dc:rights>Copyright 1945, 1946, 1951 by J. D. Salinger</dc:rights>
		<dc:identifier id="pub-id">9780316460002</dc:identifier>
		<meta property="dcterms:modified">2019-06-07T15:56:39Z</meta>
		<dc:language>en</dc:language>
		<meta name="cover" content="cover-image" />
	</metadata>
	<manifest>

		<item href="titlepage.xhtml" id="titlepage" media-type="application/xhtml+xml" />
		<item href="copyright.xhtml" id="copyright" media-type="application/xhtml+xml" />
		<item href="dedication.xhtml" id="dedication" media-type="application/xhtml+xml" />
		<item href="chapter001.xhtml" id="chapter001" media-type="application/xhtml+xml" />
		<item href="chapter002.xhtml" id="chapter002" media-type="application/xhtml+xml" />
		<item href="css/stylesheet.css" id="id_chapter_1_style_css" media-type="text/css" />
		<item href="images/9780316460002.jpg" id="id_Images_Page_576_jpg" media-type="image/jpeg" properties="cover-image" />
		<item href="images/Art_tit.jpg" id="aArt_tit" media-type="image/jpeg" />
		<item href="images/Art_orn.jpg" id="aArt_orn" media-type="image/jpeg" />
		<item href="cover.xhtml" id="id_cover_xhtml" media-type="application/xhtml+xml" />
		<item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml" />
		<item href="toc.xhtml" id="toc" media-type="application/xhtml+xml" />
		<item id="nav" properties="nav" href="nav.xhtml" media-type="application/xhtml+xml" />
	</manifest>
	<spine page-progression-direction="ltr" toc="ncx">
		<itemref idref="id_cover_xhtml" linear="yes" />
		<itemref idref="titlepage" linear="yes" />
		<itemref idref="copyright" linear="yes" />
		<itemref idref="toc" linear="yes" />
		<itemref idref="dedication" linear="yes" />
		<itemref idref="chapter001" linear="yes" />
		<itemref idref="chapter002" linear="yes" /> 
	</spine>
	<guide>
		<reference type="copyright" title="Copyright" href="copyright.xhtml" />
		<reference type="start" title="Begin Reading" href="cover.xhtml" />
		<reference type="toc" title="Table of Contents" href="toc.xhtml" />
		<reference type="cover" title="Cover Image" href="cover.xhtml" />
	</guide>
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
