import { type TokenType, type Tokens } from '../common/tokens.js';
export declare const RADAR_TOKENS: readonly TokenType[];
export interface AxisAst {
    $type: 'Axis';
    name: string;
    label?: string;
}
export interface EntryAst {
    $type: 'Entry';
    axis?: {
        $refText: string;
    };
    value: number;
}
export interface CurveAst {
    $type: 'Curve';
    name: string;
    label?: string;
    entries: EntryAst[];
}
export interface OptionAst {
    $type: 'Option';
    name: 'showLegend' | 'ticks' | 'max' | 'min' | 'graticule';
    value: boolean | number | string;
}
export interface RadarAst {
    $type: 'Radar';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    axes: AxisAst[];
    curves: CurveAst[];
    options: OptionAst[];
}
export declare function lexRadar(src: string): Tokens;
export declare function parseRadar(src: string): RadarAst;
