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