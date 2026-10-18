import { type Direction, type GraphStatement, type LabelType, type MetadataOccurrence, type RelationshipType, type Span, type UseCaseShape, type UsecaseModel } from './types.js';
export interface DraftLabel {
    text: string;
    type: LabelType;
    span: Span;
}
export interface DraftProperty extends MetadataOccurrence {
    value: string | boolean;
}
interface Named {
    id: string;
    label: DraftLabel;
    span: Span;
    generated: boolean;
}
export interface DraftElement extends Named {
    kind: 'actor' | 'usecase';
    parent?: DraftBoundary;
    shape?: UseCaseShape;
    metadata?: DraftProperty[];
    stereotype?: string;
    classes: string[];
}
export interface DraftBoundary extends Named {
    classes: string[];
}
export interface DraftJson {
    id: string;
    value: Record<string, unknown>;
    propertyOrder: Map<string, string[]>;
    span: Span;
    classes: string[];
}
export interface DraftEndpoint extends Named {
    declares: boolean;
    classed: boolean;
}
export interface DraftRelationship {
    source: DraftEndpoint;
    target: DraftEndpoint;
    span: Span;
    id?: string;
    idSpan?: Span;
    type: RelationshipType;
    arrowType: number;
    label?: DraftLabel;
    minlen: number;
}
export interface Drafts {
    elements: DraftElement[];
    boundaries: DraftBoundary[];
    jsons: DraftJson[];
    relationships: DraftRelationship[];
    notes: {
        target: string;
        span: Span;
        label: DraftLabel;
    }[];
    metadata: {
        target: string;
        span: Span;
        properties: DraftProperty[];
        statement: GraphStatement;
    }[];
    classes: {
        targets: {
            id: string;
            span: Span;
        }[];
        classes: string[];
    }[];
    styles: {
        target: string;
        span: Span;
        styles: string[];
    }[];
    classDefs: {
        ids: string[];
        styles: string[];
    }[];
    direction: Direction | undefined;
    accTitle: string;
    accDescription: string;
}
export declare function emptyDrafts(): Drafts;
export declare function resolveUsecase(src: string, drafts: Drafts, headerSpan: Span, statements: GraphStatement[], title: string | undefined): UsecaseModel;
export {};
