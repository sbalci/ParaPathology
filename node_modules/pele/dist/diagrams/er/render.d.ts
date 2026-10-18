import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { ErDb } from './db.js';
export declare function renderEr(db: ErDb, config: Config, options: RenderOptions): Rendered;
