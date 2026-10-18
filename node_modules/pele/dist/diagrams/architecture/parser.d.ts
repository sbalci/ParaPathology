import { type TokenType } from '../common/tokens.js';
export declare const ARCHITECTURE_TOKENS: readonly TokenType[];
export type Side = 'L' | 'R' | 'T' | 'B';
export interface GroupAst {
    $type: 'Group';
    id: string;
    icon?: string;
    title?: string;
    in?: string;
}
export interface ServiceAst {
    $type: 'Service';
    id: string;
    icon?: string;
    iconText?: string;
    title?: string;
    in?: string;
}
export interface JunctionAst {
    $type: 'Junction';
    id: string;
    in?: string;
}
export interface EdgeAst {
    $type: 'Edge';
    lhsId: string;
    lhsGroup: boolean;
    lhsDir: Side;
    lhsInto: boolean;
    title?: string;
    rhsInto: boolean;
    rhsDir: Side;
    rhsId: string;
    rhsGroup: boolean;
}
export interface AlignmentAst {
    $type: 'Alignment';
    direction: 'row' | 'column';
    members: string[];
}
export interface ArchitectureAst {
    $type: 'Architecture';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    groups: GroupAst[];
    services: ServiceAst[];
    junctions: JunctionAst[];
    edges: EdgeAst[];
    alignments: AlignmentAst[];
}
export declare function parseArchitecture(src: string): ArchitectureAst;
