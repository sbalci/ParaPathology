export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
    locs: number[];
}
export declare function tokenize(src: string): Tokens;
