import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import { type GitModel } from './db.js';
export declare function renderGit(model: GitModel, config: Config, options: RenderOptions): Rendered;
