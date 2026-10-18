import type { TreemapAst } from './parser.js';
export interface TreemapNode {
    name: string;
    children?: TreemapNode[];
    value?: number;
    classSelector?: string;
    cssCompiledStyles?: string[];
}
export interface TreemapItem {
    level: number;
    name: string;
    type: string;
    value?: number;
    classSelector?: string;
    cssCompiledStyles?: string[];
}
export interface TreemapModel {
    type: 'treemap';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    roots: TreemapNode[];
    classes: Map<string, string[]>;
}
export declare function buildHierarchy(items: TreemapItem[]): TreemapNode[];
export declare function buildTreemap(ast: TreemapAst, title: string | undefined): TreemapModel;
