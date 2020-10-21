/* eslint-disable @typescript-eslint/ban-ts-comment */
import BookResourceStore from "BookResourceStore";
import Encryption from "../Encryption";
import Decryptor from "../Decryptor";

type xmlObject = {
  [key: string]: string[] | string | xmlObject | [];
};

export function xmlToJson(xml: any) {
  let obj = {} as xmlObject;

  // process ELEMENT_NODE
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  }
  // process TEXT_NODE
  else if (xml.nodeType === 3) {
    obj = xml.nodeValue;
  }

  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      //strip special characters from nodeName
      const nodeName: string = item.nodeName;

      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
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

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
export function ab2str(buf: Iterable<number>) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(buf));
}

/* Replace image assets in XML document with local or decrypted assets, if applicable*/
export async function embedImageAssets(
  unembeddedXml: string,
  localResource: string,
  store: BookResourceStore,
  encryption?: Encryption,
  decryptor?: Decryptor
) {
  const images =
    unembeddedXml.match(
      /(src="|href=")(?!https?:\/\/)\/?([^"]+\.(jpe?g|png|gif|bmp)")/g
    ) || [];

  for (const image of images) {
    // extract only the path and filename of image
    const srcImg = image.replace(/(src="|href=")/g, "").replace(/['"]+/g, "");
    // resolve to absolute url
    const imgUrl = new URL(srcImg, localResource);

    const resource = await store.getBookData(imgUrl.href);
    let imageUrl;
    if (
      resource &&
      encryption &&
      decryptor &&
      encryption.isEncrypted(imgUrl.href)
    ) {
      imageUrl = await encryption.getDecryptedUrl(resource.data, decryptor);
    } else {
      if (!resource || !resource.data) {
        throw new Error(
          "This resource has no data object.  Check resource parameters"
        );
      }
      const imageBlob = await resource.data;
      imageUrl = URL.createObjectURL(imageBlob);
    }
    /*replace relative url in XML document with base64 version of image*/
    unembeddedXml = unembeddedXml.replace(image, `${"src=" + imageUrl}`);
  }
  return unembeddedXml;
}

/* Replace css assets in XML document with local or decrypted assets, if applicable*/
export async function embedCssAssets(
  unembeddedXml: string,
  resourcePath: string,
  store: BookResourceStore,
  encryption?: Encryption,
  decryptor?: Decryptor
) {
  const styles =
    unembeddedXml.match(/(href=")(?!https?:\/\/)\/?([^"]+\.(css))"/g) || [];
  for (const style of styles) {
    // extract only the path and filename of stylesheet
    const relativeUrl = style.replace("href=", "").replace(/['"]+/g, "");
    // resolve to absolute url
    const styleUrl = new URL(relativeUrl, resourcePath);
    const resource = await store.getBookData(styleUrl.href);

    let cssUrl;
    if (encryption && decryptor && encryption.isEncrypted(styleUrl.href)) {
      cssUrl = await encryption.getDecryptedUrl(resource.data, decryptor);
    } else {
      cssUrl = URL.createObjectURL(resource.data);
    }
    const replacement = "href=" + cssUrl;
    unembeddedXml = unembeddedXml.replace(style, `${replacement}`);
  }
  return unembeddedXml;
}

/* Make sure XML document is returned with a <base> tag in <head> */
export function setBase(unembeddedXml: string, resourcePath: string) {
  //Find first head element
  const parser = new window.DOMParser();
  const htmlDoc = parser.parseFromString(unembeddedXml, "text/html")
    .documentElement;
  const headElement = htmlDoc.getElementsByTagName("head")[0];

  if (headElement.getElementsByTagName("base").length > 0) {
    return unembeddedXml;
  } else {
    const newHeadElement = headElement.cloneNode(true);

    const baseNode = document.createElement("base");
    baseNode.href = resourcePath;

    newHeadElement.appendChild(baseNode);
    htmlDoc.replaceChild(newHeadElement, headElement);

    //Get element as string by creating outer element and putting it as child
    const outerElement = document.createElement("div");
    outerElement.appendChild(htmlDoc);
    return outerElement.innerHTML;
  }
}
