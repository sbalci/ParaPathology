export interface StateNote {
    position?: string;
    text: string;
}
export interface StateStmt {
    stmt: 'state';
    id: string;
    type?: string;
    description?: string | string[];
    descriptions?: string[];
    doc?: Stmt[];
    note?: StateNote;
    start?: boolean;
    classes?: string[];
    styles?: string[];
    textStyles?: string[];
}
export interface RelationStmt {
    stmt: 'relation';
    state1: StateStmt;
    state2: StateStmt;
    description?: string;
}
export interface ClassDefStmt {
    stmt: 'classDef';
    id: string;
    classes: string;
}
export interface StyleStmt {
    stmt: 'style';
    id: string;
    styleClass: string;
}
export interface ApplyClassStmt {
    stmt: 'applyClass';
    id: string;
    styleClass: string;
}
export interface DirectionStmt {
    stmt: 'dir';
    value: string;
}
export interface ClickStmt {
    stmt: 'click';
    id: StateStmt | string;
    url: string;
    tooltip: string;
}
export type Stmt = string | StateStmt | RelationStmt | ClassDefStmt | StyleStmt | ApplyClassStmt | DirectionStmt | ClickStmt;
export interface StateRelation {
    id1: string;
    id2: string;
    relationTitle?: string;
}
export interface StateClassDef {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface StateLink {
    url: string;
    tooltip: string;
}
export interface StateModel {
    type: 'state';
    direction: string;
    rootDoc: Stmt[];
    states: Map<string, StateStmt>;
    relations: StateRelation[];
    classes: Map<string, StateClassDef>;
    links: Map<string, StateLink>;
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
