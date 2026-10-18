export declare function seededRandom(seed: number): number;
export declare function hashString(str: string): number;
export declare function resolveSeed(configured: number | undefined, id: string): number;
export interface WaveOptions {
    segments: number;
    vertical: boolean;
    pointStep: number;
    controlStep: number;
    controlShift: number;
    pinStart?: boolean;
    pinEnd?: boolean;
}
export declare const FOLD: WaveOptions;
export declare const HORIZON: WaveOptions;
export declare function wave(from: number, to: number, center: number, seed: number, amplitude: number, o: WaveOptions): number[];
export declare function cliff(cx: number, top: number, bottom: number, amplitude: number): number[];
export declare function forward(curve: number[]): string;
export declare function backward(curve: number[]): string;
export declare function curvePath(curve: number[]): string;
export declare function ellipsePath(cx: number, cy: number, rx: number, ry: number): string;
