import { Reader, type TokenType } from '../common/tokens.js';
import type { RailroadNode, RailroadRule } from './types.js';
export declare function isSpace(c: number): boolean;
export declare const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export declare const TITLE: TokenType;
export declare const ACC_TITLE: TokenType;
export declare const ACC_DESCR: TokenType;
export declare function literal(name: string, longer?: TokenType[]): TokenType;
export declare function opening(word: string, name: TokenType): TokenType;
export declare function identifier(name: string): TokenType;
export declare function quoted(name: string): TokenType;
export declare function hiddenTokens(prefix: string): TokenType[];
export declare function unescape(text: string): string;
export interface Grammar<Type extends string, Rule> {
    $type: Type;
    title?: string;
    accTitle?: string;
    accDescr?: string;
    rules: Rule[];
}
export declare function parseGrammar<Type extends string, Rule>(src: string, types: readonly TokenType[], $type: Type, meta: number, unquote: (text: string) => string, rule: (r: Reader) => Rule): Grammar<Type, Rule>;
export declare const NONE: readonly never[];
export declare function parts<T>(node: T): readonly T[];
export declare const terminal: (value: string) => RailroadNode;
export declare const nonterminal: (name: string) => RailroadNode;
export declare const special: (text: string) => RailroadNode;
export declare const optional: (element: RailroadNode) => RailroadNode;
export declare const repetition: (element: RailroadNode, min: number, max?: number) => RailroadNode;
export declare function sequence(elements: RailroadNode[]): RailroadNode;
export declare function choice(alternatives: RailroadNode[]): RailroadNode;
export declare function toRules<Part>(ast: {
    rules: {
        name: string;
        definition: Part;
    }[];
}, build: (part: Part, kids: RailroadNode[]) => RailroadNode): RailroadRule[];
export declare function fold<T, R>(root: T, children: (node: T) => readonly T[], build: (node: T, results: R[]) => R): R;
