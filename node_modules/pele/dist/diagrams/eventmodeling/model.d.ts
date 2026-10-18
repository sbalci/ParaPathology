import type { EventModelAst } from './parser.js';
export type EntityKind = 'ui' | 'processor' | 'command' | 'readmodel' | 'event';
export type LaneGroup = 'trigger' | 'state' | 'stream';
export interface EmLane {
    index: number;
    label: string;
    group: LaneGroup;
    namespace?: string;
}
export interface EmBox {
    id: string;
    kind: EntityKind;
    entity: string;
    name: string;
    namespace?: string;
    reset: boolean;
    lane: EmLane;
    data?: string;
    dataType?: string;
}
export interface EmRelation {
    source: EmBox;
    target: EmBox;
}
export interface EmNote {
    frame: string;
    text: string;
    dataType?: string;
}
export interface EmSpecification {
    frame: string;
    given: string[];
    when: string[];
    then: string[];
}
export interface EventModelingModel {
    type: 'eventmodeling';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    boxes: EmBox[];
    lanes: EmLane[];
    relations: EmRelation[];
    notes: EmNote[];
    specifications: EmSpecification[];
    entities: string[];
}
export declare function buildEventModel(ast: EventModelAst, title: string | undefined): EventModelingModel;
