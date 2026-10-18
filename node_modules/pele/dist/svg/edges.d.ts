import type { Label } from '../text/label.js';
import type { IconResolver } from '../types.js';
export declare const ARROW = 8;
export interface EdgePath {
    d: string;
    sx: number;
    sy: number;
    sdx: number;
    sdy: number;
    ex: number;
    ey: number;
    edx: number;
    edy: number;
}
export declare const LEAD = 6;
export declare function sideReach(): {
    add(node: number, side: number, type: string): void;
    of(node: number, side: number): number;
};
export declare function routePath(route: number[], curve: string | undefined, startTrim: number, endTrim: number, startReach?: number, endReach?: number): EdgePath;
export declare function markerTrim(type: string): number;
export declare function marker(type: string, x: number, y: number, dx: number, dy: number, color: string): string;
export declare function edgeLabelSvg(id: string, label: Label, x: number, y: number, attrs: string, icons?: IconResolver): string;
export declare function loopPath(c: {
    x: number;
    y: number;
}, w: number, h: number, k: number, sideways: boolean, base: number, trim: number, e: {
    labelW: number;
    labelH: number;
    labelX: number;
    labelY: number;
}): EdgePath;
