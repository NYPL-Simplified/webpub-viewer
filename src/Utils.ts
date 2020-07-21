import BookResourceStore from "BookResourceStore";
import Encryption from "Encryption";
import { Decryptor } from "index";

type xmlObject = {
    [key: string]: string[] | string | xmlObject | [];
  };
  
export function xmlToJson(xml: any) {

    let obj = {} as xmlObject;
  
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

/* Replace assets in XML document*/
export async function embedXMLAssets(
  baseUrl: string,
  localResource: string,
  store: BookResourceStore,
) {
  const images =
    localResource.match(
      /(src="|href=")(?!https?:\/\/)\/?([^"]+\.(jpe?g|png|gif|bmp))/g
    ) || [];

  for (let image of images) {
    image = image.replace('src="', "");
    console.log("image", image);
    const base64 = await store.getBookData(image);
    
    /*replace relative url in XML document with base64 version of image*/
    localResource = localResource.replace(image, `${base64}"`);
  }

  /* TODO: render CSS file from local storage; currently this hotlinks/uses the .css from the remote site which is not ideal */
  return localResource.replace(
    /(href=")(?!https?:\/\/)\/?([^"]+\.(css))"/gi,
    `$1${baseUrl}$2"`
  );

  // return localResource.replace(
  //   /(src="|href=")(?!https?:\/\/)\/?([^"]+\.(jpe?g|png|gif|bmp|css))"/gi,
  //   `$1${baseUrl}$2"`
  // );
}




export async function loadLocalResource(
  resource: string,
  store: BookResourceStore,
  encryption?: Encryption,
  decryptor?: Decryptor
) {
  if(isEncrypted && !decryptor) {
     throw new Error("cannot load encrypted resource with no Decryptor")
  }
  let localResource = await store.getBookData(resource);
  
  //Decrypt the book contents if necessary
  let resourceString;
  if (isEncrypted) {
    let blobUrl = URL.createObjectURL(localResource.data);
    let decrypted = await decryptor!.decryptUrl(blobUrl);
    resourceString = new DOMParser().parseFromString(decrypted, 'application/xhtml+xml').documentElement.innerHTML;
    URL.revokeObjectURL(blobUrl);

    //add images
    embedXMLAssets()
  } else {
    resourceString = await localResource.data.text();
  }
}

