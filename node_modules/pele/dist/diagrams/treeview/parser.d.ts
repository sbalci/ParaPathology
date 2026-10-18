import { type TokenType } from '../common/tokens.js';
export declare const TREEVIEW_TOKENS: readonly TokenType[];
export interface TreeNodeAst {
    $type: 'TreeNode';
    indent?: number;
    name: string;
    classAnnotation?: string;
    iconAnnotation?: string;
    descAnnotation?: string;
}
export interface TreeViewAst {
    $type: 'TreeView';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    nodes: TreeNodeAst[];
}
export declare function convertValue(rule: string, input: string): string | number | undefined;
export declare function parseTreeView(src: string): TreeViewAst;
