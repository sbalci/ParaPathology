import { type StateGraph } from './graph.js';
import type { StateBuilder } from './parser.js';
import type { StateClassDef, StateLink, StateModel, StateNote, StateRelation, StateStmt, Stmt } from './types.js';
export declare class StateDb implements StateModel, StateBuilder {
    readonly type: 'state';
    rootDoc: Stmt[];
    states: Map<string, StateStmt>;
    relations: StateRelation[];
    classes: Map<string, StateClassDef>;
    links: Map<string, StateLink>;
    graph: StateGraph;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private dividerCount;
    get direction(): string;
    setRootDoc(doc: Stmt[]): void;
    extract(statements: Stmt[] | {
        doc: Stmt[];
    }): void;
    translate(): void;
    addState(id: string, type?: string, doc?: Stmt[], descr?: string | string[], note?: StateNote, classes?: string[]): void;
    getState(id: string): StateStmt | undefined;
    addLink(stateId: string, url: string, tooltip: string): void;
    addRelation(item1: StateStmt, item2: StateStmt, title?: string): void;
    addDescription(id: string, descr: string): void;
    getDividerId(): string;
    addStyleClass(id: string, styleAttributes?: string): void;
    setCssClass(itemIds: string, cssClassName: string): void;
    getDirection(): string;
    setDirection(dir: string): void;
    trimColon(text: string): string;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    private named;
}
