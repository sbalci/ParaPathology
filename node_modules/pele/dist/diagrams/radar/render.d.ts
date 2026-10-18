import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { RadarModel } from './model.js';
interface Point {
    x: number;
    y: number;
}
export declare function relativeRadius(value: number, min: number, max: number, radius: number): number;
export declare function closedRoundCurve(points: Point[], tension: number): string;
export declare function renderRadar(model: RadarModel, config: Config, options: RenderOptions): Rendered;
export {};
