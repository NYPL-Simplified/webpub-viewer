export default interface Decryptor {
    decryptUrl(resourceUrl: string): Promise<Uint8Array>;
}
