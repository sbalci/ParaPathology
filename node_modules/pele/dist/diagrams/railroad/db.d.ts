import type { Notation, RailroadModel, RailroadRule } from './types.js';
export declare class RailroadDb implements RailroadModel {
    readonly type: 'railroad';
    notation: Notation;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    rules: RailroadRule[];
    private byName;
    setTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    addRule(rule: RailroadRule): void;
    getRule(name: string): RailroadRule | undefined;
}
export declare function notationOf(source: string): Notation | undefined;
export declare function populate(db: RailroadDb, source: string, notation: Notation): void;
export declare function parseRailroad(source: string, title: string | undefined): RailroadDb;
