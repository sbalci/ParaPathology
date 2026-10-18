export interface TokenType {
    name: string;
    pattern: string | RegExp;
    hidden?: boolean;
    opener?: RegExp;
    first?: string;
    longer?: readonly TokenType[];
    scanner?: () => Scanner;
    match?: Scanner;
}
export type Scanner = (src: string, at: number) => number;
export interface Tokens {
    kinds: number[];
    starts: number[];
    ends: number[];
    src: string;
}
export declare function tokenize(src: string, types: readonly TokenType[], diagram: string): Tokens;
export declare const ACC_DESCR: TokenType;
export declare const ACC_TITLE: TokenType;
export declare const TITLE: TokenType;
export declare const STRING: TokenType;
export declare const NEWLINE: TokenType;
export declare const WHITESPACE: TokenType;
export declare const YAML: TokenType;
export declare const DIRECTIVE: TokenType;
export declare const SINGLE_LINE_COMMENT: TokenType;
export declare function keyword(word: string): TokenType;
export declare function titleValue(text: string): string;
export declare function accTitleValue(text: string): string;
export declare function accDescrValue(text: string): string;
export declare function stringValue(text: string): string;
export declare class Reader {
    readonly tokens: Tokens;
    readonly types: readonly TokenType[];
    readonly diagram: string;
    i: number;
    readonly kinds: number[];
    constructor(tokens: Tokens, types: readonly TokenType[], diagram: string);
    get kind(): number;
    text(index?: number): string;
    take(): string;
    accept(kind: number): boolean;
    expect(kind: number): string;
    fail(expected: string): never;
}
