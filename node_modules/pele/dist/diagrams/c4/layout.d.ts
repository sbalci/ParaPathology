import { type Label } from '../../text/label.js';
import { type TextMeasurer } from '../../text/measurer.js';
import type { C4Db } from './db.js';
import { type Box } from './route.js';
import type { C4Boundary, C4Element, C4Shape } from './types.js';
export declare const GROUP_PAD: number;
export declare const HEAD_LEFT = 16;
export declare const HEAD_TOP = 10;
export interface Node extends Box {
    shape: C4Shape;
    labels: Label[];
    textH: number;
}
export interface Group extends Box {
    boundary: C4Boundary;
    kids: Group[];
    nodes: Node[];
    labels: Label[];
    head: number;
    headW: number;
    headX: number;
}
export interface Layout {
    order: Group[];
    boxes: Map<C4Element, Box>;
}
export declare function layoutC4(db: C4Db, measurer: TextMeasurer, size: number, small: number, room: number | undefined, gap: number): Layout;
