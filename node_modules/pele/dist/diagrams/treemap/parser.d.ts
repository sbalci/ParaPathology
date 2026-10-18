import { type TokenType } from '../common/tokens.js';
export declare const TREEMAP_TOKENS: readonly TokenType[];
export interface SectionAst {
    $type: 'Section';
    name: string;
    classSelector?: string;
}
export interface LeafAst {
    $type: 'Leaf';
    name: string;
    value: number;
    classSelector?: string;
}
export interface TreemapRowAst {
    $type: 'TreemapRow';
    indent?: number;
    item: SectionAst | LeafAst;
}
export interface ClassDefAst {
    $type: 'ClassDefStatement';
    indent?: number;
    className: string;
    styleText?: string;
}
export interface TreemapAst {
    $type: 'Treemap';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    TreemapRows: (TreemapRowAst | ClassDefAst)[];
}
export declare function parseTreemap(src: string): TreemapAst;
