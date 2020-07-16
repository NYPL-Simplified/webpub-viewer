export default interface Decryptor {
    decryptXmlString(resource: string): Promise<string>;
    decryptUrl(resourceUrl: string): Promise<string>;
}