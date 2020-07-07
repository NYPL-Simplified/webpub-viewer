import { base64ToArrayBuffer } from "./utils";

export async function generateKey() {
  var algo = {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: "SHA-1" }
  };
  var extractable = false;
  var keyUsages: KeyUsage[] = ["wrapKey", "unwrapKey", "encrypt", "decrypt"];
  let generatedKey = await window.crypto.subtle.generateKey(algo, extractable, keyUsages);
  
  return <CryptoKeyPair>generatedKey; 
}

function separateIvFromData(arr: Uint8Array) {
  const _ivLenHeaderSize = 4;

  var slicedArr = arr.slice(0, _ivLenHeaderSize);
  let ivLen = new DataView(slicedArr.buffer).getUint32(0, true);

  var iv = arr.slice(_ivLenHeaderSize, ivLen + _ivLenHeaderSize);
  var data = arr.slice(ivLen + _ivLenHeaderSize);
  return { iv: iv, data: data };
}

export async function aesDecrypt(privateKey: CryptoKey, encrypted: Uint8Array) {
  // # Decrypt an encrypted file using a (previously decrypted) content key.

  const parts = separateIvFromData(encrypted);

  const iv = parts.iv;
  const payload = parts.data;
  return await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    privateKey, //from generateKey or importKey above
    payload //ArrayBuffer of the data
  );
}

export async function unwrapKey(encrypted_key: any, privateKey: CryptoKey) {
  const algo = { name: "AES-CBC", length: 256 };

  //Currently using license document version 1, so the algorithm is not accurate.
  var wrapperKeyAlgo = {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: "SHA-1"
  };

  var wrappedKey = base64ToArrayBuffer(encrypted_key);

  return await window.crypto.subtle.unwrapKey(
    "raw", //the import format, must be "raw" (only available sometimes)
    wrappedKey, //the key you want to unwrap
    privateKey, //the private key with "unwrapKey" usage flag
    wrapperKeyAlgo,
    algo,
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //the usages you want the unwrapped key to have
  );
}
