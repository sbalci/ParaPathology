import type { SankeyModel } from './db.js';
export type Alignment = 'justify' | 'left' | 'right' | 'center';
export interface LayoutOptions {
    width: number;
    height: number;
    nodeWidth: number;
    nodePadding: number;
    labelHeight: number;
    alignment: Alignment;
}
export interface PlacedNode {
    layer: number;
    value: number;
    x: number;
    y: number;
    height: number;
}
export interface PlacedLink {
    source: number;
    target: number;
    value: number;
    thickness: number;
    sourceY: number;
    targetY: number;
}
export interface SankeyLayout {
    nodes: PlacedNode[];
    links: PlacedLink[];
}
export declare function layoutSankey(model: SankeyModel, options: LayoutOptions): SankeyLayout;
