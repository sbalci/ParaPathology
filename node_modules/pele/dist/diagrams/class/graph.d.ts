import type { ClassModel, ClassNode } from './types.js';
export type NodeShape = 'rect' | 'classBox' | 'note' | 'interface';
export type EndMarker = 'aggregation' | 'extension' | 'composition' | 'dependency' | 'lollipop' | 'none';
export interface GraphNode {
    id: string;
    label: string;
    isGroup: boolean;
    shape: NodeShape;
    parentId: string | undefined;
    parent: number;
    classNode?: ClassNode;
    colorIndex?: number;
}
export interface GraphEdge {
    id: string;
    start: string;
    end: string;
    source: number;
    target: number;
    label: string | undefined;
    arrowTypeStart: EndMarker;
    arrowTypeEnd: EndMarker;
    startLabelRight: string;
    endLabelLeft: string;
    pattern: 'solid' | 'dashed' | 'dotted';
    classes: string;
}
export interface ClassGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}
export declare function buildClassGraph(model: ClassModel, hierarchical?: boolean): ClassGraph;
