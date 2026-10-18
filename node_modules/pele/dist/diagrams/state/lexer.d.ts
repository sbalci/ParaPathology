export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
    error: string | undefined;
}
export declare function tokenize(src: string): Tokens;
