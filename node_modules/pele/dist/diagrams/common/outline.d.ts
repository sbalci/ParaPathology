export declare const enum T {
    END = 0,
    ERROR = 1,
    SPACELINE = 2,
    NL = 3,
    EOF = 4,
    KEYWORD = 5,
    SPACELIST = 6,
    ICON = 7,
    CLASS = 8,
    NODE_DSTART = 9,
    NODE_ID = 10,
    NODE_DESCR = 11,
    NODE_DEND = 12,
    SHAPE_DATA = 13
}
export declare function tokenName(type: number, kanban: boolean): string;
export interface Tokens {
    types: number[];
    texts: string[];
    starts: number[];
}
export declare const NODE_TYPE: {
    readonly DEFAULT: 0;
    readonly NO_BORDER: 0;
    readonly ROUNDED_RECT: 1;
    readonly RECT: 2;
    readonly CIRCLE: 3;
    readonly CLOUD: 4;
    readonly BANG: 5;
    readonly HEXAGON: 6;
};
export declare function getType(start: string, end: string): number;
export interface OutlineDb {
    getType(start: string, end: string): number;
    addNode(level: number, id: string, descr: string, type: number, shapeData?: string): void;
    decorateNode(decoration: {
        icon?: string;
        class?: string;
    }): void;
}
export declare function tokenize(src: string, kanban: boolean): Tokens;
export declare function parseOutline(src: string, db: OutlineDb, kanban: boolean): void;
