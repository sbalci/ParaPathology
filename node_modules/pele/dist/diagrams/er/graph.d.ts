import type { ErAttribute, ErModel } from './types.js';
export interface ErGraphNode {
    id: string;
    label: string;
    alias: string;
    attributes: ErAttribute[];
    isGroup: boolean;
    parentId: string | undefined;
    cssStyles: string[];
    cssCompiledStyles: string[];
    cssClasses: string;
    dir: string | undefined;
    labelType: string;
}
export interface ErGraphEdge {
    id: string;
    start: string;
    end: string;
    label: string;
    arrowTypeStart: string;
    arrowTypeEnd: string;
    pattern: 'solid' | 'dashed';
}
export interface ErGraph {
    nodes: ErGraphNode[];
    edges: ErGraphEdge[];
}
export declare function buildErGraph(model: ErModel): ErGraph;
