import { WardleyBuilder, type WardleyBuildResult } from './builder.js';
import type { WardleyAst } from './parser.js';
export interface WardleyModel extends WardleyBuildResult {
    type: 'wardley';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
}
export declare function populate(ast: WardleyAst, db: WardleyBuilder): void;
export declare function buildWardley(ast: WardleyAst, title: string | undefined): WardleyModel;
