import { type Tokens } from '../common/scan.js';
export declare const enum T {
    END = 0,
    EOF = 1,
    INVALID = 2,
    NEWLINE = 3,
    journey = 4,
    title = 5,
    acc_title = 6,
    acc_title_value = 7,
    acc_descr = 8,
    acc_descr_value = 9,
    acc_descr_multiline_value = 10,
    section = 11,
    taskName = 12,
    taskData = 13,
    colon = 14
}
export declare const TOKEN_NAMES: string[];
export declare function tokenize(src: string): Tokens;
