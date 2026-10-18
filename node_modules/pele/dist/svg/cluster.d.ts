import type { CNode } from '../layout/compound.js';
import type { Label } from '../text/label.js';
import { type IconResolver } from './builder.js';
export type Crossings = Map<number, number[]>;
export declare function markCrossings(crossings: Crossings, route: number[]): void;
export declare function clusterTitleX(c: CNode, width: number, crossings: Crossings, pad: number): number;
export declare function titleCrossed(c: CNode, width: number, x: number, crossings: Crossings): boolean;
export declare function struckTitle(label: Label, x: number, y: number, attrs: string, id: string, nodes: readonly {
    parent: number;
}[], index: number, icons?: IconResolver): string;
