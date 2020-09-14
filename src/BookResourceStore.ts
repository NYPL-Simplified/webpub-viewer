import Manifest from "Manifest";

export interface IBookStore {
  href: string;
  data: Blob;
}

// IndexDB store for Book resources
// Only works on browsers that support IndexedDB.
export default class BookResourceStore {
  private readonly db: IDBDatabase;

  public constructor(db: IDBDatabase) {
    this.db = db;
  }

  public static createBookResourceStore(): Promise<BookResourceStore> {
    if (!("indexedDB" in window)) {
      //TODO: a polyfill to handle lack of IndexedDB
      console.log("This browser doesn't support IndexedDB");
    }
    const request = window.indexedDB.open("WebpubViewerDb", 2);
    let store:BookResourceStore;
    return new Promise((resolve) => {
      request.onupgradeneeded = (evt:IDBVersionChangeEvent) => {
        const db = (<any>evt.target).result;
        if (!db.objectStoreNames.contains("bookResources")) {
          const bookResourceStore = db.createObjectStore("bookResources", {
            keyPath: "href",
          });
          bookResourceStore.transaction.oncomplete = () => {
            store = new BookResourceStore(db);
          }
        }
      }

      request.onsuccess = (evt) => {
        if(!store) {
          store = new BookResourceStore((<any>evt.target).result);
        }
        resolve(store);
      }
      request.onerror = () => {
        throw new Error("IndexedDB could not be opened.  Are you in FireFox in Private Browsing mode?");
      }
    });
  }

  private addBookData(
    resourceHref: string,
    data: Blob,
  ): Promise<boolean> {
    const tx = this.db.transaction(["bookResources"], "readwrite");
    const store = tx.objectStore("bookResources");
    const bookData = {
      href: resourceHref,
      data: data
    };
    const request = store.add(bookData);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = () => {
        resolve(false);
      };
    });
  }

  getBookData(resourceHref: string):Promise<IBookStore> {
    const store = this.db.transaction(["bookResources"]).objectStore("bookResources");
    const request = store.get(resourceHref);
    return new Promise((resolve) => {
      request.onsuccess = (evt) => {
        resolve((<any>evt.target).result);
      };
    });
  }

  addAllBookData(manifest: Manifest) {
    return Promise.all(manifest.resources.map(async (resource: any) => {
      const manifestPath = manifest.manifestUrl.href.substring(
        0,
        manifest.manifestUrl.href.lastIndexOf("/")
      );
      //add leading slash to resource.href if not exists
      const fullResourceUrl =
        resource.href[0] === "/"
          ? `${manifestPath}${resource.href}`
          : `${manifestPath}/${resource.href}`;

      /* store each resource in store */
      resource = await fetch(fullResourceUrl);
      const blob = await resource.blob();
      await this.addBookData(fullResourceUrl, blob);
    }));
  }
}
