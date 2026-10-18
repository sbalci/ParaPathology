export interface Tokens {
    types: number[];
    starts: number[];
    ends: number[];
}
export declare function tokenize(src: string): Tokens;
