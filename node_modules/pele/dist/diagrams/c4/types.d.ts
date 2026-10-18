export interface C4Named {
    key: string;
    value: string;
}
export type C4Attr = string | C4Named;
export interface C4Element {
    alias: string;
    label: string;
    aliasAttr?: C4Named;
    labelAttr?: C4Named;
    parent: C4Boundary | undefined;
    type?: string;
    descr?: string;
    techn?: string;
    sprite?: string;
    tags?: string;
    link?: string;
    bgColor?: string;
    fontColor?: string;
    borderColor?: string;
    shadowing?: string;
    shape?: string;
    legendText?: string;
    legendSprite?: string;
    extra?: Map<string, string>;
}
export interface C4Shape extends C4Element {
    kind: string;
}
export interface C4Boundary extends C4Element {
    nodeType?: string;
}
export interface C4Rel {
    type: string;
    from: string;
    to: string;
    label: string;
    fromAttr?: C4Named;
    toAttr?: C4Named;
    labelAttr?: C4Named;
    techn?: string;
    descr?: string;
    sprite?: string;
    tags?: string;
    link?: string;
    textColor?: string;
    lineColor?: string;
    offsetX?: number;
    offsetY?: number;
    extra?: Map<string, string>;
}
export interface C4Model {
    type: 'c4';
    c4Type: string | undefined;
    title?: string;
    accTitle?: string;
    accDescr?: string;
    shapes: C4Shape[];
    boundaries: C4Boundary[];
    rels: C4Rel[];
    shapeInRow: number;
    boundaryInRow: number;
}
