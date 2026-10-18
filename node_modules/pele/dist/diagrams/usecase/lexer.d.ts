export interface Tokens {
    types: number[];
    starts: number[];
    ends: number[];
}
export declare function lineColumn(src: string, offset: number): [number, number];
export declare function locationText(src: string, start: number, end: number): string;
export declare function tokenize(src: string): Tokens;
