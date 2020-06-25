import Store from "./Store";

// Changes XML to JSON
// source: https://davidwalsh.name/convert-xml-json
function xmlToJson(xml: any) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      //@ts-ignore
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        //@ts-ignore
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      // @ts-ignore
      if (typeof obj[nodeName] == "undefined") {
        // @ts-ignore
        obj[nodeName] = xmlToJson(item);
      } else {
        // @ts-ignore
        if (typeof obj[nodeName].push == "undefined") {
          // @ts-ignore
          var old = obj[nodeName];
          // @ts-ignore
          obj[nodeName] = [];
          // @ts-ignore
          obj[nodeName].push(old);
        }
        // @ts-ignore
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
export interface Metadata {
  title?: string;
  author?: string;
  identifier?: string;
  language?: string;
  modified?: string;
}

export interface Link {
  rel?: Array<string>;
  href?: string;
  type?: string;
  title?: string;
  children?: Array<Link>;
}

export default class Manifest {
  public readonly metadata: Metadata;
  public readonly links: Array<Link>;
  public readonly spine: Array<Link>;
  public readonly resources: Array<Link>;
  public readonly toc: Array<Link>;
  private readonly manifestUrl: URL;

  public static async getManifest(
    manifestUrl: URL,
    store?: Store
  ): Promise<Manifest> {
    const fetchManifest = async (): Promise<Manifest> => {
      const manifestJSON = await window
        .fetch(manifestUrl.href)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => JSON.stringify(xmlToJson(data)));

      if (store) {
        await store.set("manifest", JSON.stringify(manifestJSON));
      }

      return new Manifest(JSON.parse(manifestJSON), manifestUrl);
    };

    const tryToUpdateManifestButIgnoreResult = async (): Promise<void> => {
      try {
        await fetchManifest();
      } catch (err) {
        console.log("Something went wrong", err);
      }
      return new Promise<void>((resolve) => resolve());
    };

    // Respond immediately with the manifest from the store, if possible.
    if (store) {
      const manifestString = await store.get("manifest");
      if (manifestString) {
        // Kick off a fetch to update the store for next time,
        // but don't await it.
        tryToUpdateManifestButIgnoreResult();
        const manifestJSON = JSON.parse(manifestString);
        return new Manifest(manifestJSON, manifestUrl);
      }
    }

    return fetchManifest();
  }

  public parseMetaData(manifestJSON: any): any {
    return manifestJSON?.package?.metadata
      ? {
          title: manifestJSON.package.metadata["dc:title"]["#text"],
        }
      : {};
  }

  public parseTOC(manifestJSON: any): any {
    const emptySpine: string[] = [];

    return (manifestJSON?.package?.manifest?.item || emptySpine).reduce(
      (acc: any, chapter: { href: string; id: string }) => {
        acc.push({
          //@ts-ignore
          href: chapter["@attributes"]["href"],
          //@ts-ignore
          title: chapter["@attributes"]["id"],
        });
        return acc;
      },
      []
    );
  }
  public parseSpine(manifestJSON: any): any {
    const emptySpine: string[] = [];
    return (manifestJSON?.package?.spine?.itemref || emptySpine).reduce(
      (acc: any, chapter: { idref: string; linear: string }) => {
        acc.push({
          href: manifestJSON?.package?.manifest?.item.filter(
            //@ts-ignore
            (item: any) =>
              //@ts-ignore
              item["@attributes"]["id"] === chapter["@attributes"]["idref"] &&
              item["@attributes"]["href"]
          )[0]["@attributes"]["href"],
        });
        return acc;
      },
      []
    );
  }
  public constructor(manifestJSON: any, manifestUrl: URL) {
    this.metadata = this.parseMetaData(manifestJSON);
    this.links = this.parseTOC(manifestJSON);
    this.spine = this.parseSpine(manifestJSON);
    this.resources = manifestJSON?.package?.resources || [];
    this.toc = this.parseTOC(manifestJSON);
    this.manifestUrl = manifestUrl;

    console.log(
      "metadata",
      this.metadata,
      "links",
      this.links,
      "spine",
      this.spine,
      "resources",
      this.resources,
      "toc",
      this.toc,
      "manifestUrl",
      this.manifestUrl
    );
  }

  public getStartLink(): Link | null {
    if (this.spine.length > 0) {
      return this.spine[0];
    }
    return null;
  }

  public getPreviousSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null && index > 0) {
      return this.spine[index - 1];
    }
    return null;
  }

  public getNextSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null && index < this.spine.length - 1) {
      return this.spine[index + 1];
    }
    return null;
  }

  public getSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null) {
      return this.spine[index];
    }
    return null;
  }

  private getSpineIndex(href: string): number | null {
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

  public getTOCItem(href: string): Link | null {
    const findItem = (href: string, links: Array<Link>): Link | null => {
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
