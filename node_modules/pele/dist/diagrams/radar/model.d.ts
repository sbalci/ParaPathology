import type { RadarAst } from './parser.js';
export interface RadarAxis {
    name: string;
    label: string;
}
export interface RadarCurve {
    name: string;
    label: string;
    entries: number[];
}
export interface RadarOptions {
    showLegend: boolean;
    ticks: number;
    max: number | null;
    min: number;
    graticule: 'circle' | 'polygon';
}
export interface RadarModel {
    type: 'radar';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    axes: RadarAxis[];
    curves: RadarCurve[];
    options: RadarOptions;
}
export declare function buildRadar(ast: RadarAst, title: string | undefined): RadarModel;
