export declare const SHAPE_ALIASES: ReadonlyMap<string, string>;
export declare const REMOVED_SHAPES: ReadonlySet<string>;
export declare const ALLOWED_SHAPES: ReadonlySet<string>;
export declare const DEFAULT_SHAPE = "roundedRect";
export declare function resolveShapeAlias(shape: string | undefined): string | undefined;
export declare function isValidShape(name: string): boolean;
export interface ShapeSink {
    emitError(id: 'SHAPE_REMOVED', message: string, ctx: {
        nodeId: string;
    }): void;
    emitWarning(id: 'SHAPE_UNSUPPORTED', message: string, ctx: {
        nodeId: string;
    }): void;
}
interface ShapedNode {
    id: string;
    shape?: string;
    isGroup?: boolean;
}
export declare function normaliseNodeShapes(nodes: ShapedNode[], sink: ShapeSink): void;
export {};
