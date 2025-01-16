declare module 'sm4' {
    interface SM4Config {
        key: string;
        iv?: string;
        mode?: 'cbc' | 'ecb';
        outType?: 'base64' | 'text';
    }

    class SM4 {
        key: Uint8Array;
        iv: Uint8Array;
        mode: 'cbc' | 'ecb';
        cipherType: 'base64' | 'text';
        encryptRoundKeys: Uint32Array;
        decryptRoundKeys: Uint32Array;

        constructor(config: SM4Config);
        doBlockCrypt(blockData: Uint32Array, roundKeys: Uint32Array): Uint32Array;
        spawnEncryptRoundKeys(): void;
        rotateLeft(x: number, y: number): number;
        linearTransform1(b: number): number;
        linearTransform2(b: number): number;
        tauTransform(a: number): number;
        tTransform1(z: number): number;
        tTransform2(z: number): number;
        padding(originalBuffer: Uint8Array): Uint8Array;
        dePadding(paddedBuffer: Uint8Array): Uint8Array;
        uint8ToUint32Block(uint8Array: Uint8Array, baseIndex?: number): Uint32Array;
        encrypt(plaintext: string): string;
        decrypt(ciphertext: string): string;
    }

    export default SM4;
}
