import { type SeqActor, type SeqBox, type SeqBoxData, type SeqItem, type SeqMessage, type SeqNote, type SeqText, type SequenceModel } from './types.js';
export interface SeqDbOptions {
    wrap?: boolean;
    sequenceWrap?: boolean;
}
export declare class SeqDb implements SequenceModel {
    readonly type: 'sequence';
    actors: Map<string, SeqActor>;
    createdActors: Map<string, number>;
    destroyedActors: Map<string, number>;
    boxes: SeqBox[];
    messages: SeqMessage[];
    notes: SeqNote[];
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private prevActor;
    private currentBox;
    private lastCreated;
    private lastDestroyed;
    private wrapEnabled;
    private sequenceWrap;
    private active;
    constructor(options?: SeqDbOptions);
    autoWrap(): boolean;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    setDiagramTitle(text: string): void;
    parseMessage(str: string): SeqText;
    parseBoxData(str: string): SeqBoxData;
    addBox(data: SeqBoxData): void;
    addActor(id: string, name: string, description: {
        text: string;
        wrap?: boolean;
        type?: string;
    } | undefined, type: string | undefined, metadata?: string): void;
    addMessage(from: string, to: string, message: {
        text: string;
        wrap?: boolean;
    }, answer: unknown): void;
    addSignal(from?: string, to?: string, message?: {
        text: string;
        wrap?: boolean;
    }, type?: number, activate?: boolean, centralConnection?: number): boolean;
    addNote(actor: string | string[], placement: number, message: {
        text: string;
        wrap?: boolean;
    }): void;
    addLinks(actorId: string, text: {
        text: string;
    }): void;
    addALink(actorId: string, text: {
        text: string;
    }): void;
    addProperties(actorId: string, text: {
        text: string;
    }): void;
    addDetails(actorId: string, text: {
        text: string;
    }): void;
    apply(root: SeqItem): void;
    private applyOne;
}
