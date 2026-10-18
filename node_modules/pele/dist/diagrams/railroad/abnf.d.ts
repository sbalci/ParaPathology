import type { TokenType } from '../common/tokens.js';
import { type Grammar } from './common.js';
import type { RailroadRule } from './types.js';
export declare const ABNF_TOKENS: readonly TokenType[];
export type AbnfPrimary = {
    $type: 'AbnfStringLiteral' | 'AbnfNumVal';
    value: string;
} | {
    $type: 'AbnfRuleName';
    name: string;
} | {
    $type: 'AbnfGroup' | 'AbnfOptionalGroup';
    element: AbnfAlternation;
};
export interface AbnfElement {
    $type: 'AbnfElement';
    repeat?: string;
    primary: AbnfPrimary;
}
export interface AbnfConcatenation {
    $type: 'AbnfConcatenation';
    elements: AbnfElement[];
}
export interface AbnfAlternation {
    $type: 'AbnfAlternation';
    alternatives: AbnfConcatenation[];
}
export interface AbnfRule {
    $type: 'AbnfRule';
    name: string;
    definition: AbnfAlternation;
}
export type AbnfAst = Grammar<'RailroadAbnf', AbnfRule>;
export declare function parseAbnf(src: string): AbnfAst;
export declare const abnfRules: (ast: AbnfAst) => RailroadRule[];
