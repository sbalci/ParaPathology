import type { TokenType } from '../common/tokens.js';
import { type Grammar } from './common.js';
import type { RailroadRule } from './types.js';
export declare const EBNF_TOKENS: readonly TokenType[];
export type EbnfPrimary = {
    $type: 'EbnfTerminal';
    value: string;
} | {
    $type: 'EbnfNonTerminal';
    name: string;
} | {
    $type: 'EbnfSpecial';
    text: string;
} | {
    $type: 'EbnfGroup' | 'EbnfOptional' | 'EbnfRepetition';
    element: EbnfChoice;
};
export type EbnfPostfix = {
    $type: 'EbnfOptionalPostfix' | 'EbnfZeroOrMorePostfix' | 'EbnfOneOrMorePostfix';
    operator: string;
} | {
    $type: 'EbnfExceptionPostfix';
    except: EbnfPrimary;
};
export interface EbnfTerm {
    $type: 'EbnfTerm';
    base: EbnfPrimary;
    postfixes: EbnfPostfix[];
}
export interface EbnfSequence {
    $type: 'EbnfSequence';
    elements: EbnfTerm[];
}
export interface EbnfChoice {
    $type: 'EbnfChoice';
    alternatives: EbnfSequence[];
}
export interface EbnfRule {
    $type: 'EbnfRule';
    name: string;
    definition: EbnfChoice;
}
export type EbnfAst = Grammar<'RailroadEbnf', EbnfRule>;
export declare function parseEbnf(src: string): EbnfAst;
export declare const ebnfRules: (ast: EbnfAst) => RailroadRule[];
