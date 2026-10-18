import type { CNode } from '../layout/compound.js';
export interface ShapeSize {
    w: number;
    h: number;
    dy: number;
}
export declare const PAD_X = 18;
export declare const PAD_Y = 12;
export declare function shapeSize(shape: string, tw: number, th: number): ShapeSize;
export declare function drawShape(shape: string, w: number, h: number, a: string, line: string): string;
export declare function shapeInset(shape: string, w: number, h: number, side: number, t?: number): number;
export declare function shapeSpan(shape: string, w: number, h: number, sideways: boolean): number;
export declare function shapeHasLabel(shape: string): boolean;
export declare function endSide(route: number[], at: number, c: CNode): number;
export declare function insetRoute(route: number[], at: number, view: {
    shape: string;
    w: number;
    h: number;
}, c: CNode): void;
