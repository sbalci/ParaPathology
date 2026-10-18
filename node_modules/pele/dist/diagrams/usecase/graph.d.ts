import { type ActorType, type Animation, type BoundaryType, type LabelType, type RelationshipType, type UsecaseJsonNode, type UsecaseModel } from './types.js';
export interface JsonRow {
    key: string;
    accessibleKey: string;
    value: string;
}
export interface UsecaseGraphNode {
    id: string;
    label: string;
    labelType: LabelType;
    shape: 'usecaseActor' | 'usecaseActorHollow' | 'usecaseActorAwesome' | 'usecaseActorIcon' | 'usecaseEllipse' | 'usecaseBusiness' | 'rect' | 'note' | 'usecaseJsonTable' | 'usecaseSystemBoundary';
    isGroup: boolean;
    padding: number;
    cssClasses: string;
    cssStyles: string[];
    cssCompiledStyles: string[];
    actorType?: ActorType;
    business?: boolean;
    icon?: string;
    stereotype?: string;
    parentId?: string;
    noteTarget?: string;
    jsonRows?: JsonRow[];
    boundaryType?: BoundaryType;
}
export interface UsecaseGraphEdge {
    id: string;
    start: string;
    end: string;
    relationshipType: RelationshipType | 'note';
    pattern: 'solid' | 'dotted';
    arrowTypeStart: string;
    arrowTypeEnd: string;
    label?: string;
    labelType?: LabelType;
    classes: string;
    style: string[];
    cssCompiledStyles: string[];
    animate: boolean;
    animation?: Animation;
    minlen: number;
    explicitId: boolean;
    internal: boolean;
}
export interface UsecaseGraph {
    nodes: UsecaseGraphNode[];
    edges: UsecaseGraphEdge[];
}
export declare function flattenJsonRows(json: Pick<UsecaseJsonNode, 'value' | 'propertyOrder'>): JsonRow[];
export declare function buildUsecaseGraph(model: UsecaseModel): UsecaseGraph;
