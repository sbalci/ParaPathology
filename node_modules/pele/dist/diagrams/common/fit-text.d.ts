import type { TextMeasurer } from '../../text/measurer.js';
export interface Fitted {
    text: string;
    size: number;
    width: number;
}
export declare function fitText(text: string, max: number, size: number, min: number, measurer: TextMeasurer, style?: number): Fitted | undefined;
