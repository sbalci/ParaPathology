import { type OutlineDb, type Tokens } from '../common/outline.js';
export declare function tokenize(src: string): Tokens;
export declare function parseKanban(src: string, db: OutlineDb): void;
