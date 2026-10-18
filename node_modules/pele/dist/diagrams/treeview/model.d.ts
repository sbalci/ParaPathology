import { type TreeViewAst } from './parser.js';
export type NodeType = 'file' | 'directory';
export interface TreeNode {
    id: number;
    level: number;
    name: string;
    nodeType: NodeType;
    icon?: string;
    cssClass?: string;
    description?: string;
    children: TreeNode[];
}
export interface TreeViewModel {
    type: 'treeView';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    root: TreeNode;
    count: number;
}
export declare class TreeViewDb {
    count: number;
    root: TreeNode;
    private stack;
    addNode(level: number, name: string, nodeType: NodeType, cssClass?: string, icon?: string, description?: string): void;
}
export declare function populate(ast: TreeViewAst, db: TreeViewDb): void;
export declare function readTreeView(source: string): TreeViewAst;
export declare function buildTreeView(ast: TreeViewAst, title: string | undefined): TreeViewModel;
