interface ErrorOptions {
    code?: string;
    cause?: Error;
    expected?: boolean;
    transient?: boolean;
}
declare class ModuleError extends Error {
    code: string | undefined;
    expected: boolean | undefined;
    transient: boolean | undefined;
    cause: Error | undefined;
    /**
     * @param {string} message Error message
     * @param {{ code?: string, cause?: Error, expected?: boolean, transient?: boolean }} [options]
     */
    constructor(message: string, options: ErrorOptions);
}
declare class UnexpectedAssetTypeError extends ModuleError {
    constructor(assetType: string);
}
declare class UnsupportedChainId extends ModuleError {
    constructor(chainId: number);
}
export { ModuleError, UnexpectedAssetTypeError, UnsupportedChainId };
