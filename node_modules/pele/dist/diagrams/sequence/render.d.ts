import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { SeqDb } from './db.js';
import { type SeqMessage } from './types.js';
export interface Numbering {
    index: number[];
    shown: boolean[];
    visible: boolean;
}
export declare function isLineMessage(type: number | undefined): boolean;
export declare function numberMessages(messages: SeqMessage[], always: boolean): Numbering;
export declare function renderSequence(db: SeqDb, config: Config, options: RenderOptions): Rendered;
