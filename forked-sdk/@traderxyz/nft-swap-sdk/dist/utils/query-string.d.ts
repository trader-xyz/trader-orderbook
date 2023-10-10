declare const parse: (str: string, decode?: typeof decodeURIComponent) => Record<string, any>;
declare const stringify: (obj: Record<string, any>, encode?: typeof encodeURIComponent) => string;
export { parse, stringify };
