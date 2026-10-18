import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { SankeyModel } from './db.js';
export declare function renderSankey(model: SankeyModel, config: Config, options: RenderOptions): Rendered;
