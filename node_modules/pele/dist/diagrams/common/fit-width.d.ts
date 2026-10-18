import type { RenderOptions, Rendered } from '../../types.js';
export declare function fitWidth(options: RenderOptions, natural: number, least: number, draw: (plot: number, narrow: boolean) => Rendered): Rendered;
export declare function titleRoom(options: RenderOptions): number;
export declare function capWidth(options: RenderOptions, natural: number, least: number, around?: number): number;
export declare function turnToFit(options: RenderOptions, draw: (down: boolean) => Rendered): Rendered;
export declare function runsAcross(direction: string | undefined): boolean;
export declare function tighten(options: RenderOptions, draw: (tight: boolean) => Rendered): Rendered;
