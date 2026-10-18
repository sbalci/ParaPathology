export declare const enum LINETYPE {
    SOLID = 0,
    DOTTED = 1,
    NOTE = 2,
    SOLID_CROSS = 3,
    DOTTED_CROSS = 4,
    SOLID_OPEN = 5,
    DOTTED_OPEN = 6,
    LOOP_START = 10,
    LOOP_END = 11,
    ALT_START = 12,
    ALT_ELSE = 13,
    ALT_END = 14,
    OPT_START = 15,
    OPT_END = 16,
    ACTIVE_START = 17,
    ACTIVE_END = 18,
    PAR_START = 19,
    PAR_AND = 20,
    PAR_END = 21,
    RECT_START = 22,
    RECT_END = 23,
    SOLID_POINT = 24,
    DOTTED_POINT = 25,
    AUTONUMBER = 26,
    CRITICAL_START = 27,
    CRITICAL_OPTION = 28,
    CRITICAL_END = 29,
    BREAK_START = 30,
    BREAK_END = 31,
    PAR_OVER_START = 32,
    BIDIRECTIONAL_SOLID = 33,
    BIDIRECTIONAL_DOTTED = 34,
    SOLID_TOP = 41,
    SOLID_BOTTOM = 42,
    STICK_TOP = 43,
    STICK_BOTTOM = 44,
    SOLID_ARROW_TOP_REVERSE = 45,
    SOLID_ARROW_BOTTOM_REVERSE = 46,
    STICK_ARROW_TOP_REVERSE = 47,
    STICK_ARROW_BOTTOM_REVERSE = 48,
    SOLID_TOP_DOTTED = 51,
    SOLID_BOTTOM_DOTTED = 52,
    STICK_TOP_DOTTED = 53,
    STICK_BOTTOM_DOTTED = 54,
    SOLID_ARROW_TOP_REVERSE_DOTTED = 55,
    SOLID_ARROW_BOTTOM_REVERSE_DOTTED = 56,
    STICK_ARROW_TOP_REVERSE_DOTTED = 57,
    STICK_ARROW_BOTTOM_REVERSE_DOTTED = 58,
    CENTRAL_CONNECTION = 59,
    CENTRAL_CONNECTION_REVERSE = 60,
    CENTRAL_CONNECTION_DUAL = 61
}
export declare const enum PLACEMENT {
    LEFTOF = 0,
    RIGHTOF = 1,
    OVER = 2
}
export interface SeqText {
    text: string;
    wrap: boolean | undefined;
}
export interface SeqBoxData {
    text: string | undefined;
    color: string;
    wrap: boolean | undefined;
}
export interface SeqBox {
    name: string | undefined;
    wrap: boolean;
    fill: string;
    actorKeys: string[];
}
export interface SeqActor {
    box: SeqBox | undefined;
    name: string;
    description: string;
    wrap: boolean;
    prevActor: string | undefined;
    nextActor?: string;
    links: Map<string, unknown>;
    properties: Map<string, unknown>;
    details?: string;
    type: string;
}
export interface SeqNumbering {
    start: number | undefined;
    step: number | undefined;
    visible: boolean;
}
export interface SeqMessage {
    id: string;
    from: string | undefined;
    to: string | undefined;
    message: string | SeqNumbering;
    wrap: boolean;
    type?: number;
    activate?: boolean;
    placement?: number;
    centralConnection?: number;
    answer?: unknown;
}
export interface SeqNote {
    actor: string | string[];
    placement: number;
    message: string;
    wrap: boolean;
}
export interface SeqStatement {
    type: string;
    actor?: string | string[];
    draw?: string;
    description?: SeqText;
    config?: string;
    signalType?: number;
    from?: string;
    to?: string;
    msg?: SeqText;
    activate?: boolean;
    centralConnection?: number;
    placement?: number;
    text?: SeqText;
    boxData?: SeqBoxData;
    boxText?: string;
    loopText?: SeqText | string;
    optText?: SeqText;
    altText?: SeqText;
    parText?: SeqText;
    criticalText?: SeqText;
    optionText?: SeqText;
    breakText?: SeqText;
    color?: SeqText;
    sequenceIndex?: number;
    sequenceIndexStep?: number;
    sequenceVisible?: boolean;
}
export type SeqItem = SeqStatement | string | SeqItem[];
export interface SequenceModel {
    type: 'sequence';
    actors: Map<string, SeqActor>;
    createdActors: Map<string, number>;
    destroyedActors: Map<string, number>;
    boxes: SeqBox[];
    messages: SeqMessage[];
    notes: SeqNote[];
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
