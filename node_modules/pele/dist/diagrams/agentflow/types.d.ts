import type { YamlValue } from '../../util/yaml.js';
export type LabelType = 'text' | 'string' | 'markdown';
export interface FlowText {
    text: string;
    type: LabelType;
}
export interface Loc {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
}
export type Metadata = Record<string, YamlValue>;
export type VertexKind = 'tool' | 'action' | 'input' | 'refdoc' | 'decision' | 'connector' | 'task';
export type EdgeSemantic = 'sequence' | 'reference' | 'failure';
export interface AgentNode {
    id: string;
    text?: string;
    labelType: LabelType;
    type?: string;
    styles: string[];
    classes: string[];
    dir?: string;
    props?: Record<string, string>;
    link?: string;
    linkTarget?: string;
    metadata?: Metadata;
    isConnector?: boolean;
}
export interface AgentEdge {
    start: string;
    end: string;
    type?: string;
    text: string;
    labelType: LabelType;
    stroke?: string;
    edgeSemantic?: EdgeSemantic;
    length?: number;
    style?: string[];
    classes: string[];
    id?: string;
    isUserDefinedId: boolean;
    interpolate?: string;
    animate?: YamlValue;
    animation?: YamlValue;
    metadata?: Metadata;
}
export interface AgentClassDef {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface AgentSubgraph {
    id: string;
    nodes: string[];
    title: string;
    classes: string[];
    dir?: string;
    labelType: LabelType;
    type: 'flow';
    metadata?: Metadata;
}
export interface LinkInfo {
    type: string;
    stroke: string;
    length?: number;
    edgeSemantic?: EdgeSemantic;
    text?: FlowText;
    id?: string;
}
export type DocItem = string | string[] | {
    stmt: 'dir';
    value: string;
};
export interface ElementPosition {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
    startIndex: number;
    endIndex: number;
}
export type StatementType = 'vertex' | 'edge' | 'subgraph' | 'connector' | 'attachment';
export interface ElementMapping {
    id: string;
    type: StatementType;
    position: ElementPosition;
}
export type DiagnosticId = 'SHAPE_UNSUPPORTED' | 'SHAPE_REMOVED' | 'EDGE_OPERATOR_UNSUPPORTED' | 'REFERENCE_EDGE_LABEL_REJECTED' | 'CONNECTOR_REF_UNRESOLVED' | 'CONNECTOR_REF_NOT_A_CONNECTOR' | 'METADATA_KEY_MISAPPLIED' | 'DUPLICATE_ID_NODE' | 'RESERVED_SYNTHETIC_ID' | 'CONTAINMENT_VIOLATION' | 'EDGE_SEMANTIC_CONTRADICTION' | 'FLOW_NO_INPUT';
export interface Diagnostic {
    id: DiagnosticId;
    severity: 'warning' | 'error';
    message: string;
    nodeId?: string;
    edgeId?: string;
    position?: ElementPosition;
}
export interface SemanticVertex {
    id: string;
    label?: string;
    shape?: string;
    vertexKind?: VertexKind;
    metadata?: Metadata;
}
export interface SemanticEdge {
    start: string;
    end: string;
    id?: string;
    label?: string;
    type?: string;
    stroke?: string;
    edgeSemantic?: EdgeSemantic;
    length?: number;
    metadata?: Metadata;
}
export interface SemanticSubgraph {
    id: string;
    type?: string;
    title?: string;
    nodes: string[];
    metadata?: Metadata;
    direction?: string;
}
export interface SemanticConnector {
    id: string;
    title?: string;
    metadata?: Metadata;
}
export interface SemanticModel {
    direction?: string;
    vertices: SemanticVertex[];
    edges: SemanticEdge[];
    subGraphs: SemanticSubgraph[];
    connectors: SemanticConnector[];
    diagnostics: readonly Diagnostic[];
}
export interface AgentflowModel {
    type: 'agentflow';
    direction: string | undefined;
    nodes: Map<string, AgentNode>;
    edges: AgentEdge[];
    subgraphs: AgentSubgraph[];
    connectors: Map<string, AgentNode>;
    classes: Map<string, AgentClassDef>;
    tooltips: Map<string, string>;
    defaultEdgeStyle?: string[];
    defaultInterpolate?: string;
    mappings: ElementMapping[];
    diagnostics: Diagnostic[];
    title?: string;
    accTitle?: string;
    accDescr?: string;
    semanticModel(): SemanticModel;
}
