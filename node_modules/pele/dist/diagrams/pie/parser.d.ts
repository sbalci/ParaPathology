import { type TokenType } from '../common/tokens.js';
export declare const PIE_TOKENS: readonly TokenType[];
export interface PieAst {
    $type: 'Pie';
    showData: boolean;
    title?: string;
    accTitle?: string;
    accDescr?: string;
    sections: {
        $type: 'PieSection';
        label: string;
        value: number;
    }[];
}
export declare function parsePie(src: string): PieAst;
