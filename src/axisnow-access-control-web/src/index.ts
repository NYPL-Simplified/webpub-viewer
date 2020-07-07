import pako from "pako";

import { aesDecrypt, generateKey, unwrapKey } from "./encryption";
import * as utils from "./utils";

const baseUrl = "https://node.axisnow.com/content/stream/";

//TODO: Set up IndexDBStorage to properly store this
let keyPair: CryptoKeyPair;

async function get(url: string, format: string) {
  let response: Response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error("Could not fetch ", url, err);
    return;
  }
  switch (format) {
    case "xml":
      const text = await response.text();
      const parser = new DOMParser();
      return parser.parseFromString(text, "text/xml");
    case "json":
      return await response.json();
    case "arrayBuffer":
      const buffer = await response.arrayBuffer();
      return new Uint8Array(buffer);
    default:
      return;
  }
}

export async function generateKeyPair() {
  if (!keyPair) {
    return await generateKey();
  } else {
    return keyPair;
  }
}

export async function getContentKey(
  bookVaultId: string,
  isbn: string,
  clientIp: string = "192.168.0.1", 
  deviceId: string
) {
  if (!keyPair) {
    keyPair = await generateKey();
  }

  window.crypto.subtle.exportKey("jwk", keyPair.publicKey).then(async key => {
    var modulus = key.n;
    var exponent = key.e;

    // # Build the URL to the license document.
    let license_template = "https://node.axisnow.com/license/{bookVaultId}/{deviceId}/{clientIp}/{isbn}/{modulus}/{exponent}"
      .replace("bookVaultId", bookVaultId)
      .replace("isbn", isbn)
      .replace("{clientIp}", clientIp)
      .replace("{deviceId}", deviceId)
      .replace("{modulus}", modulus!)
      .replace("{exponent}", exponent!);

    // # Retrieve the license document
    const license = await get(license_template, "json");

    // # Get the key fromt he license file
    const content_key_encrypted =
      license.encryption.content_key.encrypted_value;

    return await unwrapKey(content_key_encrypted, keyPair.privateKey);
  });
}

export async function getEncryptionFile(encryptionFileUrl: string) {
  const encryption = await get(encryptionFileUrl, "xml");
  return encryption.getElementsByTagName("enc:EncryptedData");
}

export async function decrypt(encryptedUrl: string, contentKey:CryptoKey) {
  let encryption_parsed = await getEncryptionFile(encryptedUrl);
  // # Grab every resource mentioned in the encryption document.
  Array.from(encryption_parsed).forEach(async (data_block: any) => {
    let relative_url = data_block
      .getElementsByTagName("enc:CipherReference")
      .item(0);
    let uri = relative_url!.getAttribute("URI");
    var fullPath = baseUrl + uri;
    get(fullPath, "arrayBuffer").then(async (encrypted_chapter: Uint8Array) => {
      if (encrypted_chapter) {
        const decrypted_chapter = await aesDecrypt(
          contentKey,
          encrypted_chapter
        );
        let data = new Uint8Array(decrypted_chapter);
        let output = pako.inflateRaw(data);
        console.log("decode", utils.ab2str(output));
      }
    });
  });
}
