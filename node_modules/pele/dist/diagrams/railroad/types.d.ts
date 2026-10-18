export type RailroadNode = {
    type: 'terminal';
    value: string;
} | {
    type: 'nonterminal';
    name: string;
} | {
    type: 'special';
    text: string;
} | {
    type: 'sequence';
    elements: RailroadNode[];
} | {
    type: 'choice';
    alternatives: RailroadNode[];
} | {
    type: 'optional';
    element: RailroadNode;
} | {
    type: 'repetition';
    element: RailroadNode;
    min: number;
    max: number;
};
export interface RailroadRule {
    name: string;
    definition: RailroadNode;
}
export type Notation = 'railroad' | 'ebnf' | 'abnf' | 'peg';
export interface RailroadModel {
    type: 'railroad';
    notation: Notation;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    rules: RailroadRule[];
}
