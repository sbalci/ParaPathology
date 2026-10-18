export type Cardinality = 'ZERO_OR_ONE' | 'ZERO_OR_MORE' | 'ONE_OR_MORE' | 'ONLY_ONE' | 'MD_PARENT';
export type Identification = 'NON_IDENTIFYING' | 'IDENTIFYING';
export interface ErAttribute {
    type: string;
    name: string;
    keys: string[];
    comment: string;
}
export interface ParsedAttribute {
    type: string;
    name: string;
    keys?: string[];
    comment?: string;
}
export interface ErEntity {
    id: string;
    label: string;
    alias: string;
    attributes: ErAttribute[];
    cssClasses: string;
    cssStyles: string[];
}
export interface RelSpec {
    cardA: Cardinality;
    relType: Identification;
    cardB: Cardinality;
}
export interface ErRelationship {
    entityA: string;
    roleA: string;
    entityB: string;
    relSpec: RelSpec;
}
export interface ErClassDef {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface ErSubgraph {
    id: string;
    nodes: string[];
    title: string;
    classes: string[];
    cssStyles: string[];
    dir: string | undefined;
    labelType: 'text' | 'string' | 'markdown';
}
export type DocItem = string | {
    stmt: 'dir';
    value: string;
};
export interface ErModel {
    type: 'er';
    direction: string;
    entities: Map<string, ErEntity>;
    relationships: ErRelationship[];
    classes: Map<string, ErClassDef>;
    subgraphs: ErSubgraph[];
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
