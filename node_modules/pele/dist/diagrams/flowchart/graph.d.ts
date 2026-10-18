import type { YamlValue } from '../../util/yaml.js';
import type { FlowDb } from './db.js';
import type { FlowchartModel, LabelType } from './types.js';
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
    icon?: string;
    pos?: string;
    img?: string;
    assetWidth?: number;
    assetHeight?: number;
    constraint?: string;
    colorIndex?: number;
    metadata?: Record<string, YamlValue>;
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
    animate: boolean | undefined;
    animation: string | undefined;
    curve: string | undefined;
}
export interface FlowGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}
export declare function buildFlowGraph(model: FlowchartModel & Pick<FlowDb, 'subgraph'>, defaultCurve?: string): FlowGraph;
