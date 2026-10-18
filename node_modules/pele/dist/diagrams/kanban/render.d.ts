import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { KanbanModel } from './db.js';
export declare function renderKanban(model: KanbanModel, config: Config, options: RenderOptions): Rendered;
