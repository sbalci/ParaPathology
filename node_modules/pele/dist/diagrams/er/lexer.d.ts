export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
}
export declare function tokenize(src: string): Tokens;
