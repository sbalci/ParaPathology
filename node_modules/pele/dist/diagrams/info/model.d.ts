import type { InfoAst } from './parser.js';
export interface InfoModel {
    type: 'info';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
}
export declare function buildInfo(ast: InfoAst, title: string | undefined): InfoModel;
