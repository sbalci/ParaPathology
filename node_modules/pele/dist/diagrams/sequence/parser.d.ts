import { type SeqBoxData, type SeqItem, type SeqText } from './types.js';
export interface SeqBuilder {
    apply(doc: SeqItem): void;
    parseMessage(str: string): SeqText;
    parseBoxData(str: string): SeqBoxData;
    setDiagramTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
export declare function parseSequence(src: string, db: SeqBuilder): void;
