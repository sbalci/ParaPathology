export declare const enum T {
    END = 0,
    STUCK = 1,
    SANKEY = 2,
    NEWLINE = 3,
    COMMA = 4,
    DQUOTE = 5,
    NON_ESCAPED_TEXT = 6,
    ESCAPED_TEXT = 7,
    EOF = 8
}
export declare const TOKEN_NAMES: readonly string[];
export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
}
export declare function tokenize(src: string): Tokens;
