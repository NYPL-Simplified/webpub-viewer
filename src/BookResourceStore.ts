

export interface IBookStore {
  href: string;
  data: Blob;
  localHref: string;
}

// IndexDB store for Book resources
// Only works on browsers that support IndexedDB.
export default class BookResourceStore {
  public readonly db: IDBDatabase;

  public constructor(db: IDBDatabase) {
    this.db = db;
  }

  public static createBookResourceStore(): Promise<BookResourceStore> {
    if (!("indexedDB" in window)) {
      console.log("This browser doesn't support IndexedDB");
    }
    var request = window.indexedDB.open("WebpubViewerDb", 2);
    let store:BookResourceStore;
    return new Promise((resolve) => {
      request.onupgradeneeded = (evt) => {
        let db = (<any>evt.target).result;
        if (!db.objectStoreNames.contains("bookResources")) {
          var bookResourceOS = db.createObjectStore("bookResources", {
            keyPath: "href",
          });
          bookResourceOS.createIndex("href", "href", {unique: true});
          bookResourceOS.createIndex("data", "data");
          bookResourceOS.transaction.oncomplete = () => {
            console.log("transaction completed");
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
    });
  }

  addBookData(
    resourceHref: string,
    data: Blob,
  ): Promise<boolean> {
    let tx = this.db.transaction(["bookResources"], "readwrite");
    let store = tx.objectStore("bookResources");
    let bookData = {
      href: resourceHref,
      data: data
    };
    //TODO: check if it already exists
    console.log("href", resourceHref);
    let request = store.add(bookData);

    return new Promise((resolve) => {
      request.onsuccess = (evt) => {
        console.log((<any>evt.target).result);
        resolve(true);
      };
      request.onerror = (evt) => {
        console.log((<any>evt.target).error);
        resolve(false);
      };
    });
  }

  getBookData(resourceHref: string):Promise<IBookStore> {
    console.log("getting resource", resourceHref);
    let store = this.db.transaction(["bookResources"]).objectStore("bookResources");
    var request = store.get(resourceHref);
    return new Promise((resolve) => {
      request.onsuccess = (evt) => {
        console.log("success", request.result);
        resolve((<any>evt.target).result);
      };
    });
  }
}
