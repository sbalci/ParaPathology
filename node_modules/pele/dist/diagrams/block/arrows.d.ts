export declare const RIGHT = 1;
export declare const LEFT = 2;
export declare const UP = 4;
export declare const DOWN = 8;
export declare const OVERHANG = 7;
export interface ArrowSize {
    w: number;
    h: number;
    dx: number;
    dy: number;
}
export declare function arrowMask(directions: string[] | undefined): number;
export declare function arrowAxis(mask: number): 'x' | 'y' | '';
export declare function arrowSize(mask: number, tw: number, th: number): ArrowSize;
export declare function drawArrow(mask: number, w: number, h: number, attrs: string): string;
