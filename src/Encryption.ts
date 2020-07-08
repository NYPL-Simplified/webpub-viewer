import Store from "./Store";
import * as Utils from "./Utils";

/* Encryption is constructed from Encryption.xml */
export default class Encryption {
  public readonly encryptionUrl: URL;
  public readonly resources: string[];
  /* Fetch Package Document (OEBPS package file) or Webpub Manifest (manifest.json)*/
  public static async getEncryption(
    encryptionUrl: URL,
    store?: Store
  ): Promise<Encryption> {
    const fetchEncryption = async (): Promise<Encryption> => {
        console.log("encryptionUrl", encryptionUrl);
      const encryption = await window 
            .fetch(encryptionUrl.href)
            .then((response) => response.text())
            .then((str) => 
              new DOMParser().parseFromString(str, "text/xml")
            )
            .then((data) => JSON.stringify(Utils.xmlToJson(data)));
      
      if (store) {
        await store.set("encryption", JSON.stringify(encryption));
      }
      return new Encryption(JSON.parse(JSON.stringify(encryption)), encryptionUrl);
    };

    // Respond immediately with the encryption from the store, if possible.
    if (store) {
      // const encryptionString = await store.get("encryption");
      const encryptionString = undefined;
      if (encryptionString) {
        return new Encryption(encryptionString, encryptionUrl);
      }
    }

    return fetchEncryption();
  }

  private getEncryptedResourceList(encryptionString: any) {
    let encryptionData = JSON.parse(encryptionString);
    return encryptionData.encryption["enc:EncryptedData"].map((data: { [x: string]: { [x: string]: { [x: string]: any; }; }; }) => {
      return data["enc:CipherData"]["enc:CipherReference"]["@attributes"].URI;
    });
  } 

  public constructor(encryptionString: any, encryptionUrl: URL) {
    this.resources = this.getEncryptedResourceList(encryptionString);
    console.log("encryption resources", this.resources);
    this.encryptionUrl = encryptionUrl;
  }
}