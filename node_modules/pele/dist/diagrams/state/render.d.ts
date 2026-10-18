import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { StateDb } from './db.js';
export declare function renderState(db: StateDb, config: Config, options: RenderOptions): Rendered;
