import type { RenderOptions } from '../types.js';
export interface Accessible {
    accTitle?: string;
    accDescr?: string;
}
export declare function svgDocument(type: string, width: number, height: number, fontSize: number, options: RenderOptions, acc: Accessible, content: string): string;
