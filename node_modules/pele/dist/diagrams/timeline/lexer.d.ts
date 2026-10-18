import { type Tokens } from '../common/scan.js';
export declare const enum T {
    END = 0,
    EOF = 1,
    INVALID = 2,
    NEWLINE = 3,
    timeline = 4,
    timeline_lr = 5,
    timeline_td = 6,
    title = 7,
    acc_title = 8,
    acc_title_value = 9,
    acc_descr = 10,
    acc_descr_value = 11,
    acc_descr_multiline_value = 12,
    section = 13,
    period = 14,
    event = 15
}
export declare const TOKEN_NAMES: string[];
export declare function tokenize(src: string): Tokens;
