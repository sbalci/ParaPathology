import type { ClassInterface, ClassModel, ClassNode, ClassNote, ClassRelation, NamespaceNode, StyleClass } from './types.js';
export declare const LINE_TYPE: {
    readonly LINE: 0;
    readonly DOTTED_LINE: 1;
};
export declare const RELATION_TYPE: {
    readonly AGGREGATION: 0;
    readonly EXTENSION: 1;
    readonly COMPOSITION: 2;
    readonly DEPENDENCY: 3;
    readonly LOLLIPOP: 4;
};
export declare class ClassDb implements ClassModel {
    readonly type: 'class';
    readonly lineType: {
        readonly LINE: 0;
        readonly DOTTED_LINE: 1;
    };
    readonly relationType: {
        readonly AGGREGATION: 0;
        readonly EXTENSION: 1;
        readonly COMPOSITION: 2;
        readonly DEPENDENCY: 3;
        readonly LOLLIPOP: 4;
    };
    direction: string;
    classes: Map<string, ClassNode>;
    relations: ClassRelation[];
    notes: Map<string, ClassNote>;
    namespaces: Map<string, NamespaceNode>;
    interfaces: ClassInterface[];
    styleClasses: Map<string, StyleClass>;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private namespaceStack;
    private withCssClass;
    addClass(id: string): void;
    private tag;
    private ensure;
    setClassLabel(id: string, label: string): void;
    addRelation(relation: ClassRelation): void;
    private addInterface;
    addAnnotation(className: string, annotation: string): void;
    addMember(className: string, member: string): void;
    addMembers(className: string, members: string[]): void;
    addNote(text: string, className?: string): string;
    cleanupLabel(label: string): string;
    setCssClass(ids: string, className: string): void;
    defineClass(ids: string[], style: string[]): void;
    setTooltip(ids: string, tooltip?: string): void;
    setLink(ids: string, link: string, target?: string): void;
    setClickEvent(ids: string, _functionName?: string, _functionArgs?: string): void;
    setDirection(dir: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    addNamespace(id: string, label?: string): string;
    popNamespace(): void;
    addClassesToNamespace(id: string, classNames: string[], noteNames: string[]): void;
    setCssStyle(id: string, styles: string[]): void;
}
