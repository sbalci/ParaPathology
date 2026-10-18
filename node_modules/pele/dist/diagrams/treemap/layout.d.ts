import type { TreemapNode } from './model.js';
export interface Box {
    node: TreemapNode;
    parent: Box | undefined;
    series: number;
    value: number;
    children: Box[];
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface Insets {
    gap: number;
    header: number;
    side: number;
}
export declare function layoutTreemap(roots: TreemapNode[], width: number, height: number, insets: Insets): Box[];
