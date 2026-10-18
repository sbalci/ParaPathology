import { type TokenType } from '../common/tokens.js';
export declare const CYNEFIN_TOKENS: readonly TokenType[];
export type DomainName = 'complex' | 'complicated' | 'clear' | 'chaotic' | 'confusion';
export interface DomainBlockAst {
    $type: 'DomainBlock';
    domain: DomainName;
    items: {
        $type: 'DomainItem';
        label: string;
    }[];
}
export interface TransitionAst {
    $type: 'Transition';
    from: DomainName;
    to: DomainName;
    label?: string;
}
export interface CynefinAst {
    $type: 'Cynefin';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    domains: DomainBlockAst[];
    transitions: TransitionAst[];
}
export declare function parseCynefin(src: string): CynefinAst;
