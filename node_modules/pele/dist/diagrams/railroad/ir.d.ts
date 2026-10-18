import type { TokenType } from '../common/tokens.js';
import { type Grammar } from './common.js';
import type { RailroadRule } from './types.js';
export declare const IR_TOKENS: readonly TokenType[];
export type IrExpression = {
    $type: 'RailroadSequenceExpr';
    elements: IrExpression[];
} | {
    $type: 'RailroadChoiceExpr';
    alternatives: IrExpression[];
} | {
    $type: 'RailroadOptionalExpr' | 'RailroadOneOrMoreExpr' | 'RailroadZeroOrMoreExpr';
    element: IrExpression;
} | {
    $type: 'RailroadTerminalExpr';
    value: string;
} | {
    $type: 'RailroadNonTerminalExpr';
    name: string;
} | {
    $type: 'RailroadSpecialExpr';
    text: string;
};
export interface IrRule {
    $type: 'RailroadRule';
    name: string;
    definition: IrExpression;
}
export type IrAst = Grammar<'Railroad', IrRule>;
export declare function parseIr(src: string): IrAst;
export declare const irRules: (ast: IrAst) => RailroadRule[];
