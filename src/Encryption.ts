import Store from "./Store";
import * as Utils from "./Utils";
import { Decryptor } from "index";


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

 getEncryptedResourceList(encryptionString: any) {
    let encryptionData = JSON.parse(encryptionString);
    return encryptionData.encryption["enc:EncryptedData"].map((data: { [x: string]: { [x: string]: { [x: string]: any; }; }; }) => {
      return data["enc:CipherData"]["enc:CipherReference"]["@attributes"].URI;
    });
  } 

  constructor(encryptionString: any, encryptionUrl: URL) {
    this.resources = this.getEncryptedResourceList(encryptionString);
    this.encryptionUrl = encryptionUrl;
  }

  isEncrypted(resource: string):boolean {
    return this.resources.some((encryptedResource: string) => {
      return resource.includes(encryptedResource);
    });
  }

  async decryptBlob(blob: Blob, decryptor: Decryptor) {
    let blobUrl = URL.createObjectURL(blob);
    let decrypted = await decryptor!.decryptUrl(blobUrl);
    URL.revokeObjectURL(blobUrl);
    return new DOMParser().parseFromString(decrypted, "application/xhtml+xml")
      .documentElement.innerHTML;
  }
  
  async getDecryptedImageUrl(blob: Blob, decryptor: Decryptor) {
    let blobUrl = URL.createObjectURL(blob);
    let decrypted = await decryptor!.decryptImg(blobUrl);
    let imgBlob = new Blob([decrypted]);
    return URL.createObjectURL(imgBlob);
  }
  
}