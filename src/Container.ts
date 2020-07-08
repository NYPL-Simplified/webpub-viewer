export default class Container {
    // public static async getContainer(containerUrl: URL, store?: Store): Promise<Container> {

    //     const manifestJSON = await window
    //           .fetch(containerUrl.href)
    //           .then((response) => response.text())
    //           .then((str) =>
    //             new window.DOMParser().parseFromString(str, "text/xml")
    //           )
    //           .then((data) => JSON.stringify(xmlToJson(data)));
  
    //     if (store) {
    //       await store.set("manifest", JSON.stringify(manifestJSON));
    //     }
    //     return new Manifest(
    //       JSON.parse(JSON.stringify(manifestJSON)),
    //       manifestUrl
    //     );    
    // }
}