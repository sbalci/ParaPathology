import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import { type GanttDb } from './db.js';
export declare function renderGantt(model: GanttDb, config: Config, options: RenderOptions): Rendered;
