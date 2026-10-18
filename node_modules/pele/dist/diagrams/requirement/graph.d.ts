import type { Requirement, RequirementElement, RequirementModel } from './types.js';
export interface GraphNode {
    id: string;
    requirement: Requirement | undefined;
    element: RequirementElement | undefined;
    cssStyles: string[];
    cssClasses: string;
}
export interface GraphEdge {
    id: string;
    start: string | undefined;
    end: string | undefined;
    type: string;
    contains: boolean;
}
export interface RequirementGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
    direction: string;
}
export declare function buildRequirementGraph(model: RequirementModel): RequirementGraph;
