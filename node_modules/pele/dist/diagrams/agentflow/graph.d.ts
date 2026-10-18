import type { AgentflowDb } from './db.js';
import type { LabelType, Metadata } from './types.js';
import type { YamlValue } from '../../util/yaml.js';
export interface GraphNode {
    id: string;
    label: string | undefined;
    labelType: LabelType;
    shape: string;
    isGroup: boolean;
    parentId: string | undefined;
    cssStyles: string[];
    cssCompiledStyles: string[];
    cssClasses: string;
    dir: string | undefined;
    link?: string;
    linkTarget?: string;
    tooltip?: string;
    colorIndex?: number;
    kind?: string;
    metadata?: Metadata;
}
export interface GraphEdge {
    id: string;
    isUserDefinedId: boolean;
    start: string;
    end: string;
    type: string;
    label: string;
    labelType: LabelType;
    thickness: string | undefined;
    pattern: string | undefined;
    minlen: number | undefined;
    arrowTypeStart: string;
    arrowTypeEnd: string;
    cssCompiledStyles: string[];
    style: string[];
    classes: string;
    animate: YamlValue | undefined;
    animation: YamlValue | undefined;
    curve: string | undefined;
    metadata: Metadata | undefined;
}
export interface AgentGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}
export declare function buildAgentGraph(db: AgentflowDb, paletteLength: number, defaultCurve?: string): AgentGraph;
