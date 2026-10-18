export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
}
export declare function lineEnd(src: string, from: number): number;
export declare function keywordAt(src: string, p: number, word: string): boolean;
export declare function skipTrivia(src: string, from: number): number;
export declare function accessibility(src: string, p: number, out: Tokens, first: number): number;
