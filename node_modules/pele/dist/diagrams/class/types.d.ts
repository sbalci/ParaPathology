import type { ClassMember } from './members.js';
export type RelationEnd = number | 'none';
export interface ClassNode {
    id: string;
    type: string;
    label: string;
    cssClasses: string;
    methods: ClassMember[];
    members: ClassMember[];
    annotations: string[];
    styles: string[];
    parent?: string;
    link?: string;
    linkTarget?: string;
    haveCallback?: boolean;
    tooltip?: string;
}
export interface ClassRelation {
    id1: string;
    id2: string;
    relationTitle1: string;
    relationTitle2: string;
    title?: string;
    relation: {
        type1: RelationEnd;
        type2: RelationEnd;
        lineType: number;
    };
}
export interface ClassNote {
    id: string;
    class: string | undefined;
    text: string;
    index: number;
    parent?: string;
}
export interface ClassInterface {
    id: string;
    label: string;
    classId: string;
}
export interface NamespaceNode {
    id: string;
    label: string;
    classes: Map<string, ClassNode>;
    notes: Map<string, ClassNote>;
    children: Map<string, NamespaceNode>;
    parent?: string;
    explicit: boolean;
}
export interface StyleClass {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface ClassModel {
    type: 'class';
    direction: string;
    classes: Map<string, ClassNode>;
    relations: ClassRelation[];
    notes: Map<string, ClassNote>;
    namespaces: Map<string, NamespaceNode>;
    interfaces: ClassInterface[];
    styleClasses: Map<string, StyleClass>;
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
