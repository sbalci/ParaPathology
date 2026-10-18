import type { Config } from '../../preprocess.js';
import type { GitGraphAst, StatementAst } from './parser.js';
export declare const commitType: {
    readonly NORMAL: 0;
    readonly REVERSE: 1;
    readonly HIGHLIGHT: 2;
    readonly MERGE: 3;
    readonly CHERRY_PICK: 4;
};
export type GitDirection = 'LR' | 'TB' | 'BT';
export interface GitCommit {
    id: string;
    message: string;
    seq: number;
    type: number;
    tags: string[];
    parents: string[];
    branch: string;
    customType?: number;
    customId?: boolean;
}
export interface GitModel {
    type: 'gitGraph';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    direction: GitDirection;
    commits: Map<string, GitCommit>;
    branches: Map<string, string | null>;
    lanes: string[];
    currentBranch: string;
    head: GitCommit | null;
    warnings: string[];
}
export interface CommitDB {
    msg: string;
    id: string | undefined;
    type: number;
    tags?: string[];
}
export interface BranchDB {
    name: string;
    order: number | undefined;
}
export interface MergeDB {
    branch: string;
    id: string;
    type?: number;
    tags?: string[];
}
export interface CherryPickDB {
    id: string | undefined;
    targetId: string;
    parent: string | undefined;
    tags?: string[];
}
export interface GitDbParseProvider {
    setDirection(dir: GitDirection): void;
    commit(commit: CommitDB): void;
    branch(branch: BranchDB): void;
    merge(merge: MergeDB): void;
    cherryPick(cherryPick: CherryPickDB): void;
    checkout(branch: string): void;
}
export declare function populate(ast: GitGraphAst, db: GitDbParseProvider): void;
export declare function parseStatement(statement: StatementAst, db: GitDbParseProvider): void;
export declare function buildGit(ast: GitGraphAst, config: Config, title: string | undefined): GitModel;
