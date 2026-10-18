import { type TokenType } from '../common/tokens.js';
export declare const EVENTMODELING_TOKENS: readonly TokenType[];
export interface Ref {
    $refText: string;
}
export interface EmFrame {
    $type: 'EmTimeFrame' | 'EmResetFrame';
    name: string;
    modelEntityType: string;
    entityIdentifier: string;
    sourceFrames: Ref[];
    dataReference?: Ref;
    dataType?: string;
    dataInlineValue?: string;
    $offset: number;
}
export interface EmDataEntity {
    $type: 'EmDataEntity';
    name: string;
    dataType?: string;
    dataBlockValue: string;
}
export interface EmNoteEntity {
    $type: 'EmNoteEntity';
    sourceFrame: Ref;
    dataType?: string;
    dataBlockValue: string;
}
export interface EmGwtStatement {
    $type: 'EmGwtStatement';
    entityIdentifier: Ref;
}
export interface EmGwt {
    $type: 'EmGwt';
    sourceFrame: Ref;
    givenStatements: EmGwtStatement[];
    whenStatements: EmGwtStatement[];
    thenStatements: EmGwtStatement[];
}
export interface EventModelAst {
    $type: 'EventModel';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    modelEntities: {
        $type: 'EmModelEntity';
        name: string;
    }[];
    frames: EmFrame[];
    dataEntities: EmDataEntity[];
    noteEntities: EmNoteEntity[];
    gwtEntities: EmGwt[];
    $source: string;
}
export declare function parseEventModel(src: string): EventModelAst;
