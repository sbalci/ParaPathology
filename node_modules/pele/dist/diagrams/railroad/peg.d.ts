import type { TokenType } from '../common/tokens.js';
import { type Grammar } from './common.js';
import type { RailroadRule } from './types.js';
export declare const PEG_TOKENS: readonly TokenType[];
export type PegPrimary = {
    $type: 'PegLiteral';
    value: string;
} | {
    $type: 'PegIdentifier';
    name: string;
} | {
    $type: 'PegAny';
    dot: string;
} | {
    $type: 'PegGroup';
    element: PegChoice;
};
export interface PegSuffix {
    $type: 'PegSuffix';
    primary: PegPrimary;
    operator?: string;
}
export interface PegPrefix {
    $type: 'PegPrefix';
    operator?: string;
    suffix: PegSuffix;
}
export interface PegSequence {
    $type: 'PegSequence';
    elements: PegPrefix[];
}
export interface PegChoice {
    $type: 'PegOrderedChoice';
    alternatives: PegSequence[];
}
export interface PegRule {
    $type: 'PegRule';
    name: string;
    definition: PegChoice;
}
export type PegAst = Grammar<'RailroadPeg', PegRule>;
export declare function parsePeg(src: string): PegAst;
export declare const pegRules: (ast: PegAst) => RailroadRule[];
