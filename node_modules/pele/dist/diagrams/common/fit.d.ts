import { type Label } from '../../text/label.js';
import type { TextMeasurer } from '../../text/measurer.js';
export declare function plainLabel(raw: string | undefined, measurer: TextMeasurer, size: number, max: number, base?: number): Label;
export declare function fitLabel(raw: string | undefined, measurer: TextMeasurer, size: number, max: number, base?: number): Label;
