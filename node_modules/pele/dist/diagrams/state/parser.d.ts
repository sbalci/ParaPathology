import type { Stmt } from './types.js';
export interface StateBuilder {
    setRootDoc(doc: Stmt[]): void;
    trimColon(text: string): string;
    getDividerId(): string;
    setDirection(dir: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
export declare function parseState(src: string, db: StateBuilder): Stmt[];
