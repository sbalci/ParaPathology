import type { YamlValue } from '../../util/yaml.js';
export type LabelType = 'text' | 'string' | 'markdown';
export interface FlowText {
    text: string;
    type: LabelType;
}
export interface FlowNode {
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
    icon?: string;
    form?: string;
    pos?: string;
    img?: string;
    constraint?: string;
    assetWidth?: number;
    assetHeight?: number;
}
export interface FlowEdge {
    start: string;
    end: string;
    type?: string;
    text: string;
    labelType: LabelType;
    stroke?: string;
    length?: number;
    style?: string[];
    classes: string[];
    id?: string;
    isUserDefinedId: boolean;
    interpolate?: string;
    animate?: boolean;
    animation?: string;
}
export interface FlowClassDef {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface FlowSubgraph {
    id: string;
    nodes: string[];
    title: string;
    classes: string[];
    dir?: string;
    labelType: LabelType;
    metadata?: Record<string, YamlValue>;
}
export interface LinkInfo {
    type: string;
    stroke: string;
    length?: number;
    text?: FlowText;
    id?: string;
}
export type DocItem = string | string[] | {
    stmt: 'dir';
    value: string;
};
export interface FlowchartModel {
    type: 'flowchart';
    direction: string | undefined;
    nodes: Map<string, FlowNode>;
    edges: FlowEdge[];
    subgraphs: FlowSubgraph[];
    classes: Map<string, FlowClassDef>;
    tooltips: Map<string, string>;
    defaultEdgeStyle?: string[];
    defaultInterpolate?: string;
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
