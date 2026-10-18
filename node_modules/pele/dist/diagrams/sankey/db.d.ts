export interface SankeyNode {
    id: string;
    index: number;
}
export interface SankeyLink {
    source: SankeyNode;
    target: SankeyNode;
    value: number;
}
export interface SankeyModel {
    type: 'sankey';
    nodes: SankeyNode[];
    links: SankeyLink[];
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
export declare class SankeyDb implements SankeyModel {
    readonly type: 'sankey';
    nodes: SankeyNode[];
    links: SankeyLink[];
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private lookup;
    findOrCreateNode(id: string): SankeyNode;
    addLink(source: SankeyNode, target: SankeyNode, value: number): void;
}
