import type { ArchitectureAst, Side } from './parser.js';
export interface ArchService {
    id: string;
    type: 'service';
    icon?: string;
    iconText?: string;
    title?: string;
    in?: string;
}
export interface ArchJunction {
    id: string;
    type: 'junction';
    in?: string;
}
export type ArchNode = ArchService | ArchJunction;
export interface ArchGroup {
    id: string;
    icon?: string;
    title?: string;
    in?: string;
}
export interface ArchEdge {
    lhsId: string;
    lhsDir: Side;
    lhsInto?: boolean;
    lhsGroup?: boolean;
    rhsId: string;
    rhsDir: Side;
    rhsInto?: boolean;
    rhsGroup?: boolean;
    title?: string;
}
export interface ArchLayoutHint {
    direction: 'row' | 'column';
    members: string[];
}
export interface ArchitectureModel {
    type: 'architecture';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    nodes: Map<string, ArchNode>;
    groups: Map<string, ArchGroup>;
    edges: ArchEdge[];
    layoutHints: ArchLayoutHint[];
}
export declare class ArchitectureDb implements ArchitectureModel {
    readonly type = "architecture";
    title?: string;
    accTitle?: string;
    accDescr?: string;
    nodes: Map<string, ArchNode>;
    groups: Map<string, ArchGroup>;
    edges: ArchEdge[];
    layoutHints: ArchLayoutHint[];
    private registered;
    private register;
    addService({ id, icon, iconText, title, in: parent }: Omit<ArchService, 'type'> & {
        type?: 'service';
    }): void;
    addJunction({ id, in: parent }: Omit<ArchJunction, 'type'> & {
        type?: 'junction';
    }): void;
    addGroup({ id, icon, title, in: parent }: ArchGroup): void;
    addEdge({ lhsId, rhsId, lhsDir, rhsDir, lhsInto, rhsInto, lhsGroup, rhsGroup, title }: ArchEdge): void;
    addLayoutHint(hint: ArchLayoutHint): void;
}
export declare function populate(ast: ArchitectureAst, db: ArchitectureDb): void;
