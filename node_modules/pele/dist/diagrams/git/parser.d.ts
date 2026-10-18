import { type TokenType } from '../common/tokens.js';
export declare const GIT_TOKENS: readonly TokenType[];
export type CommitTypeName = 'NORMAL' | 'REVERSE' | 'HIGHLIGHT';
export interface CommitAst {
    $type: 'Commit';
    id?: string;
    message?: string;
    tags: string[];
    type?: CommitTypeName;
}
export interface BranchAst {
    $type: 'Branch';
    name: string;
    order?: number;
}
export interface MergeAst {
    $type: 'Merge';
    branch: string;
    id?: string;
    tags: string[];
    type?: CommitTypeName;
}
export interface CheckoutAst {
    $type: 'Checkout';
    branch: string;
}
export interface CherryPickingAst {
    $type: 'CherryPicking';
    id?: string;
    tags: string[];
    parent?: string;
}
export type StatementAst = CommitAst | BranchAst | MergeAst | CheckoutAst | CherryPickingAst;
export interface GitGraphAst {
    $type: 'GitGraph' | 'Direction';
    dir?: 'LR' | 'TB' | 'BT';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    statements: StatementAst[];
}
export declare function parseGit(src: string): GitGraphAst;
