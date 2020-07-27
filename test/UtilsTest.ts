import { expect } from "chai";
import { stub, createStubInstance } from "sinon";
require('jsdom');

import { xmlToJson, embedImageAssets } from "../src/Utils";
import BookResourceStore from "../src/BookResourceStore";

describe.only("Utils", () => {
    
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
        let store = createStubInstance(BookResourceStore);
        var mockStore =  stub(store, "getBookData" as any).returns("real-image.png");
        
        it("replaces 'src=' in image string", () => {
            let sampleXml = `<body><img src="sample-image.png"></img></body>`;
            let xmlWithReplacedImage = `<body><img src="test-image.png"></img></body>`
            let embeddedXml = embedImageAssets(sampleXml, "rootUrl", mockStore);
            expect(embeddedXml).to.equal(xmlWithReplacedImage)
        });
        it("replaces 'href=' in image string");
        it("replaces image with local base64 when not encrytped");
        it("replaces image with link to blob when encrypted");
    });

    describe("embedCssAssets", ()  => { 
        it("replaces 'src=' in image string");
        it("replaces with a link to local blob");
    })
}) 