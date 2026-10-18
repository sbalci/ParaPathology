import type { PieAst } from './parser.js';
export interface PieModel {
    type: 'pie';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    showData: boolean;
    sections: Map<string, number>;
}
export declare function buildPie(ast: PieAst, title: string | undefined): PieModel;
