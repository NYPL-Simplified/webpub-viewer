export default interface Decryptor {
    decrypt(resourceUrl: string): Promise<void>;
}