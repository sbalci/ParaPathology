import type { CynefinAst, DomainName } from './parser.js';
export type { DomainName } from './parser.js';
export interface CynefinItem {
    label: string;
}
export interface CynefinDomain {
    name: DomainName;
    items: CynefinItem[];
}
export interface CynefinTransition {
    from: DomainName;
    to: DomainName;
    label?: string;
}
export interface CynefinModel {
    type: 'cynefin';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    domains: Map<DomainName, CynefinDomain>;
    transitions: CynefinTransition[];
}
export interface DomainBlock {
    domain: string;
    items?: {
        label: string;
    }[];
}
export interface Transition {
    from: string;
    to: string;
    label?: string;
}
export declare class CynefinDb {
    domains: Map<DomainName, CynefinDomain>;
    transitions: CynefinTransition[];
    setDomains(blocks: DomainBlock[] | null | undefined): void;
    setTransitions(transitions: Transition[] | null | undefined): void;
}
export declare function buildCynefin(ast: CynefinAst, title: string | undefined): CynefinModel;
