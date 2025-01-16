declare module 'crypt' {
    class Crypt {
        static stringToArrayBufferInUtf8(str: string): Uint8Array;
        static utf8ArrayBufferToString(strBuffer: Uint8Array): string;
        static arrayBufferToBase64(strBuffer: Uint8Array): string;
        static base64ToArrayBuffer(base64: string): Uint8Array;
    }
    export default Crypt;
}
