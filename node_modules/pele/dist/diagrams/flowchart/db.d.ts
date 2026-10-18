import type { DocItem, FlowClassDef, FlowEdge, FlowNode, FlowSubgraph, FlowText, FlowchartModel, LinkInfo } from './types.js';
export interface FlowDbOptions {
    maxEdges?: number;
    inheritDir?: boolean;
    direction?: string;
    warn?: (message: string) => void;
}
export declare class FlowDb implements FlowchartModel {
    readonly type: 'flowchart';
    direction: string | undefined;
    nodes: Map<string, FlowNode>;
    edges: FlowEdge[];
    subgraphs: FlowSubgraph[];
    classes: Map<string, FlowClassDef>;
    tooltips: Map<string, string>;
    defaultEdgeStyle: string[] | undefined;
    defaultInterpolate: string | undefined;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private subgraphLookup;
    private members;
    private edgeById;
    private pairCount;
    private subCount;
    private options;
    constructor(options?: FlowDbOptions);
    addVertex(id: string, textObj?: FlowText, type?: string, style?: string[] | null, classes?: string[] | null, dir?: string, props?: Record<string, string>, metadata?: string): void;
    addSingleLink(start: string, end: string, type: LinkInfo | undefined, id?: string): void;
    addLink(starts: string[], ends: string[], linkData: LinkInfo | undefined): void;
    updateLinkInterpolate(positions: (string | number)[], interpolate: string): void;
    updateLink(positions: (string | number)[], style: string[]): void;
    private edgeAt;
    addClass(ids: string, styles: string[]): void;
    setDirection(dir: string): void;
    setClass(ids: string, className: string): void;
    setTooltip(ids: string, tooltip: string | undefined): void;
    setLink(ids: string, link: string, target?: string): void;
    setClickEvent(ids: string, _functionName?: string, _functionArgs?: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    addSubGraph(idText: {
        text: string;
    } | undefined, list: DocItem[], titleText: {
        text: string;
        type?: string;
    } | undefined): string;
    exists(all: FlowSubgraph[], id: string): boolean;
    makeUniq(sg: FlowSubgraph, all: FlowSubgraph[]): {
        nodes: string[];
    };
    destructLink(end: string, start?: string): {
        type: string;
        stroke: string;
        length?: number;
    };
    subgraph(id: string): FlowSubgraph | undefined;
}
