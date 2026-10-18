import type { StateClassDef, StateStmt, Stmt } from './types.js';
export interface StateNode {
    id: string;
    shape: string | undefined;
    label: string | undefined;
    description: string[];
    cssClasses: string;
    cssCompiledStyles: string[];
    cssStyles: string[];
    type: string | undefined;
    isGroup: boolean;
    parentId?: string;
    dir: string | undefined;
    position?: string;
    noteFor?: string;
    colorIndex?: number;
}
export interface StateEdge {
    id: string;
    start: string;
    end: string;
    label: string;
    classes: string;
    pattern?: 'dashed';
}
export interface StateGraph {
    nodes: StateNode[];
    edges: StateEdge[];
}
export declare function buildStateGraph(rootDoc: Stmt[], states: Map<string, StateStmt>, classes: Map<string, StateClassDef>): StateGraph;
