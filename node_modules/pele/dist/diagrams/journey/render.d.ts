import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import { type JourneyModel } from './db.js';
export declare function renderJourney(model: JourneyModel, _config: Config, options: RenderOptions): Rendered;
