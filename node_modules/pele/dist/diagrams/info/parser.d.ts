import { type TokenType } from '../common/tokens.js';
export declare const INFO_TOKENS: readonly TokenType[];
export interface InfoAst {
    $type: 'Info';
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
export declare function parseInfo(src: string): InfoAst;
