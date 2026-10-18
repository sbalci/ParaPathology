import type { VennSubset } from './types.js';
export interface Circle {
    id: string;
    x: number;
    y: number;
    r: number;
}
export interface Spot {
    x: number;
    y: number;
    margin: number;
}
export declare function ensurePairwiseSubsets(subsets: VennSubset[]): VennSubset[];
export declare function lensArea(r1: number, r2: number, d: number): number;
export declare function distanceForOverlap(r1: number, r2: number, area: number): number;
export declare function findSpot(circles: Circle[], inside: number[], outside: number[]): Spot;
export declare function layoutCircles(subsets: VennSubset[]): Circle[];
export declare function regionPath(circles: Circle[], format: (value: number) => string): string;
