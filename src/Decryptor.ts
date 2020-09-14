export default interface IDecryptor {
    decryptUrl(resourceUrl: string): Promise<Uint8Array>;
}

