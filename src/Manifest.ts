import Store from "./Store";

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

type xmlObject = {
  [key: string]: string[] | string | xmlObject | [];
};

function xmlToJson(xml: any) {
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

function parseOPFPackage(OPFPackage: any): any {
  let OPF = null;
  try {
    OPF = JSON.parse(OPFPackage);
  } catch (e) {
    OPF = JSON.parse(JSON.stringify(OPFPackage));
  }
  return OPF;
}

function parseResources(OPFPackage: any): any {
  return (OPFPackage.package?.manifest?.item || []).reduce(
    (acc: any, current: any) => {
      acc.push({
        href: current["@attributes"]["href"],
        id: current["@attributes"]["id"],
      });
      return acc;
    },
    []
  );
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
      const isJSONManifest = Boolean(manifestUrl.href.endsWith(".json"));

      const manifestJSON = isJSONManifest
        ? await window
            .fetch(manifestUrl.href)
            .then((response) => response.json())
        : await window
            .fetch(manifestUrl.href)
            .then((response) => response.text())
            .then((str) =>
              new window.DOMParser().parseFromString(str, "text/xml")
            )
            .then((data) => JSON.stringify(xmlToJson(data)));

      if (store) {
        const resources = parseResources(parseOPFPackage(manifestJSON));

        for (let resource of resources) {
          const fullResourceUrl = `${manifestUrl.href.replace(
            "package.opf",
            ""
          )}${resource.href}`;

          /* store each resource in store */
          await window
            .fetch(fullResourceUrl)
            .then((response) => response.text())
            .then((content) => store.set(resource.href, content));
        }

        await store.set("manifest", JSON.stringify(manifestJSON));
      }

      return new Manifest(
        JSON.parse(JSON.stringify(manifestJSON)),
        manifestUrl
      );
    };

    const tryToUpdateManifestButIgnoreResult = async (): Promise<void> => {
      try {
        await fetchManifest();
      } catch (err) {
        // Ignore errors.
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

  public parseMetaData(OPFPackage: any): any {
    const metadata = OPFPackage?.package?.metadata;
    const title = metadata ? metadata["dc:title"]["#text"] : "";

    return title
      ? {
          title: title,
        }
      : {};
  }

  public parseTOC(OPFPackage: any): any {
    const emptySpine: string[] = [];

    return (OPFPackage?.package?.manifest?.item || emptySpine).reduce(
      (acc: any, chapter: { "@attributes": { href: string; id: string } }) => {
        acc.push({
          href: chapter["@attributes"]["href"],
          title: chapter["@attributes"]["id"],
        });
        return acc;
      },
      []
    );
  }

  public parseSpine(OPFPackage: any): any {
    const emptySpine: string[] = [];
    return (OPFPackage?.package?.spine?.itemref || emptySpine).reduce(
      (
        acc: any,
        chapter: {
          "@attributes": {
            idref: string;
            linear: string;
          };
        }
      ) => {
        acc.push({
          type: "application/xhtml+xml",
          href: OPFPackage?.package?.manifest?.item.filter(
            (item: any) =>
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
    const isJSONManifest = Boolean(manifestUrl.href.endsWith(".json"));
    if (isJSONManifest) {
      this.metadata = manifestJSON.metadata || {};
      this.links = manifestJSON.links || [];
      this.spine = manifestJSON.readingOrder || manifestJSON.spine || [];
      this.resources = manifestJSON.resources || [];
      this.toc = manifestJSON.toc || [];
    } else {
      const OPFPackage = parseOPFPackage(manifestJSON);

      this.metadata = this.parseMetaData(OPFPackage) || {};
      //links format should be updated to point to manifest.json
      this.links = this.parseTOC(OPFPackage) || [];
      this.spine = this.parseSpine(OPFPackage) || [];
      this.resources = parseResources(OPFPackage) || [];
      this.toc = this.parseTOC(OPFPackage) || [];
    }

    this.manifestUrl = manifestUrl;
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
