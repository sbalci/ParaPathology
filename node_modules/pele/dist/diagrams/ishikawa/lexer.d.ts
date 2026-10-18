export declare const enum T {
    END = 0,
    EOF = 1,
    SPACELINE = 2,
    NL = 3,
    ISHIKAWA = 4,
    SPACELIST = 5,
    TEXT = 6
}
export declare const TOKEN_NAMES: string[];
export interface Tokens {
    types: number[];
    starts: number[];
    ends: number[];
}
export declare function tokenize(src: string): Tokens;
