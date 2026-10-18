import type { ArchEdge, ArchGroup, ArchLayoutHint, ArchNode } from './db.js';
import type { Side } from './parser.js';
export interface Grid {
    col: Int32Array;
    row: Int32Array;
    groupCol: Int32Array;
    groupRow: Int32Array;
    groupCols: Int32Array;
    groupRows: Int32Array;
    groupParent: Int32Array;
    groupEmpty: Uint8Array;
    nodeParent: Int32Array;
}
export declare function sideIndex(side: Side): number;
export declare function placeOnGrid(nodes: ArchNode[], groups: ArchGroup[], edges: ArchEdge[], hints: ArchLayoutHint[]): Grid;
