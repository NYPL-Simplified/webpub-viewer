import { expect } from "chai";
import { stub, createStubInstance } from "sinon";
require('jsdom');
import { xmlToJson, embedImageAssets, embedCssAssets } from "../src/Utils";
import BookResourceStore from "../src/BookResourceStore";
import Encryption from "../src/Encryption";
import Decryptor from "../src/Decryptor";

class testDecryptor implements Decryptor {
    decryptXmlString(_resource: string): Promise<string> {
        throw new Error("Method not implemented.");
    }    decryptUrl(_resourceUrl: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    decryptImg(_resourceUrl: string): Promise<Uint8Array> {
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
            let sampleXmlString = `{"container":{"@attributes":{"version":"1.0"},"#text":["\\n            ","\\n            "],"rootfiles":{"#text":["\\n            ","\\n            "],"rootfile":{"@attributes":{"full-path":"OEBPS/package.opf","media-type":"application/oebps-package+xml"}}}}}`
            let sampleXml = `<container version="1.0">
            <rootfiles>
            <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/>
            </rootfiles>
            </container>`
            var parser = new window.DOMParser();
            var xmlDoc = parser.parseFromString(sampleXml, "text/xml");
            let json = xmlToJson(xmlDoc);
            expect(JSON.stringify(json)).to.equal(sampleXmlString);
        })
    })

    describe("embedImageAssets", ()  => { 
        let mockBookResourceStore: any;
        let mockEncryption: any;

        let fakeDecryptor: Decryptor;
        beforeEach(async () => {
            mockBookResourceStore = await BookResourceStore.createBookResourceStore();

            mockEncryption = createStubInstance(Encryption);
            mockEncryption.isEncrypted.returns(true);
            mockEncryption.getDecryptedImageUrl.returns("blob: blob-url")
            fakeDecryptor = new testDecryptor();
        })

        afterEach(() => {
            mockBookResourceStore.getBookData.restore();
        })

        it("replaces unencrypted image src with image content", async () => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-image.png", data: {text: () => { return "image-content"; }}});
            let sampleXml = `<body><img src="sample-image.png"></img></body>`;
            let xmlWithReplacedImage = `<body><img src=temporary-url></img></body>`
            let embeddedXml = await embedImageAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore);
            expect(embeddedXml).to.equal(xmlWithReplacedImage)
        });
        
        it("replaces encrypted image src with blob link", async() => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-image.png", data: null});
            let sampleXml = `<body><img src="sample-image.png"></img></body>`;
            let xmlWithReplacedImage = `<body><img src=blob: blob-url></img></body>`;
            let embeddedXml = await embedImageAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore, mockEncryption, fakeDecryptor);
            expect(embeddedXml).to.equal(xmlWithReplacedImage)
        });

        it("replaces 'href=' in image string", async() => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-image.png", data: {text: () => { return "image-content"; }}});
            let sampleXml = `<body><img href="sample-image.png"></img></body>`;
            let xmlWithReplacedImage = `<body><img src=temporary-url></img></body>`
            let embeddedXml = await embedImageAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore);
            expect(embeddedXml).to.equal(xmlWithReplacedImage)
        });

        it("replace 'href=' in encrypted image link", async() => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-image.png", data: null});
            let sampleXml = `<body><img href="sample-image.png"></img></body>`;
            let xmlWithReplacedImage = `<body><img src=blob: blob-url></img></body>`;
            let embeddedXml = await embedImageAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore, mockEncryption, fakeDecryptor);
            expect(embeddedXml).to.equal(xmlWithReplacedImage)
        })
    });

    describe("embedCssAssets", ()  => { 
        let mockBookResourceStore: any;
        let mockEncryption: any;

        let fakeDecryptor: Decryptor;
        beforeEach(async () => {
            mockBookResourceStore = await BookResourceStore.createBookResourceStore();

            mockEncryption = createStubInstance(Encryption);
            mockEncryption.isEncrypted.returns(true);
            mockEncryption.getDecryptedImageUrl.returns("blob: blob-css-url");
            fakeDecryptor = new testDecryptor();
        })

        afterEach(() => {
            mockBookResourceStore.getBookData.restore();
        })

        it("replaces unencrypted css with link to local blob", async () => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-styles.css", data: {text: () => { return "actual: {css-content}"; }}});
            let sampleXml = `<body><link href="styles.css"></link></body>`;
            let xmlWithReplacedCSS = `<body><link href=temporary-url></link></body>`
            let embeddedXml = await embedCssAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore);
            expect(embeddedXml).to.equal(xmlWithReplacedCSS)
        });

        it("replaces encrypted css with link to local blob", async () => {
            stub(mockBookResourceStore, "getBookData").resolves({href: "real-styles.css", data: null});
            let sampleXml = `<body><link href="styles.css"></link></body>`;
            let xmlWithReplacedCSS = `<body><link href=blob: blob-css-url></link></body>`;
            let embeddedXml = await embedCssAssets(sampleXml, "http://irrelevant.com", mockBookResourceStore, mockEncryption, fakeDecryptor);
            expect(embeddedXml).to.equal(xmlWithReplacedCSS)
        });
    })
}) 