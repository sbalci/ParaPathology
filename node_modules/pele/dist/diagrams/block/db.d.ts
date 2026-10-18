import type { Block, BlockClassDef, BlockModel, Statement } from './types.js';
export interface BlockDbOptions {
    warn?: (message: string) => void;
}
export declare function typeStr2Type(typeStr: string | undefined): string;
export declare function edgeStrToEdgeData(typeStr: string): string;
export declare function edgeStrToEdgeStartData(typeStr: string): string;
export declare function edgeStrToThickness(typeStr: string): string;
export declare function edgeStrToPattern(typeStr: string): string;
export declare class BlockDb implements BlockModel {
    type: 'block';
    title: string | undefined;
    root: Block;
    blocks: Block[];
    edges: Block[];
    classes: Map<string, BlockClassDef>;
    byId: Map<string, Block>;
    typeStr2Type: typeof typeStr2Type;
    edgeStrToEdgeData: typeof edgeStrToEdgeData;
    edgeStrToEdgeStartData: typeof edgeStrToEdgeStartData;
    edgeStrToThickness: typeof edgeStrToThickness;
    edgeStrToPattern: typeof edgeStrToPattern;
    private warn;
    private pending;
    private edgeCount;
    private ids;
    private colors;
    private spaces;
    constructor(options?: BlockDbOptions);
    generateId(): string;
    addStyleClass(id: string, styleAttributes?: string): void;
    addStyle2Node(id: string, styles?: string): void;
    setCssClass(itemIds: string, cssClassName: string): void;
    private named;
    setHierarchy(statements: Statement[]): void;
}
