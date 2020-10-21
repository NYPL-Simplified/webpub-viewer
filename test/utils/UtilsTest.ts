import { expect } from "chai";
import { stub, createStubInstance } from "sinon";
require("jsdom");
import {
  xmlToJson,
  embedImageAssets,
  embedCssAssets,
  setBase
} from "../../src/utils/Utils";
import BookResourceStore from "../../src/BookResourceStore";
import Encryption from "../../src/Encryption";
import Decryptor from "../../src/Decryptor";

class testDecryptor implements Decryptor {
  decryptUrl(_resourceUrl: string): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  constructor() {
    return this;
  }
}

describe("Utils", () => {
  URL.createObjectURL = stub().returns("temporary-url");

  describe("xmlToJson", () => {
    it("converts an xml document to a json string", () => {
      const sampleXmlString = `{"container":{"@attributes":{"version":"1.0"},"#text":["\\n            ","\\n            "],"rootfiles":{"#text":["\\n            ","\\n            "],"rootfile":{"@attributes":{"full-path":"OEBPS/package.opf","media-type":"application/oebps-package+xml"}}}}}`;
      const sampleXml = `<container version="1.0">
            <rootfiles>
            <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/>
            </rootfiles>
            </container>`;
      const parser = new window.DOMParser();
      const xmlDoc = parser.parseFromString(sampleXml, "text/xml");
      const json = xmlToJson(xmlDoc);
      expect(JSON.stringify(json)).to.equal(sampleXmlString);
    });
  });

  describe("embedImageAssets", () => {
    let mockBookResourceStore: any;
    let mockEncryption: any;

    let fakeDecryptor: Decryptor;
    beforeEach(async () => {
      mockBookResourceStore = await BookResourceStore.createBookResourceStore();

      mockEncryption = createStubInstance(Encryption);
      mockEncryption.isEncrypted.returns(true);
      mockEncryption.getDecryptedUrl.returns("blob: blob-url");
      fakeDecryptor = new testDecryptor();
    });

    afterEach(() => {
      mockBookResourceStore.getBookData.restore();
    });

    it("replaces unencrypted image src with image content", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-image.png",
        data: {
          text: () => {
            return "image-content";
          }
        }
      });
      const sampleXml = `<body><img src="sample-image.png"></img></body>`;
      const xmlWithReplacedImage = `<body><img src=temporary-url></img></body>`;
      const embeddedXml = await embedImageAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore
      );
      expect(embeddedXml).to.equal(xmlWithReplacedImage);
    });

    it("replaces encrypted image src with blob link", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-image.png",
        data: null
      });
      const sampleXml = `<body><img src="sample-image.png"></img></body>`;
      const xmlWithReplacedImage = `<body><img src=blob: blob-url></img></body>`;
      const embeddedXml = await embedImageAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore,
        mockEncryption,
        fakeDecryptor
      );
      expect(embeddedXml).to.equal(xmlWithReplacedImage);
    });

    it("replaces 'href=' in image string", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-image.png",
        data: {
          text: () => {
            return "image-content";
          }
        }
      });
      const sampleXml = `<body><img href="sample-image.png"></img></body>`;
      const xmlWithReplacedImage = `<body><img src=temporary-url></img></body>`;
      const embeddedXml = await embedImageAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore
      );
      expect(embeddedXml).to.equal(xmlWithReplacedImage);
    });

    it("replace 'href=' in encrypted image link", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-image.png",
        data: null
      });
      const sampleXml = `<body><img href="sample-image.png"></img></body>`;
      const xmlWithReplacedImage = `<body><img src=blob: blob-url></img></body>`;
      const embeddedXml = await embedImageAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore,
        mockEncryption,
        fakeDecryptor
      );
      expect(embeddedXml).to.equal(xmlWithReplacedImage);
    });
  });

  describe("embedCssAssets", () => {
    let mockBookResourceStore: any;
    let mockEncryption: any;

    let fakeDecryptor: Decryptor;
    beforeEach(async () => {
      mockBookResourceStore = await BookResourceStore.createBookResourceStore();

      mockEncryption = createStubInstance(Encryption);
      mockEncryption.isEncrypted.returns(true);
      mockEncryption.getDecryptedUrl.returns("blob: blob-css-url");
      fakeDecryptor = new testDecryptor();
    });

    afterEach(() => {
      mockBookResourceStore.getBookData.restore();
    });

    it("replaces unencrypted css with link to local blob", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-styles.css",
        data: {
          text: () => {
            return "actual: {css-content}";
          }
        }
      });
      const sampleXml = `<body><link href="styles.css"></link></body>`;
      const xmlWithReplacedCSS = `<body><link href=temporary-url></link></body>`;
      const embeddedXml = await embedCssAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore
      );
      expect(embeddedXml).to.equal(xmlWithReplacedCSS);
    });

    it("replaces encrypted css with link to local blob", async () => {
      stub(mockBookResourceStore, "getBookData").resolves({
        href: "real-styles.css",
        data: null
      });
      const sampleXml = `<body><link href="styles.css"></link></body>`;
      const xmlWithReplacedCSS = `<body><link href=blob: blob-css-url></link></body>`;
      const embeddedXml = await embedCssAssets(
        sampleXml,
        "http://irrelevant.com",
        mockBookResourceStore,
        mockEncryption,
        fakeDecryptor
      );
      expect(embeddedXml).to.equal(xmlWithReplacedCSS);
    });
  });

  describe("setBase", () => {
    it("Adds a <base> to html if it doesn't exist", () => {
      const resourceString =
        "<html><head> </head><body> <span> body text </span> </body></html>";

      const resourceStringWithBase = `<html><head> <base href="http://example.com"></head><body> <span> body text </span> </body></html>`;
      expect(setBase(resourceString, "http://example.com")).to.equal(
        resourceStringWithBase
      );
    });

    it("doesn't replace <base> if it already exists", () => {
      const resourceString = `<head> <base href="http://other-example.com"> </head><body> <span> body text </span> </body>`;
      expect(setBase(resourceString, "http://example.com")).to.equal(
        resourceString
      );
    });
  });
});
